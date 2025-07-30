export const readmeContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="https://img.icons8.com/external-tal-revivo-tritone-tal-revivo/100/external-cloudflare-provides-content-delivery-network-services-ddos-mitigation-logo-tritone-tal-revivo.png">
    <title>Z-Library 智能重定向服务</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.6;
            color: #171717;
            background-color: #ffffff;
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        header {
            background-color: #ffffff;
            border-bottom: 1px solid #e0e0e0;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
        }
        
        .logo {
            font-size: 1.5rem;
            font-weight: bold;
            color: #667eea;
            text-decoration: none;
        }
        
        .nav-links {
            display: flex;
            gap: 2rem;
            list-style: none;
        }
        
        .nav-links a {
            text-decoration: none;
            color: #171717;
            font-weight: 500;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .nav-links a:hover {
            background-color: #f0f0f0;
            color: #171717;
        }
        
        .nav-links a.primary {
            background-color: #171717;
            color: #ffffff;
        }
        
        .nav-links a.primary:hover {
            background-color: #000000;
            color: #ffffff;
        }
        
        main {
            padding: 4rem 0;
        }
        
        .hero {
            text-align: center;
            margin-bottom: 4rem;
        }
        
        .hero h1 {
            font-size: 3rem;
            font-weight: bold;
            color: #171717;
            margin-bottom: 1rem;
        }
        
        .hero p {
            font-size: 1.2rem;
            color: #171717;
            max-width: 600px;
            margin: 0 auto 2rem;
        }
        
        .cta-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .btn {
            display: inline-block;
            padding: 1rem 2rem;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 600;
            transition: all 0.3s ease;
            border: 1px solid #171717;
            cursor: pointer;
            font-size: 1rem;
            background-color: #ffffff;
            color: #171717;
        }
        
        .btn:hover {
            background-color: #f0f0f0;
        }
        
        .btn-primary {
            background-color: #171717;
            color: #ffffff;
        }
        
        .btn-primary:hover {
            background-color: #000000;
            color: #ffffff;
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-bottom: 4rem;
        }
        
        .feature-card {
            background-color: #ffffff;
            padding: 2rem;
            border-radius: 8px;
            border: 1px solid #e0e0e0;
            transition: all 0.3s ease;
        }
        
        .feature-card:hover {
            border-color: #171717;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .feature-icon {
            width: 60px;
            height: 60px;
            background-color: #f0f0f0;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
            font-size: 1.5rem;
            color: #171717;
        }
        
        .feature-card h3 {
            color: #171717;
            margin-bottom: 1rem;
            font-size: 1.3rem;
            font-weight: bold;
        }
        
        .feature-card p {
            color: #171717;
            line-height: 1.6;
        }
        
        .domains-section {
            background-color: #ffffff;
            padding: 3rem;
            border-radius: 8px;
            border: 1px solid #e0e0e0;
            margin-bottom: 3rem;
        }
        
        .domains-section h2 {
            text-align: center;
            color: #171717;
            margin-bottom: 2rem;
            font-size: 2rem;
            font-weight: bold;
        }
        
        .domain-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
        }
        
        .domain-item {
            background-color: #f0f0f0;
            padding: 1rem;
            border-radius: 4px;
            border-left: 4px solid #171717;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 0.9rem;
            color: #171717;
        }
        
        footer {
            text-align: center;
            padding: 2rem 0;
            color: #171717;
            background-color: #ffffff;
            border-top: 1px solid #e0e0e0;
        }
        
        @media (max-width: 768px) {
            .nav-links {
                flex-direction: column;
                gap: 1rem;
            }
            
            .hero h1 {
                font-size: 2rem;
            }
            
            .cta-buttons {
                flex-direction: column;
                align-items: center;
            }
            
            .domains-section {
                padding: 2rem 1rem;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <nav>
                <a href="/" class="logo">📚 Z-Library 重定向</a>
                <ul class="nav-links">
                    <li><a href="/zlibrary-js" class="primary">↗️ 重定向至zlibrary</a></li>
                </ul>
            </nav>
        </div>
    </header>
    
    <main>
        <div class="container">
            <section class="hero">
                <h1>Z-Library 智能重定向服务</h1>
                <p>自动检测可用的 Z-Library 域名，为您提供最快速、最稳定的访问体验。支持实时域名检测和智能缓存机制。</p>
                <div class="cta-buttons">
                    <a href="/zlibrary-js" class="btn btn-primary">↗️ 重定向至zlibrary</a>
                </div>
            </section>
            
            <section class="features">
                <div class="feature-card">
                    <div class="feature-icon">↗️</div>
                    <h3>重定向至zlibrary</h3>
                    <p>自动检测可用的Z-Library域名并重定向</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">⚡</div>
                    <h3>自动跳转</h3>
                    <p>检测到可用域名后自动跳转，无需手动选择。支持倒计时显示和立即跳转按钮。</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🛡️</div>
                    <h3>稳定可靠</h3>
                    <p>基于 Cloudflare Workers 构建，全球边缘节点部署，提供99.9%的服务可用性和极低的延迟。</p>
                </div>
            </section>
            
            <section class="domains-section">
                <h2>🌐 支持的域名列表</h2>
                <div class="domain-list">
                    <div class="domain-item">https://z-lib.gd</div>
                    <div class="domain-item">https://1lib.sk</div>
                    <div class="domain-item">https://z-lib.fm</div>
                    <div class="domain-item">https://z-lib.gl</div>
                    <div class="domain-item">https://z-lib.fo</div>
                    <div class="domain-item">https://z-library.sk</div>
                    <div class="domain-item">https://zh.z-library.ec</div>
                </div>
            </section>
        </div>
    </main>
    
    <footer>
        <div class="container">
            <p>&copy; 2024 Z-Library 重定向服务 | 基于 Cloudflare Workers 构建</p>
            <div style="display: flex; align-items: center; justify-content: center; margin-top: 1rem;">
                <p>Created by Actrue</p>
                <a href="https://github.com/Actrue/zlibrary-Active-links-automatic-redirection" style="margin-left: 0.5rem;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.49.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"/>
                    </svg>
                </a>
            </div>
        </div>
    </footer>
</body>
</html>
`