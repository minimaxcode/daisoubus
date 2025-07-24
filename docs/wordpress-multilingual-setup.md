# 🚀 WordPress多语言REST API完整配置指南

## 📋 目录
1. [环境要求](#环境要求)
2. [插件安装与配置](#插件安装与配置)
3. [扩展代码配置](#扩展代码配置)
4. [语言和内容配置](#语言和内容配置)
5. [API测试验证](#api测试验证)
6. [故障排除](#故障排除)
7. [最佳实践建议](#最佳实践建议)

---

## 🛠️ 环境要求

### 基础要求
- WordPress 5.0+
- PHP 7.4+
- MySQL 5.7+ 或 MariaDB 10.2+
- 管理员权限

### 推荐配置
- WordPress 6.0+
- PHP 8.0+
- 启用了 `wp-json` REST API
- SSL证书（HTTPS）

---

## 📦 插件安装与配置

### 第一步：安装核心插件

#### 1.1 安装Polylang
```bash
WordPress后台 → 插件 → 新增插件
搜索：Polylang
安装并启用：Polylang（免费版即可）
```

#### 1.2 安装Code Snippets
```bash
WordPress后台 → 插件 → 新增插件
搜索：Code Snippets
安装并启用：Code Snippets
```

### 第二步：配置Polylang

#### 2.1 添加语言
```bash
WordPress后台 → 语言 → 语言

1. 添加日语：
   - 语言代码：ja
   - 语言名称：日本語
   - 国家旗帜：Japan

2. 添加英语：
   - 语言代码：en
   - 语言名称：English
   - 国家旗帜：United Kingdom

3. 设置默认语言：日本語
```

#### 2.2 配置URL结构
```bash
WordPress后台 → 语言 → 设置 → URL修改

推荐设置：
✅ 在语言前添加语言信息到所有URL
✅ 隐藏默认语言的URL

URL结构示例：
- 日语（默认）：https://daisoubus.jp/
- 英语：https://daisoubus.jp/en/
```

#### 2.3 同步设置
```bash
WordPress后台 → 语言 → 设置 → 同步

建议启用：
✅ 分类法
✅ 文章格式
✅ 菜单
```

---

## 💻 扩展代码配置

### 第三步：添加REST API扩展代码

#### 3.1 创建代码片段
```bash
WordPress后台 → Code Snippets → 新增
```

#### 3.2 配置代码片段
```php
标题：Polylang REST API Extension
描述：为Polylang免费版添加完整的REST API支持

运行位置：Run snippet everywhere
```

#### 3.3 添加扩展代码
将文件 `docs/lang_rest_app.php` 中的完整代码复制粘贴到代码片段中。

> **重要提示**: 请确保复制完整的代码，包括所有函数和类定义。

#### 3.4 激活代码片段
```bash
1. 点击"保存更改并激活"
2. 确认状态为"激活"
3. 记录代码片段ID（用于后续管理）
```

---

## 📝 语言和内容配置

### 第四步：配置分类

#### 4.1 创建多语言分类
```bash
WordPress后台 → 文章 → 分类目录

1. 创建日语分类：
   - 名称：お知らせ
   - 别名：announcement
   - 语言：日本語

2. 创建英语分类：
   - 名称：Announcement
   - 别名：announcement-en
   - 语言：English

3. 链接翻译关系：
   编辑分类 → 翻译 → 选择对应的翻译版本
```

#### 4.2 分类示例配置
| 日语分类 | 英语分类 | 用途 |
|----------|----------|------|
| お知らせ (announcement) | Announcement (announcement-en) | 一般公告 |
| 車両情報 (fleet) | Fleet Info (fleet-en) | 车队信息 |
| キャンペーン (campaign) | Campaign (campaign-en) | 活动信息 |
| 安全情報 (safety) | Safety (safety-en) | 安全信息 |

### 第五步：配置文章内容

#### 5.1 创建日语文章
```bash
WordPress后台 → 文章 → 新增文章

1. 基本信息：
   - 标题：[日语标题]
   - 内容：[日语内容]
   - 分类：选择日语分类
   - 语言：日本語

2. 发布文章
```

#### 5.2 创建英语翻译
**方法1 - 手动创建：**
```bash
1. 文章列表中点击"+"号
2. 选择"English"
3. 填写英语内容
4. 选择对应的英语分类
```

**方法2 - 翻译界面：**
```bash
1. 编辑日语文章
2. 在翻译栏中点击"English"下的"+"
3. 创建翻译版本
```

#### 5.3 验证翻译关系
确认以下设置正确：
- ✅ 每篇文章都设置了语言
- ✅ 翻译文章已经正确链接
- ✅ 分类的翻译关系已建立
- ✅ 文章分配到正确的语言分类

---

## 🧪 API测试验证

### 第六步：基础API测试

#### 6.1 测试新字段
```bash
# 测试文章语言字段
GET https://yourdomain.com/wp-json/wp/v2/posts?_fields=id,title,polylang_lang,polylang_translations

# 预期结果：
{
  "id": 123,
  "title": {"rendered": "文章标题"},
  "polylang_lang": "ja",
  "polylang_translations": {"ja": 123, "en": 456}
}
```

#### 6.2 测试语言筛选
```bash
# 测试日语文章筛选
GET https://yourdomain.com/wp-json/wp/v2/posts?lang=ja

# 测试英语文章筛选
GET https://yourdomain.com/wp-json/wp/v2/posts?lang=en

# 测试分类筛选
GET https://yourdomain.com/wp-json/wp/v2/categories?lang=ja
```

#### 6.3 测试新端点
```bash
# 测试语言列表
GET https://yourdomain.com/wp-json/polylang/v1/languages

# 测试当前语言
GET https://yourdomain.com/wp-json/polylang/v1/current-language

# 测试翻译查询
GET https://yourdomain.com/wp-json/polylang/v1/translate?post_id=123&lang=en
```

### 第七步：完整功能测试

#### 7.1 测试检查清单
- [ ] Polylang插件已激活
- [ ] Code Snippets插件已激活
- [ ] 扩展代码已激活
- [ ] 至少配置了2种语言（ja, en）
- [ ] 创建了多语言分类
- [ ] 创建了多语言文章
- [ ] 建立了翻译关系
- [ ] API返回正确的语言字段
- [ ] 语言筛选功能正常
- [ ] 新端点响应正常

#### 7.2 常用测试URL模板
```bash
# 基础测试
https://yourdomain.com/wp-json/wp/v2/posts
https://yourdomain.com/wp-json/wp/v2/categories

# 语言筛选测试
https://yourdomain.com/wp-json/wp/v2/posts?lang=ja&_fields=id,title,polylang_lang
https://yourdomain.com/wp-json/wp/v2/posts?lang=en&_fields=id,title,polylang_lang

# Polylang端点测试
https://yourdomain.com/wp-json/polylang/v1/languages
https://yourdomain.com/wp-json/polylang/v1/current-language
```

---

## 🔧 故障排除

### 常见问题解决方案

#### 问题1：API返回404错误
**原因**: 固定链接设置问题

**解决方案**:
```bash
1. WordPress后台 → 设置 → 固定链接
2. 选择任意选项
3. 点击"保存更改"
4. 重新测试API
```

#### 问题2：语言字段不显示
**原因**: 扩展代码未激活或Polylang未正确安装

**解决方案**:
```bash
1. 检查Code Snippets → 确认代码片段状态为"激活"
2. 检查插件 → 确认Polylang已激活
3. 检查错误日志 → WordPress后台查看错误信息
```

#### 问题3：语言筛选返回空结果
**原因**: 文章没有设置语言或翻译关系未建立

**解决方案**:
```bash
1. 编辑每篇文章 → 设置语言
2. 建立翻译关系
3. 重新测试API
```

#### 问题4：分类筛选不工作
**原因**: 分类的语言设置或翻译关系问题

**解决方案**:
```bash
1. 检查分类语言设置
2. 建立分类翻译关系
3. 确认分类被正确分配给文章
```

### 调试工具

#### 启用WordPress调试
```php
// 在wp-config.php中添加
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

#### 查看错误日志
```bash
日志位置：/wp-content/debug.log
或通过WordPress后台 → 工具 → 错误日志
```

### 性能优化建议

#### 数据库索引优化（可选）
如果网站有大量内容，可以考虑添加数据库索引：

```sql
-- 优化term relationships查询
ALTER TABLE wp_term_relationships ADD INDEX polylang_object_idx (object_id);

-- 优化term taxonomy查询  
ALTER TABLE wp_term_taxonomy ADD INDEX polylang_term_idx (term_id, taxonomy);

-- 优化posts查询
ALTER TABLE wp_posts ADD INDEX polylang_status_type_idx (post_status, post_type, post_date);
```

> **注意**: 数据库优化只在内容量超过1000篇文章时才需要考虑。

---

## 📚 最佳实践建议

### 内容管理
- ✅ 始终为新文章设置语言
- ✅ 创建翻译时保持一致的分类
- ✅ 定期检查翻译关系的完整性
- ✅ 使用清晰的命名约定

### API使用
- ✅ 使用 `_fields` 参数减少数据传输
- ✅ 适当使用缓存减少API调用
- ✅ 为API调用添加错误处理
- ✅ 监控API响应时间

### 维护建议
- ✅ 定期备份数据库
- ✅ 更新插件时测试API功能
- ✅ 监控错误日志
- ✅ 文档化自定义配置

### 安全建议
- ✅ 定期更新WordPress和插件
- ✅ 使用强密码和双因素认证
- ✅ 限制API访问频率
- ✅ 监控异常API请求

---

## 🎯 完成后的成果

配置完成后，您将拥有：

### ✅ 功能特性
- 完整的多语言REST API支持
- 智能语言筛选功能
- 翻译关系管理
- 自定义Polylang端点
- 类型安全的API响应

### ✅ API端点
```bash
# 标准端点（支持lang参数）
GET /wp-json/wp/v2/posts?lang=ja
GET /wp-json/wp/v2/categories?lang=en

# 自定义端点
GET /wp-json/polylang/v1/languages
GET /wp-json/polylang/v1/current-language
GET /wp-json/polylang/v1/translate?post_id=123&lang=en
```

### ✅ 性能优势
- 只获取指定语言的内容
- 减少不必要的数据传输
- 智能缓存机制
- 优化的数据库查询

### ✅ 成本效益
- **Polylang Pro**: €99/年
- **我们的免费方案**: €0 + 30分钟设置时间
- **节省成本**: €99/年，获得95%的Pro版功能

---

## 📞 技术支持

如果在配置过程中遇到问题，可以：

1. **检查文档**: 重新阅读相关章节
2. **查看错误日志**: WordPress调试日志
3. **测试基础功能**: 使用提供的测试URL
4. **回滚更改**: 如果需要，可以停用代码片段

---

## 📄 相关文件

- `docs/lang_rest_app.php` - 完整的PHP扩展代码
- `src/services/newsService.ts` - React服务文件
- `src/types/news.ts` - TypeScript类型定义

---

**恭喜！您现在拥有了一个功能完整的多语言WordPress REST API系统！** 🚀

*最后更新时间: 2024年12月* 