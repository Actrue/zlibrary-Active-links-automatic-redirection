# Z-Library Cloudflare Worker

## 功能描述

该API用于检查Z-Library的可用域名，并自动重定向到第一个可用的域名。它会并行检查多个预设域名，返回第一个可用的域名地址。如果所有域名都不可用，将返回503错误。

## 使用方法

1. 安装依赖：

```bash
npm install
```

2. 本地运行：

```bash
npm run dev
```

3. 部署到Cloudflare Workers：

```bash
npm run deploy
```

## 类型生成

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```bash
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```

## 域名列表

当前支持的域名列表如下：

```ts
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
```

## API 端点

- `GET /zlibrary`: 检查并返回可用的Z-Library域名
