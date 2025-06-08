import { Hono } from 'hono'
import { readmeContent } from './readmeContent'
import { Context } from 'hono'
import { proxy } from 'hono/proxy'
type Bindings = {

  kv:KVNamespace
}
const app = new Hono<{ Bindings: Bindings }>()

const domains = {
  staticList: [
    
    
  
    'https://z-lib.gd',
   
    
    'https://1lib.sk',
    'https://z-lib.fm',
    'https://z-lib.gl',
    'https://z-lib.fo'
  ]
}



async function checkDomain(domain: string, c: Context) {
  try {
    const response = await fetch(`${domain}/p/index.php?v=${Date.now()}`, {
    })
    return response.status === 200 && (await response.text()).length > 0;
  } catch {
    return false;
  }
}



app.get('/zlibrary', async (c) => {
  const cacheKey = 'availableDomain';
  const cachedDomain = await c.env.kv.get(cacheKey);
  if (cachedDomain) {
    return c.redirect(cachedDomain);
  }

  const checks = domains.staticList.map(async domain => {
    return { domain, available: await checkDomain(domain, c) }
  })

  const results = await Promise.all(checks)
  const availableDomain = results.find(r => r.available)?.domain

  if (availableDomain) {
    await c.env.kv.put(cacheKey, availableDomain, { expirationTtl: 86400 });
    return c.redirect(availableDomain)
  }

  return c.text('No available domains', 503)
})



app.get('/', async (c) => {

  
  return c.html(readmeContent);
});

app.get('/zlibrary-js', async (c) => {
  const jsCode = `
    (async function() {
      const domains = [
    
    
  
    'https://z-lib.gd',
   
    
    'https://1lib.sk',
    'https://z-lib.fm',
    'https://z-lib.gl',
    'https://z-lib.fo'
  ];

      const checkDomain = async (domain) => {
        try {
          const response = await fetch(\`\${domain}/p/index.php?v=\${Date.now()}\`);
          return response.status === 200 && (await response.text()).length > 0;
        } catch {
          return false;
        }
      };

      const statusContainer = document.getElementById('status-container');
    const domainList = document.getElementById('domain-list');
    const progressFill = document.querySelector('.progress-fill');
    
    // 初始化状态列表
    domains.forEach(domain => {
      const div = document.createElement('div');
      div.className = 'domain-status';
      div.innerHTML = \`
        <div class="status-dot"></div>
        <span class="domain-name">\${domain}</span>
        <span class="status-text">检查中...</span>
      \`;
      domainList.appendChild(div);
    });

    const checks = domains.map(async (domain, index) => {
      const statusElement = domainList.children[index];
      const dot = statusElement.querySelector('.status-dot');
      const text = statusElement.querySelector('.status-text');
      
      try {
        const result = await checkDomain(domain);
        dot.style.background = result ? '#4CAF50' : '#f44336';
        dot.style.animation = 'none';
        text.textContent = result ? '可用 ✔' : '不可用 ✘';
        
        // 更新进度条
        const progress = ((index + 1) / domains.length) * 100;
        progressFill.style.width = \`\${progress}%\`;
        
        return { domain, available: result };
      } catch (e) {
        dot.style.background = '#ff9800';
        text.textContent = '检查失败';
        return { domain, available: false };
      }
    });

      const results = await Promise.all(checks);
      const availableDomain = results.find(r => r.available)?.domain;

      if (availableDomain) {
      statusContainer.innerHTML += \`
        <div style="margin-top:20px; padding:15px; background:#e8f5e9; border-radius:4px;">
          找到可用域名：\${availableDomain}
          <br><br>
          <small>3秒后自动跳转...</small>
        </div>
      \`;
      setTimeout(() => {
        window.location.href = availableDomain;
      }, 3000);
    } else {
      statusContainer.innerHTML += \`
        <div style="margin-top:20px; padding:15px; background:#ffebee; border-radius:4px;">
          所有域名均不可用，请稍后再试
        </div>
      \`;
    }
    })();
  `;
  return c.html(`
<style>
  #status-container {
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  .domain-status {
    display: flex;
    align-items: center;
    margin: 8px 0;
    padding: 12px;
    border-radius: 4px;
    background: #f5f5f5;
  }
  .status-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 10px;
    animation: pulse 1.5s infinite;
  }
  .progress-bar {
    height: 8px;
    background: #eee;
    border-radius: 4px;
    margin: 20px 0;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    width: 0%;
    background: #4CAF50;
    transition: width 0.3s ease;
  }
  @keyframes pulse {
    0% { opacity: 0.6; transform: scale(0.9); }
    50% { opacity: 1; transform: scale(1.1); }
    100% { opacity: 0.6; transform: scale(0.9); }
  }
</style>
<div id="status-container">
  <h2>正在检查可用域名...</h2>
  <div class="progress-bar">
    <div class="progress-fill"></div>
  </div>
  <div id="domain-list"></div>
</div>
<script>
${jsCode}
</script>`);
})

async function findAndCacheAvailableDomain(c: Context) {
  const checks = domains.staticList.map(async domain => ({
    domain,
    available: await checkDomain(domain, c)
  }));
  
  const results = await Promise.all(checks);
  const availableDomain = results.find(r => r.available)?.domain;
  
  if (availableDomain) {
    await c.env.kv.put('availableDomain', availableDomain, { expirationTtl: 86400 });
    return availableDomain;
  }
  return null;
}

app.all('/proxy/*', async (c) => {
  let cachedDomain = await c.env.kv.get('availableDomain');
  
  if (!cachedDomain) {
    cachedDomain = await findAndCacheAvailableDomain(c);
    if (!cachedDomain) return c.text('没有可用的域名', 503);
  }
  
  return proxy(
    `${cachedDomain}${c.req.path.replace('/proxy', '')}`,
    {
      headers: {
        ...c.req.header(),
        'X-Forwarded-For': c.req.header('cf-connecting-ip'),
        'X-Forwarded-Host': new URL(cachedDomain).hostname
      }
    }
  );
});

export default app
