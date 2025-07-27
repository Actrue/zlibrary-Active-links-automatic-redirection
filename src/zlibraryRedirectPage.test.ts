import { describe, it, expect, vi } from 'vitest'
import { jsCode } from './zlibraryRedirectPage'

describe('Z-Library 重定向页面测试', () => {
  it('应包含有效的JavaScript代码', () => {
    expect(jsCode).toBeDefined()
    expect(typeof jsCode).toBe('string')
    expect(jsCode.length).toBeGreaterThan(0)
  })

  it('应包含检查域名的函数逻辑', () => {
    expect(jsCode).toContain('checkDomain')
    expect(jsCode).toContain('domains.map')
  })

  it('应包含立即重定向的逻辑', () => {
    expect(jsCode).toContain('firstAvailableDomain')
    expect(jsCode).toContain('redirected')
    expect(jsCode).toContain('window.location.href = firstAvailableDomain')
  })

  it('应包含UI更新逻辑', () => {
    expect(jsCode).toContain('statusContainer')
    expect(jsCode).toContain('domainList')
    expect(jsCode).toContain('progressFill')
  })
})