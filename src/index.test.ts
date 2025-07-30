import { describe, it, expect, vi, afterEach } from 'vitest'
import { app } from './index'

describe('核心功能测试', () => {
  const env = {
    // @ts-ignore
    kv: {} as KVNamespace
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('应正确处理根路由', async () => {
    const res = await app.fetch(
      new Request('http://localhost/'),
      // @ts-ignore
      env
    )
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toContain('text/html')
  })

  it('应返回有效的JavaScript内容', async () => {
    const res = await app.fetch(
      new Request('http://localhost/zlibrary-js'),
      // @ts-ignore
      env
    )
    expect(res.status).toBe(200)
    const text = await res.text()
    expect(text).toContain('status-container')
    expect(text).toContain('domain-list')
  })

  it('应正确处理域名检查API请求', async () => {
    // 模拟KV.get方法
    // @ts-ignore
    env.kv.get = vi.fn().mockResolvedValue(null)
    
    // 模拟fetch方法
    global.fetch = vi.fn().mockResolvedValue({
      status: 200,
      text: () => Promise.resolve('some content')
    })

    const res = await app.fetch(
      new Request('http://localhost/api/check-domain?domain=https://z-lib.gd'),
      // @ts-ignore
      env
    )
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty('domain')
    expect(json).toHaveProperty('available')
  })

  it('应正确处理查找第一个可用域名的API请求', async () => {
    // 模拟KV.get方法
    // @ts-ignore
    env.kv.get = vi.fn().mockResolvedValue(null)
    
    // 模拟fetch方法
    global.fetch = vi.fn().mockResolvedValue({
      status: 200,
      text: () => Promise.resolve('some content')
    })

    const res = await app.fetch(
      new Request('http://localhost/api/find-first-available'),
      // @ts-ignore
      env
    )
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty('domain')
  })

  it('应正确处理缺失域名参数的检查请求', async () => {
    const res = await app.fetch(
      new Request('http://localhost/api/check-domain'),
      // @ts-ignore
      env
    )
    expect(res.status).toBe(400)
  })

  it('应拒绝非白名单域名的检查请求', async () => {
    // 模拟KV.get方法
    // @ts-ignore
    env.kv.get = vi.fn().mockResolvedValue(null)
    
    // 模拟fetch方法
    global.fetch = vi.fn().mockResolvedValue({
      status: 200,
      text: () => Promise.resolve('some content')
    })

    const res = await app.fetch(
      new Request('http://localhost/api/check-domain?domain=https://malicious.com'),
      // @ts-ignore
      env
    )
    expect(res.status).toBe(200)
    const json: { domain: string; available: boolean } = await res.json()
    expect(json.available).toBe(false)
  })
})