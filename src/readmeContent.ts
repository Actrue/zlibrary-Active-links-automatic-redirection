export const readmeContent = `
<div>
  <h1>Z-Library Cloudflare Worker</h1>

  <h2>功能描述</h2>
  <p>该API用于检查Z-Library的可用域名，并自动重定向到第一个可用的域名。它会并行检查多个预设域名，返回第一个可用的域名地址。如果所有域名都不可用，将返回503错误。</p>

  <h2>使用方法</h2>
  <ol>
    <li>安装依赖：
      <pre><code>npm install</code></pre>
    </li>
    <li>本地运行：
      <pre><code>npm run dev</code></pre>
    </li>
    <li>部署到Cloudflare Workers：
      <pre><code>npm run deploy</code></pre>
    </li>
  </ol>

  <h2>类型生成</h2>
  <p>For generating/synchronizing types based on your Worker configuration run:
    <a href="https://developers.cloudflare.com/workers/wrangler/commands/#types">https://developers.cloudflare.com/workers/wrangler/commands/#types</a>
  </p>
  <pre><code>npm run cf-typegen</code></pre>
  <p>Pass the <code>CloudflareBindings</code> as generics when instantiation <code>Hono</code>:</p>
  <pre><code>// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()</code></pre>

  <h2>域名列表</h2>
  <p>当前支持的域名列表如下：</p>
  <pre><code>const domains = {
  staticList: [
    'https://z-library.rs',
    'https://z-library.do',
    'https://z-lib.gs',
    'https://z-lib.gd',
    'https://z-lib.do',
    'https://z-lib.fm'
  ]
}</code></pre>

  <h2>API 端点</h2>
  <ul>
    <li><code>GET /zlibrary</code>: 检查并返回可用的Z-Library域名</li>
  </ul>
</div>
`