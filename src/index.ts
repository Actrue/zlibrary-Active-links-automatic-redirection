import { Hono } from 'hono'
import { readmeContent } from './readmeContent'

const app = new Hono()

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



async function checkDomain(domain: string) {
  try {
    const response = await fetch(`${domain}/p/index.php?v=${Date.now()}`, {
    })
    console.log(response.headers)
    return response.status === 200 && (await response.text()).length > 0
  } catch {
    return false
  }
}



app.get('/zlibrary', async (c) => {
  // 并行检查所有域名
  const checks = domains.staticList.map(async domain => {
    return { domain, available: await checkDomain(domain) }
  })

  const results = await Promise.all(checks)
  const availableDomain = results.find(r => r.available)?.domain

  if (availableDomain) {
    return c.redirect(availableDomain)
  }

  return c.text('No available domains', 503)
})



app.get('/', async (c) => {

  
  return c.html(readmeContent);
});

export default app
