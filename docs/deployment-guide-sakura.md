# 🚀 **大創バス网站 - 共享主机部署手册**

## 📋 **目录**
1. [部署环境信息](#部署环境信息)
2. [SSH连接配置](#ssh连接配置)
3. [部署前准备](#部署前准备)
4. [环境变量配置](#环境变量配置)
5. [本地构建流程](#本地构建流程)
6. [文件上传部署](#文件上传部署)
7. [测试验证](#测试验证)
8. [备份和回滚](#备份和回滚)
9. [故障排除](#故障排除)

---

## 🖥️ **部署环境信息**

### **服务器环境配置**
```bash
服务器类型: 共享主机（さくらのレンタルサーバ / Standard）
SSH主机: daisuobus.sakura.ne.jp
SSH端口: 22
SSH用户: daisuobus
网站目录（公开目录）: /home/daisuobus/www/
WordPress后端: https://daisoubus.jp/blog/
React前端域名: https://daisoubus.jp/
```

### **重要说明**
⚠️ **本部署环境为共享主机，不支持**：
- Node.js运行时
- PM2进程管理
- Nginx/Apache配置修改
- 系统级软件安装

✅ **支持的功能**：
- 静态文件托管
- SSH文件传输
- 文件管理面板

### **目录结构**
```bash
/home/daisuobus/www/
├── index.html          # 主页文件
├── assets/             # 静态资源
│   ├── index-xxx.js    # 应用逻辑
│   ├── index-xxx.css   # 样式文件
│   └── ...
├── images/             # 图片资源
├── icons/              # 图标文件
└── blog/               # WordPress后端（已存在）
```

---

## 🔐 **SSH连接配置**

### **第一步：SSH密钥配置**

#### **1.1 生成SSH密钥（如果没有）**
```powershell
# Windows PowerShell中执行
ssh-keygen -t rsa -b 4096 -C "your.email@example.com"

# 保存在默认位置：C:\Users\用户名\.ssh\id_rsa
```

#### **1.2 上传公钥到服务器**
1. 复制公钥内容：
```powershell
Get-Content "$env:USERPROFILE\.ssh\id_rsa.pub"
```

2. 在服务器控制面板中：
   - 登录樱花「服务器控制面板」
   - 找到「SSH公開鍵」
   - 注册公钥内容（如已注册请跳过）

#### **1.3 测试SSH连接**
```powershell
# 测试连接
ssh -p 22 daisuobus@daisuobus.sakura.ne.jp

# 或指定密钥文件
ssh -p 22 -i "$env:USERPROFILE\.ssh\id_rsa" daisuobus@daisuobus.sakura.ne.jp
```

---

## 🛠️ **部署前准备**

### **第二步：本地环境检查**

#### **2.1 检查本地工具**
```powershell
# 检查Node.js
node --version

# 检查yarn
yarn --version

# 检查Git
git --version

# 检查SSH工具
ssh -V
```

#### **2.2 项目依赖安装**
```powershell
# 进入项目目录
cd E:\workspace\projects\daisou-bus-website

# 安装依赖
yarn install

# 验证安装
yarn list --depth=0
```

### **第三步：备份服务器文件**

#### **3.1 连接服务器进行备份**
```bash
# SSH连接到服务器
ssh -p 22 -i "$env:USERPROFILE\.ssh\id_rsa" daisuobus@daisuobus.sakura.ne.jp

# 进入网站目录
cd /home/daisuobus/www/

# 创建备份目录
mkdir -p ../backup/$(date +%Y%m%d-%H%M%S)

# 备份当前文件
cp -r * ../backup/$(date +%Y%m%d-%H%M%S)/

# 确认备份
ls -la ../backup/
```

---

## ⚙️ **环境变量配置**

### **第四步：创建生产环境配置**

#### **4.1 创建环境变量文件**
```powershell
# 在项目根目录创建 .env.production
@"
# 生产环境配置
NODE_ENV=production

# WordPress API配置
VITE_WP_API_URL=https://daisoubus.jp/blog/wp-json/wp/v2

# 应用配置
VITE_APP_TITLE=大創バス
VITE_APP_VERSION=2.0.0

# 性能配置
VITE_BUILD_SOURCEMAP=false
VITE_BUILD_MINIFY=true

# 多语言配置
VITE_DEFAULT_LANGUAGE=ja
VITE_SUPPORTED_LANGUAGES=ja,en

# 其他配置
VITE_CONTACT_EMAIL=info@daisoubus.jp
VITE_API_TIMEOUT=10000
"@ | Out-File -FilePath ".env.production" -Encoding UTF8
```

#### **4.2 修改源代码确保环境变量生效**
在 `src/services/newsService.ts` 中添加默认值：
```typescript
// 确保环境变量有默认值
private baseUrl = import.meta.env.VITE_WP_API_URL || 'https://daisoubus.jp/blog/wp-json/wp/v2';
```

#### **4.3 清理本地环境变量**
```powershell
# 删除或注释 .env.local 文件中的冲突配置
# 确保生产环境变量优先级
```

---

## 🔨 **本地构建流程**

### **第五步：构建生产版本**

#### **5.1 清理构建缓存**
```powershell
# 删除旧构建文件
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue

# 清理Vite缓存
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
```

#### **5.2 执行生产构建**
```powershell
# 构建生产版本
yarn build --mode production

# 检查构建结果
dir dist
```

#### **5.3 验证构建内容**
```powershell
# 检查主要文件
Get-ChildItem dist -Recurse | Where-Object {$_.Length -gt 0} | Format-Table Name, Length

# 验证API URL配置
Get-Content dist\assets\index-*.js | Select-String "daisoubus\.jp/blog"

# 确认没有localhost引用
Get-Content dist\assets\index-*.js | Select-String "localhost"
```

---

## 📤 **文件上传部署**

### **第六步：上传构建文件**

#### **6.1 上传主文件**
上传所有内容
```
scp -P 22 -r -i "$env:USERPROFILE\.ssh\id_rsa" dist/* daisuobus@daisuobus.sakura.ne.jp:/home/daisuobus/www/

# 上传.htaccess文件
scp -P 22 -i "$env:USERPROFILE\.ssh\id_rsa" dist/.htaccess daisuobus@daisuobus.sakura.ne.jp:/home/daisuobus/www/.htaccess

#创建api目录上传邮件发送相关的api
ssh -p 22 -i "$env:USERPROFILE\.ssh\id_rsa" daisuobus@daisuobus.sakura.ne.jp "mkdir -p /home/daisuobus/www/api"
scp -P 22 -i "$env:USERPROFILE\.ssh\id_rsa" api/send_email.php daisuobus@daisuobus.sakura.ne.jp:/home/daisuobus/www/api/
```

```powershell
# 上传主页文件
scp -P 22 -i "$env:USERPROFILE\.ssh\id_rsa" dist/index.html daisuobus@daisuobus.sakura.ne.jp:/home/daisuobus/www/

# 确认上传成功
ssh -p 22 -i "$env:USERPROFILE\.ssh\id_rsa" daisuobus@daisuobus.sakura.ne.jp "ls -la /home/daisuobus/www/index.html"
```

#### **6.2 上传静态资源**
```powershell
# 获取实际的资源文件名
$jsFile = Get-ChildItem dist\assets\*.js | Select-Object -First 1
$cssFile = Get-ChildItem dist\assets\*.css | Select-Object -First 1

# 上传JS文件
scp -P 22 -i "$env:USERPROFILE\.ssh\id_rsa" $jsFile.FullName daisuobus@daisuobus.sakura.ne.jp:/home/daisuobus/www/assets/

# 上传CSS文件
scp -P 22 -i "$env:USERPROFILE\.ssh\id_rsa" $cssFile.FullName daisuobus@daisuobus.sakura.ne.jp:/home/daisuobus/www/assets/

# 批量上传所有assets（如果文件较多）
scp -P 22 -r -i "$env:USERPROFILE\.ssh\id_rsa" dist/assets/* daisuobus@daisuobus.sakura.ne.jp:/home/daisuobus/www/assets/
```

#### **6.3 上传其他资源文件**
```powershell
# 如果有新的图片或其他资源
scp -P 22 -r -i "$env:USERPROFILE\.ssh\id_rsa" public/images/* daisuobus@daisuobus.sakura.ne.jp:/home/daisuobus/www/images/

scp -P 22 -r -i "$env:USERPROFILE\.ssh\id_rsa" public/icons/* daisuobus@daisuobus.sakura.ne.jp:/home/daisuobus/www/icons/
```

#### **6.4 设置文件权限**
```bash
# SSH连接到服务器设置权限
ssh -p 22 -i "$env:USERPROFILE\.ssh\id_rsa" daisuobus@daisuobus.sakura.ne.jp

# 设置文件权限
cd /home/daisuobus/www/
chmod 644 index.html
chmod -R 644 assets/*
chmod -R 755 images/
chmod -R 755 icons/
```

---

## 🧪 **测试验证**

### **第七步：功能测试**

#### **7.1 基础功能测试**
```powershell
# 测试网站可访问性
curl -I https://daisoubus.jp/

# 测试首页内容
curl -s https://daisoubus.jp/ | Select-String -Pattern '<title>'

# 测试静态资源
curl -I https://daisoubus.jp/assets/index-***.js
```

#### **7.2 API功能测试**
```powershell
# 测试WordPress API连接
curl "https://daisoubus.jp/blog/wp-json/wp/v2/posts?_fields=id,title&per_page=3"

# 测试多语言API
curl "https://daisoubus.jp/blog/wp-json/wp/v2/posts?lang=ja&_fields=id,title,polylang_lang&per_page=3"

# 测试分类API
curl "https://daisoubus.jp/blog/wp-json/wp/v2/categories?lang=ja&_fields=id,name,slug"
```

#### **7.3 前端功能验证**
在浏览器中测试：
- [ ] 网站首页正常加载
- [ ] 语言切换功能正常
- [ ] 新闻列表显示正确
- [ ] 新闻详情页正常
- [ ] 多语言内容筛选正常
- [ ] 图片和静态资源加载正常
- [ ] 移动端显示正常
- [ ] 控制台无API错误

---

## 📋 **备份和回滚**

### **第八步：备份策略**

#### **8.1 自动备份脚本**
```bash
# 在服务器上创建备份脚本
cat > ~/backup-website.sh << 'EOF'
#!/bin/bash

BACKUP_DIR="$HOME/backup"
SITE_DIR="$HOME/www"
DATE=$(date +%Y%m%d-%H%M%S)

# 创建备份目录
mkdir -p "$BACKUP_DIR"

# 备份网站文件
tar -czf "$BACKUP_DIR/daisoubus-$DATE.tar.gz" -C "$SITE_DIR" .

# 保留最近10个备份
cd "$BACKUP_DIR"
ls -t daisoubus-*.tar.gz | tail -n +11 | xargs -r rm

echo "备份完成: daisoubus-$DATE.tar.gz"
EOF

chmod +x ~/backup-website.sh
```

#### **8.2 快速回滚方法**
```bash
# 恢复备份的方法
cd ~/backup
ls -la daisoubus-*.tar.gz

# 选择要恢复的备份
BACKUP_FILE="daisoubus-20241224-120000.tar.gz"

# 备份当前文件
tar -czf "current-backup-$(date +%Y%m%d-%H%M%S).tar.gz" -C ~/www .

# 恢复备份
cd ~/www
tar -xzf ~/backup/$BACKUP_FILE
```

---

## 🔧 **故障排除**

### **常见问题和解决方案**

#### **问题1：SSH连接失败**
```powershell
# 检查连接参数
ssh -v -p 22 daisuobus@daisuobus.sakura.ne.jp

# 常见解决方案：
# 1. 确认主机名: daisuobus.sakura.ne.jp
# 2. 确认端口: 22
# 3. 确认用户名: daisuobus
# 4. 检查SSH密钥是否正确添加到服务器
```

#### **问题2：API请求返回HTML而不是JSON**
```javascript
// 检查构建后的baseUrl配置
// 确保没有 "undefined" 或 "localhost" 
// 应该是: "https://daisoubus.jp/blog/wp-json/wp/v2"
```

#### **问题3：环境变量不生效**
```powershell
# 解决步骤：
# 1. 删除 .env.local 文件
Remove-Item .env.local -ErrorAction SilentlyContinue

# 2. 确认 .env.production 内容正确
Get-Content .env.production

# 3. 在代码中添加默认值
# private baseUrl = import.meta.env.VITE_WP_API_URL || 'https://daisoubus.jp/blog/wp-json/wp/v2';

# 4. 清理缓存重新构建
Remove-Item -Recurse -Force dist, node_modules\.vite
yarn build --mode production
```

#### **问题4：静态文件404错误**
```bash
# 检查文件权限
ssh -p 22 daisuobus@daisuobus.sakura.ne.jp "ls -la /home/daisuobus/www/assets/"

# 设置正确权限
ssh -p 22 daisuobus@daisuobus.sakura.ne.jp "chmod -R 644 /home/daisuobus/www/assets/*"
```

#### **问题5：文件上传失败**
```powershell
# 检查网络连接
Test-NetConnection -ComputerName daisuobus.sakura.ne.jp -Port 22

# 检查SSH密钥权限
icacls "$env:USERPROFILE\.ssh\id_rsa"

# 使用详细模式调试
scp -v -P 22 -i "$env:USERPROFILE\.ssh\id_rsa" dist/index.html daisuobus@daisuobus.sakura.ne.jp:/home/daisuobus/www/
```

---

## 📝 **部署检查清单**

### **部署前检查**
- [ ] 备份当前服务器文件
- [ ] 检查本地构建环境
- [ ] 验证SSH连接正常
- [ ] 确认环境变量配置

### **构建过程检查**
- [ ] 清理旧构建文件和缓存
- [ ] 环境变量正确配置
- [ ] 构建过程无错误
- [ ] 验证API URL正确嵌入
- [ ] 检查构建文件大小合理

### **部署过程检查**
- [ ] 主页文件上传成功
- [ ] 静态资源上传完整
- [ ] 文件权限设置正确
- [ ] 目录结构正确

### **部署后检查**
- [ ] 网站正常访问
- [ ] API请求正常（无undefined错误）
- [ ] 多语言功能正常
- [ ] 新闻列表和详情正常
- [ ] 图片资源加载正常
- [ ] 移动端显示正常
- [ ] 控制台无错误

---

## 🎯 **一键部署脚本**

### **Windows PowerShell部署脚本**
```powershell
# 创建一键部署脚本：deploy.ps1
@"
# 大創バス网站一键部署脚本

Write-Host "🚀 开始部署大創バス网站..." -ForegroundColor Green

# 1. 清理构建缓存
Write-Host "📁 清理构建缓存..." -ForegroundColor Yellow
Remove-Item -Recurse -Force dist, node_modules\.vite -ErrorAction SilentlyContinue

# 2. 构建生产版本
Write-Host "🔨 构建生产版本..." -ForegroundColor Yellow
yarn build --mode production

if (-not (Test-Path "dist/index.html")) {
    Write-Host "❌ 构建失败！" -ForegroundColor Red
    exit 1
}

# 3. 验证API URL
Write-Host "🔍 验证API配置..." -ForegroundColor Yellow
$jsFile = Get-ChildItem dist\assets\*.js | Select-Object -First 1
$content = Get-Content $jsFile.FullName -Raw
if ($content -match "daisoubus\.jp/blog") {
    Write-Host "✅ API URL配置正确" -ForegroundColor Green
} else {
    Write-Host "❌ API URL配置错误" -ForegroundColor Red
    exit 1
}

# 4. 上传文件
Write-Host "📤 上传文件到服务器..." -ForegroundColor Yellow
$sshKey = "$env:USERPROFILE\.ssh\id_rsa"
$server = "daisuobus@daisuobus.sakura.ne.jp"
$remotePath = "/home/daisuobus/www"

# 上传主文件
scp -P 22 -i $sshKey dist/index.html ${server}:${remotePath}/

# 上传资源文件
scp -P 22 -r -i $sshKey dist/assets/* ${server}:${remotePath}/assets/

# 5. 测试网站
Write-Host "🧪 测试网站..." -ForegroundColor Yellow
Start-Sleep 3
try {
    $response = Invoke-WebRequest -Uri "https://daisoubus.jp/" -Method Head -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ 网站部署成功！" -ForegroundColor Green
        Write-Host "🌐 访问地址: https://daisoubus.jp/" -ForegroundColor Cyan
    }
} catch {
    Write-Host "⚠️  网站可能需要几分钟才能生效" -ForegroundColor Yellow
}

Write-Host "🎉 部署完成！" -ForegroundColor Green
"@ | Out-File -FilePath "deploy.ps1" -Encoding UTF8
```

### **使用方法**
```powershell
# 运行部署脚本
.\deploy.ps1
```

---

**🎉 恭喜！大創バス网站共享主机部署手册已完成！**

本手册基于实际部署经验编写，适用于共享主机环境的静态文件部署。按照此流程，您可以成功将React应用部署到生产环境，并与WordPress后端API完美配合。 