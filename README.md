# Z-Library 智能重定向服务

## 简介

Z-Library 智能重定向服务是一个基于 Cloudflare Workers 的应用程序，可自动检测可用的 Z-Library 域名并重定向至有效的地址。该服务通过并行检测多个 Z-Library 域名的可用性，为用户提供最快速、最稳定的访问体验。

主要功能：
- 自动检测 Z-Library 域名可用性
- 智能重定向至可用域名
- 实时进度显示和倒计时跳转
- 响应式设计，支持移动端访问

预览链接：[重定向至有效 zlibrary 地址](https://zb.sereniblue.com/)

## 支持的域名

当前支持检测和重定向的 Z-Library 域名包括：
- https://z-lib.gd
- https://1lib.sk
- https://z-lib.fm
- https://z-lib.gl
- https://z-lib.fo

## 使用方式

### 本地开发

1. 克隆源码

```bash
git clone https://github.com/Actrue/zlibrary-Active-links-automatic-redirection.git
```

2. 安装依赖

```bash
npm install
```

3. 本地开发

```bash
npm run dev
```

4. 构建项目

```bash
npm run build
```

### 部署到 Cloudflare

1. 发布到 cloudflare

```bash
npm run deploy
```

2. 访问您的域名

- 访问 https://yourdomain/ 查看主页
- 访问 https://yourdomain/zlibrary-js 触发自动重定向检测

## 进阶设置

### 自定义域名

在 `wrangler.jsonc` 中自定义域名，添加以下行：

```jsonc
{
  "preview_urls": false,  //关闭预览url
  "routes": [
    {"custom_domain": true, "pattern": "redirect.sereniblue.com"},
    {"custom_domain": true, "pattern": "zb.sereniblue.com"}
  ]
}
```

### 环境变量配置

如果需要使用 KV 存储来缓存检测结果，可以在 `wrangler.jsonc` 中添加 KV 命名空间配置：

```jsonc
{
  "kv_namespaces": [
    {
      "binding": "kv",
      "id": "your-kv-namespace-id"
    }
  ]
}
```

## 项目结构

```
.
├── src/
│   ├── index.ts        # 主应用入口
│   ├── 首页.ts         # 首页HTML内容
├── package.json       # 项目依赖和脚本
├── wrangler.jsonc     # Cloudflare Workers 配置
├── tsconfig.json      # TypeScript 配置
└── README.md          # 项目说明文档
```

## 技术栈

- [Cloudflare Workers](https://www.cloudflare.com/zh-cn/): 边缘计算平台，用于部署和运行应用
- [Hono](https://hono.dev/): 轻量级 Web 框架，用于构建应用
- [TypeScript](https://www.typescriptlang.org/): JavaScript 的超集，提供类型检查
- [Vitest](https://vitest.dev/): 基于 Vite 的单元测试框架

## 脚本命令

- `npm run dev`: 本地开发模式
- `npm run build`: 构建项目
- `npm run deploy`: 部署到 Cloudflare Workers
- `npm run test`: 运行单元测试
- `npm run test:coverage`: 运行单元测试并生成覆盖率报告
- `npm run cf-typegen`: 生成 Cloudflare Workers 类型定义

