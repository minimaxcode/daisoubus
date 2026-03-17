# WordPress开发到部署完整指南

## 🔄 开发流程对比

### Local by Flywheel流程
```
本地开发(Local) → Live Links测试 → 生产部署
     ↓               ↓              ↓
  几分钟设置      实时分享URL    一键部署工具
```

### 传统手动流程  
```
本地开发(XAMPP) → 测试服务器 → 生产部署
     ↓               ↓           ↓
  复杂环境配置    手动文件传输  手动数据库处理
```

## 🏗️ 生产环境部署选择

### 1. WordPress托管服务（推荐）
- **WP Engine**: 专业WordPress托管
- **Kinsta**: 高性能WordPress主机
- **SiteGround**: 性价比较高
- **Bluehost**: 官方推荐主机

### 2. 云服务器
- **阿里云ECS**: 国内访问优化
- **腾讯云CVM**: 本土化服务
- **AWS EC2**: 全球化部署
- **Google Cloud**: 技术先进

### 3. VPS主机
- **DigitalOcean**: 开发者友好
- **Vultr**: 性价比高
- **Linode**: 稳定可靠

## 📊 部署成本分析

| 托管类型 | 月费用 | 技术要求 | 维护成本 | 适合场景 |
|----------|--------|----------|----------|----------|
| WordPress专业托管 | $30-100 | ⭐ | ⭐ | 商业网站 |
| 共享主机 | $5-20 | ⭐⭐ | ⭐⭐ | 小型网站 |
| VPS | $10-50 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 技术团队 |
| 云服务器 | $20-200 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 大型应用 |

## 🎯 大爽观光巴士项目建议

### 开发阶段：Local by Flywheel
```
✅ 快速启动开发
✅ 团队协作便利
✅ 客户演示方便
✅ 零维护成本
```

### 生产部署：WordPress专业托管
```
推荐：SiteGround或WP Engine
理由：
- SSL证书自动配置
- CDN加速（重要：日本用户访问）
- 自动备份
- 安全防护
- 技术支持
```

## 🚀 具体部署步骤

### 阶段1：本地开发完成
1. 在Local完成WordPress配置
2. 安装必需插件（ACF, Polylang）
3. 创建测试内容
4. 前端连接测试成功

### 阶段2：选择托管服务
1. 注册域名：daisoubus.com
2. 购买主机：建议SiteGround
3. 获取托管账户信息

### 阶段3：部署到生产环境
```bash
# 方式1：Local一键部署（如果支持）
Local → Connect → Production Host

# 方式2：手动部署
1. 导出Local站点
2. 上传文件到主机
3. 导入数据库
4. 配置域名和SSL
```

### 阶段4：前端配置更新
```env
# .env.production
VITE_WP_API_URL=https://daisoubus.jp/wp-json/wp/v2
VITE_USE_MOCK_DATA=false
```

## 🔧 部署后配置清单

### WordPress配置
- [ ] SSL证书启用
- [ ] 固定链接设置
- [ ] 缓存插件配置
- [ ] 安全插件安装
- [ ] 备份计划设置

### API配置
- [ ] CORS设置（如需要）
- [ ] REST API权限
- [ ] 自定义字段确认
- [ ] 多语言插件配置

### 前端部署
- [ ] 构建生产版本
- [ ] 更新API端点
- [ ] 测试所有功能
- [ ] 性能优化验证

## ⚠️ 常见部署问题

### 问题1：CORS跨域
```php
// WordPress主题functions.php
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: https://your-frontend-domain.com');
        return $value;
    });
});
```

### 问题2：URL路径问题
```javascript
// 确保API URL正确
const API_URL = process.env.VITE_WP_API_URL || 'https://daisoubus.jp/wp-json/wp/v2';
```

### 问题3：SSL混合内容
```javascript
// 确保所有资源都使用HTTPS
const imageUrl = image.startsWith('http://') 
    ? image.replace('http://', 'https://') 
    : image;
``` 