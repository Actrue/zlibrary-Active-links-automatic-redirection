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
})