import { Hono } from 'hono'
import { readmeContent } from './首页'
import { zlibraryRedirectContent } from './zlibraryRedirectPage'
type Bindings = {
  kv: KVNamespace
}

export const app = new Hono<{ Bindings: Bindings }>()

const domains = {
  staticList: [
    'https://z-lib.gd',
    'https://1lib.sk',
    'https://z-lib.fm',
    'https://z-lib.gl',
    'https://z-lib.fo',
    'https://z-library.sk',
    'https://zh.z-library.ec'
  ]
}

// 域名白名单
const DOMAIN_WHITELIST = new Set([
  'https://z-lib.gd',
  'https://1lib.sk',
  'https://z-lib.fm',
  'https://z-lib.gl',
  'https://z-lib.fo',
  'https://z-library.sk',
  'https://zh.z-library.ec'
])

// 检查域名是否在白名单中
const isDomainWhitelisted = (domain: string): boolean => {
  return DOMAIN_WHITELIST.has(domain)
}

// 检查单个域名的可用性，使用缓存
const checkDomainWithCache = async (kv: KVNamespace, domain: string): Promise<boolean> => {
  // 检查域名是否在白名单中
  if (!isDomainWhitelisted(domain)) {
    return false
  }

  // 尝试从缓存中获取结果
  const cachedResult = await kv.get(`domain:${domain}`)
  if (cachedResult !== null) {
    const { available, timestamp } = JSON.parse(cachedResult)
    // 如果缓存未过期（5分钟内），则返回缓存结果
    if (Date.now() - timestamp < 5 * 60 * 1000) {
      return available
    }
  }

  // 如果缓存过期或不存在，则进行实际检查
  try {
    const url = `${domain}/p/index.php?v=${Date.now()}`
    const response = await fetch(url)
    const available = response.status === 200 && (await response.text()).length > 0

    // 将结果存入缓存，有效期5分钟
    await kv.put(
      `domain:${domain}`,
      JSON.stringify({ available, timestamp: Date.now() }),
      { expirationTtl: 5 * 60 }
    )

    return available
  } catch {
    // 如果检查失败，仍然将结果存入缓存，但有效期较短（1分钟）
    await kv.put(
      `domain:${domain}`,
      JSON.stringify({ available: false, timestamp: Date.now() }),
      { expirationTtl: 60 }
    )
    return false
  }
}

// 查找第一个可用的域名，使用缓存
const findFirstAvailableWithCache = async (kv: KVNamespace, domains: string[]): Promise<string | null> => {
  for (const domain of domains) {
    const available = await checkDomainWithCache(kv, domain)
    if (available) {
      return domain
    }
  }
  return null
}







app.get('/', async (c) => {

  
  // 添加CSP头部
  c.header('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';");
  return c.html(readmeContent);
});

app.get('/zlibrary-js', async (c) => {
  // 添加CSP头部
  c.header('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';");
  return c.html(zlibraryRedirectContent);
})

// API端点：检查域名可用性
app.get('/api/check-domain', async (c) => {
  const domain = c.req.query('domain')
  if (!domain) {
    return c.json({ error: 'Missing domain parameter' }, 400)
  }

  const available = await checkDomainWithCache(c.env.kv, domain)
  return c.json({ domain, available })
})

// API端点：查找第一个可用的域名
app.get('/api/find-first-available', async (c) => {
  const firstAvailable = await findFirstAvailableWithCache(c.env.kv, domains.staticList)
  return c.json({ domain: firstAvailable })
})



export default app
