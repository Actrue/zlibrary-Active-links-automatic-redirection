import { Hono } from 'hono'
import { readmeContent } from './readmeContent'
import { Context } from 'hono'
type Bindings = {

  kv:KVNamespace
}
const app = new Hono<{ Bindings: Bindings }>()

const domains = {
  staticList: [
    'https://z-library.rs',
    'https://z-library.do',
    'https://z-lib.gs',
    'https://z-lib.gd',
    'https://z-lib.do',
    'https://z-lib.fm'
  ]
}



async function checkDomain(domain: string, c: Context) {
  try {
    const response = await fetch(`${domain}/p/index.php?v=${Date.now()}`, {
    })
    return response.status === 200 && (await response.text()).length > 0;
  } catch {
    return false;
  }
}



app.get('/zlibrary', async (c) => {
  const cacheKey = 'availableDomain';
  const cachedDomain = await c.env.kv.get(cacheKey);
  if (cachedDomain) {
    return c.redirect(cachedDomain);
  }

  const checks = domains.staticList.map(async domain => {
    return { domain, available: await checkDomain(domain, c) }
  })

  const results = await Promise.all(checks)
  const availableDomain = results.find(r => r.available)?.domain

  if (availableDomain) {
    await c.env.kv.put(cacheKey, availableDomain, { expirationTtl: 86400 });
    return c.redirect(availableDomain)
  }

  return c.text('No available domains', 503)
})



app.get('/', async (c) => {

  
  return c.html(readmeContent);
});

export default app
