import { Hono } from 'hono'
import { readmeContent } from './首页'
/*
type Bindings = {

  kv:KVNamespace
}
  */
const app = new Hono()

const domains = {
  staticList: [
    'https://z-lib.gd',
    'https://1lib.sk',
    'https://z-lib.fm',
    'https://z-lib.gl',
    'https://z-lib.fo'
  ]
}







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
        <div class="success-message">
          <div class="success-icon">🎉</div>
          <h3>找到可用域名！</h3>
          <p class="domain-url">\${availableDomain}</p>
          <div class="countdown">
            <span id="countdown-text">3秒后自动跳转...</span>
          </div>
          <button onclick="window.location.href='\${availableDomain}'" class="btn-redirect">立即跳转</button>
        </div>
      \`;
      
      let countdown = 3;
      const countdownElement = document.getElementById('countdown-text');
      const timer = setInterval(() => {
        countdown--;
        if (countdown > 0) {
          countdownElement.textContent = \`\${countdown}秒后自动跳转...\`;
        } else {
          clearInterval(timer);
          window.location.href = availableDomain;
        }
      }, 1000);
    } else {
      statusContainer.innerHTML += \`
        <div class="error-message">
          <div class="error-icon">😞</div>
          <h3>暂无可用域名</h3>
          <p>所有域名均不可用，请稍后再试</p>
          <button onclick="location.reload()" class="btn-retry">重新检测</button>
        </div>
      \`;
    }
    })();
  `;
  return c.html(`
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Z-Library 域名检测 - 智能重定向服务</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, Helvetica, sans-serif;
            background: #ffffff;
            min-height: 100vh;
            color: #171717;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .header {
            text-align: center;
            margin-bottom: 3rem;
        }
        
        .header h1 {
            color: #171717;
            font-size: 2.5rem;
            margin-bottom: 1rem;
            font-weight: bold;
        }
        
        .header p {
            color: #171717;
            font-size: 1.1rem;
        }
        
        .back-link {
            display: inline-block;
            color: #171717;
            text-decoration: none;
            margin-bottom: 2rem;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            transition: all 0.3s ease;
        }
        
        .back-link:hover {
            background: #f0f0f0;
            color: #171717;
        }
        
        #status-container {
            background: #ffffff;
            border-radius: 8px;
            padding: 2rem;
            border: 1px solid #e0e0e0;
        }
        
        #status-container h2 {
            text-align: center;
            color: #333;
            margin-bottom: 2rem;
            font-size: 1.8rem;
        }
        
        .progress-bar {
            height: 12px;
            background: #e0e0e0;
            border-radius: 6px;
            margin: 2rem 0;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            width: 0%;
            background: #171717;
            transition: width 0.5s ease;
            border-radius: 6px;
        }
        
        #domain-list {
            display: grid;
            gap: 1rem;
        }
        
        .domain-status {
            display: flex;
            align-items: center;
            padding: 1.5rem;
            background: #ffffff;
            border-radius: 8px;
            border: 1px solid #e0e0e0;
            border-left: 4px solid #171717;
            transition: all 0.3s ease;
        }
        
        .domain-status:hover {
            border-color: #171717;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .status-dot {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            margin-right: 1rem;
            background: #171717;
            animation: pulse 1.5s infinite;
            flex-shrink: 0;
        }
        
        .domain-name {
            font-family: 'Monaco', 'Menlo', monospace;
            font-weight: 600;
            color: #171717;
            flex: 1;
        }
        
        .status-text {
            font-weight: 500;
            color: #171717;
        }
        
        .success-message, .error-message {
            text-align: center;
            padding: 2rem;
            margin-top: 2rem;
            border-radius: 16px;
            animation: slideIn 0.5s ease;
        }
        
        .success-message {
            background: #ffffff;
            border: 1px solid #28a745;
            border-radius: 8px;
        }
        
        .error-message {
            background: #ffffff;
            border: 1px solid #dc3545;
            border-radius: 8px;
        }
        
        .success-icon, .error-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .success-message h3 {
            color: #171717;
            margin-bottom: 1rem;
            font-size: 1.5rem;
            font-weight: bold;
        }
        
        .error-message h3 {
            color: #171717;
            margin-bottom: 1rem;
            font-size: 1.5rem;
            font-weight: bold;
        }
        
        .domain-url {
            font-family: 'Monaco', 'Menlo', monospace;
            background: #f0f0f0;
            padding: 1rem;
            border-radius: 8px;
            margin: 1rem 0;
            font-weight: 600;
            color: #171717;
            word-break: break-all;
        }
        
        .countdown {
            margin: 1rem 0;
            font-size: 1.1rem;
            color: #171717;
        }
        
        .btn-redirect, .btn-retry {
            background: #ffffff;
            color: #171717;
            border: 1px solid #171717;
            padding: 1rem 2rem;
            border-radius: 4px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 1rem;
        }
        
        .btn-redirect:hover, .btn-retry:hover {
            background: #f0f0f0;
        }
        
        .btn-retry {
            background: #171717;
            color: #ffffff;
        }
        
        .btn-retry:hover {
            background: #000000;
        
        
        @keyframes pulse {
            0% { opacity: 0.6; transform: scale(0.9); }
            50% { opacity: 1; transform: scale(1.1); }
            100% { opacity: 0.6; transform: scale(0.9); }
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 1rem;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            #status-container {
                padding: 1.5rem;
            }
            
            .domain-status {
                padding: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="/" class="back-link">← 返回首页</a>
        
        <div class="header">
            <h1>🔍 域名检测中</h1>
            <p>正在并行检测所有 Z-Library 域名的可用性...</p>
        </div>
        
        <div id="status-container">
            <h2>检测进度</h2>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <div id="domain-list"></div>
        </div>
    </div>
    
    <script>
    ${jsCode}
    </script>
</body>
</html>`);
})



export default app
