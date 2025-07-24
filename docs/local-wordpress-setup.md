# 本地WordPress部署指南

## 方案1：Local by Flywheel（推荐）

### 1. 下载安装
1. 访问：https://localwp.com/
2. 下载Windows版本
3. 安装后启动Local

### 2. 创建新站点
1. 点击"+ Create a new site"
2. 站点名称：`daisou-cms`
3. 选择"Preferred"环境
4. 设置WordPress用户名密码（记住这些信息）

### 3. 启动站点
- 点击"Start site"
- 记录本地URL（通常是 `http://daisou-cms.local`）
- 点击"WP Admin"进入后台

### 4. 必需插件安装
在WordPress后台 > 插件 > 安装插件：

#### Advanced Custom Fields (ACF)
```
1. 搜索"Advanced Custom Fields"
2. 安装并启用
3. 进入"自定义字段" > "字段组"
```

#### Polylang（多语言）
```
1. 搜索"Polylang"
2. 安装并启用
3. 进入"语言" > 添加日语和英语
```

### 5. 创建新闻字段组
进入"自定义字段" > "字段组" > "新增"：

#### 字段组设置
- **标题**：新闻文章字段
- **位置**：文章类型 等于 文章

#### 添加字段：
```
字段标签        字段名称       字段类型
英文标题        title_en       文本
英文摘要        excerpt_en     文本域
英文内容        content_en     Wysiwyg编辑器
英文分类        category_en    文本
是否精选        featured       真/假
```

### 6. 创建分类
进入"文章" > "分类目录"，创建：
```
お知らせ (Announcement)
車両情報 (Fleet News)
キャンペーン (Campaign)
安全対策 (Safety)
サービス (Service)
```

### 7. 测试数据创建
进入"文章" > "写文章"，创建几篇测试文章：

#### 示例文章1：
- **标题**：ホームページリニューアルのお知らせ
- **内容**：网站更新的详细内容...
- **分类**：お知らせ
- **自定义字段**：
  - title_en: Website Renewal Announcement
  - excerpt_en: Our website has been fully renewed...
  - category_en: Announcement
  - featured: 是

### 8. 启用REST API
WordPress默认启用REST API，测试URL：
```
http://daisou-cms.local/wp-json/wp/v2/posts
```

---

## 方案2：XAMPP（备选方案）

### 1. 下载安装XAMPP
1. 访问：https://www.apachefriends.org/
2. 下载Windows版本
3. 安装到 `C:\xampp`

### 2. 启动服务
1. 运行XAMPP Control Panel
2. 启动Apache和MySQL

### 3. 下载WordPress
1. 访问：https://cn.wordpress.org/
2. 下载最新版本
3. 解压到 `C:\xampp\htdocs\daisou-cms`

### 4. 创建数据库
1. 访问：http://localhost/phpmyadmin
2. 创建数据库：`daisou_cms`

### 5. 安装WordPress
1. 访问：http://localhost/daisou-cms
2. 按向导配置数据库连接
3. 完成安装

---

## 前端配置更新

### 更新环境变量
创建 `.env.local` 文件：
```env
# 本地WordPress API URL
VITE_WP_API_URL=http://daisou-cms.local/wp-json/wp/v2
# 或XAMPP: http://localhost/daisou-cms/wp-json/wp/v2

# 关闭模拟数据模式
VITE_USE_MOCK_DATA=false
```

### 测试API连接
在浏览器中访问：
```
http://daisou-cms.local/wp-json/wp/v2/posts?_embed&acf_format=standard
```

应该返回JSON格式的文章数据。

---

## 故障排除

### CORS问题解决
如果遇到跨域问题，在WordPress的 `functions.php` 中添加：

```php
// 允许跨域请求
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: http://localhost:5173');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        return $value;
    });
});
```

### 权限问题
确保WordPress目录有正确的读写权限。

### API测试工具
推荐使用Postman或浏览器测试API端点。 