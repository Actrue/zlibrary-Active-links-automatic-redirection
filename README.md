# zlibrary自动重定向

## 简介

自动识别 zlibrary 有效地址，重定向至 zlibrary 有效地址。  
此项目可部署于 cloudflare  
预览链接：[重定向至有效 zlibrary 地址](https://redirect.sereniblue.com/zlibrary)

## 使用方式

1. 复制源码

```bash
git clone https://github.com/Actrue/zlibrary-Active-links-automatic-redirection.git
```

2. 安装依赖

```bash
npm i
```

3. 绑定 cloudflare KV

```bash
npx wrangler kv namespace create zlibrary-url
```

获取到 kv 的 id

```bash
{
  "kv_namespaces": [
    {
      "binding": "zlibrary_url",
      "id": "cd8399aa28664877b0e42db47a07eff4"
    }
  ]
}
```

在 wrangler.jsonc 文件中，用新创建的 id 替换现有 id

```jsonc
  "kv_namespaces": [
    {
      "binding": "kv",//不要更换kv绑定名称
      "id": "PUT-YOUR-KV-ID-IN-JSONC"
    }
  ]
```

4. 发布到 cloudflare

```bash
npx wrangler deploy
```

5. 访问 https://yourdomain/zlibrary 即可自动重定向至有效 zlibrary 地址。

## 进阶设置

在 wrangler.jsonc 中自定义域名，添加以下行

```jsonc
"preview_urls": false,  //关闭预览url
"routes": [{"custom_domain": true,"pattern": "redirect.sereniblue.com"}], //自定义域名,
```

## 技术栈

- [cloudflare worker](https://www.cloudflare.com/zh-cn/)
- [hono](https://hono.dev/)

