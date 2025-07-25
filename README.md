# zlibrary自动重定向

## 简介

自动识别 zlibrary 有效地址，重定向至 zlibrary 有效地址。  
此项目可部署于 cloudflare  
预览链接：[重定向至有效 zlibrary 地址](https://zb.sereniblue.com/)

## 使用方式

1. 复制源码

```bash
git clone https://github.com/Actrue/zlibrary-Active-links-automatic-redirection.git
```

2. 安装依赖

```bash
npm i
```



4. 发布到 cloudflare

```bash
npx wrangler deploy
```

5. 访问 https://yourdomain/zlibrary 即可自动重定向至有效 zlibrary 地址。  
6. 访问 https://yourdomain/zlibrary-js 也可自动重定向至有效 zlibrary 地址。

## 进阶设置

在 wrangler.jsonc 中自定义域名，添加以下行

```jsonc
"preview_urls": false,  //关闭预览url
"routes": [{"custom_domain": true,"pattern": "redirect.sereniblue.com"}], //自定义域名,
```

## 技术栈

- [cloudflare worker](https://www.cloudflare.com/zh-cn/)
- [hono](https://hono.dev/)

