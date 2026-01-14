# 🚚 Onamae → 樱花（Sakura）服务器迁移方案（初稿）

适用范围：`https://daisoubus.jp/`（Vite/React 静态站）+ `https://daisoubus.jp/blog/`（WordPress）+ `https://daisoubus.jp/api/send_email.php`（PHP 调用 Resend API 发信）。

---

## 迁移目标与原则

- **目标**：将当前 Onamae 共享主机上的站点完整迁移至樱花租用服务器 Standard，并保持域名与路径结构不变（`/`、`/blog/`、`/api/`）。
- **原则**：
  - **最小停机**：尽量先在樱花侧完成验证，再切换 DNS。
  - **可回滚**：保留 Onamae 原站不动，必要时 DNS 回切即可回滚。
  - **风险优先**：优先处理 SPA 路由重写、WP 数据库/媒体一致性、邮件接口可用性。

---

## 关键前提（与樱花 Standard 能力对齐）

- **SSH/SFTP**：樱花租用服务器支持 SSH/SFTP，但常见限制是仅“初期账号”可用（新增账号可能无法 SSH/SFTP）。参考：[help.sakura.ad.jp/rs/2247](https://help.sakura.ad.jp/rs/2247/?utm_source=openai)
- **`.htaccess`**：樱花租用服务器支持通过 `.htaccess` 做 Web 访问相关设置（用于 URL 重写/访问控制等）。参考：[help.sakura.ad.jp/rs/2214](https://help.sakura.ad.jp/rs/2214/?utm_source=openai)
- **WordPress 迁移**：
  - 优先 **SnapUp 自动迁移**（文件 + DB）：[help.sakura.ad.jp/purpose_beginner/2591](https://help.sakura.ad.jp/purpose_beginner/2591/?utm_source=openai)
  - 兜底 **手动迁移**（phpMyAdmin/FTP 思路）：[help.sakura.ad.jp/rs/2799](https://help.sakura.ad.jp/rs/2799/?utm_source=openai)
- **Standard 方案介绍（功能侧）**：包含 WordPress、免费 SSL、备份/Stage、CDN 等卖点：[rs.sakura.ad.jp/plan/standard](https://rs.sakura.ad.jp/plan/standard/)

---

## 当前站点现状（来自项目部署手册/代码）

- 现网 Onamae：共享主机（cPanel/WHM），目录结构为 `public_html/daisoubus.jp/`，WordPress 位于 `blog/`。
- 前端是 **Vite 构建产物**上传，服务器不运行 Node.js。
- 前端路由使用 `BrowserRouter`（SPA）：因此需要 **Web 服务器重写所有未知路径到 `/index.html`**，否则刷新 `/fleet` 等子路由会 404。
- `api/send_email.php` 通过 **cURL 调用 Resend HTTP API** 发信，不依赖 PHP `mail()`/SMTP，但依赖服务器能出站访问 `https://api.resend.com` 且启用 cURL。

---

## 已确认的樱花环境信息（当前）

> 本节用于记录“你现在已经验证可用”的樱花侧信息，后续迁移执行以此为准。

- **服务器主机名（Server hostname）**：`www3102.sakura.ne.jp`（可解析到 IP，HTTP/HTTPS 端口 80/443 可达）
- **初始域名（初始ドメイン）**：`daisoubus.sakura.ne.jp`
  - 说明：该域名用于面板/站点的初始访问与标识；网络层面可能出现“ping 不通/ICMP 不响应”或某些环境下 DNS 行为差异，这不影响 Web/SSH 正常使用。
- **SSH 登录（已成功）**：
  - 在 MobaXterm 中确认可使用 `daisoubus` 用户连接到 `daisoubus.sakura.ne.jp`（端口 `22`）进入 FreeBSD shell。
  - 备注：如需改用主机名连接，通常也可尝试 `www3102.sakura.ne.jp:22`（以实际可登录为准）。
- **网站公开目录（DocumentRoot）**：`/home/daisoubus/www/`
- **控制面板文件管理器限制**：`fileman2` 仅能操作公开目录（例如 `/home/daisoubus/www/`），无法进入/操作 `/home/daisoubus/` 上层账号目录属于正常限制。

---

## 迁移总体策略（推荐：先搭建、验证、再切 DNS）

### 阶段 0：准备与信息收集（不影响线上）

- **备份 Onamae**
  - 站点文件：`public_html/daisoubus.jp/`（至少包含 `blog/`、`api/`、静态站文件）
  - WordPress 数据库：导出 SQL（phpMyAdmin）
- **记录配置**
  - WP：数据库连接信息（DB host/name/user/pass）、WP 后台账号、插件清单
  - DNS：当前 A/AAAA/CNAME、MX、TXT（SPF/DKIM/DMARC 等，尤其是邮件相关 TXT）
  - 邮件：Resend 的域名验证相关 DNS 记录（迁移 DNS 时不要漏）

> Onamae 的数据库/容量信息可在其帮助文档体系中确认（例如 MySQL 提供/容量说明）：  
> [help.onamae.com/answer/9123](https://help.onamae.com/answer/9123?utm_source=openai) 、[help.onamae.com/answer/9128](https://help.onamae.com/answer/9128?utm_source=openai)

---

### 阶段 1：樱花侧创建站点与基础配置

- 开通樱花 Standard，拿到：
  - 初期账号（用于 SSH/SFTP，参考上文）
  - 文档根目录（公开目录）：已确认是 `/home/daisoubus/www/`
- 配置域名（建议先用临时域名/测试子域名，或先用 hosts 指向测试 IP）
- 开启免费 SSL（上线前必做，避免混合内容/SEO 影响）

---

### 阶段 2：迁移静态站（Vite/React）并处理 SPA 路由重写

1. **本地构建**
   - Windows PowerShell：
     - `yarn install`
     - `yarn build --mode production`
2. **上传静态文件到樱花站点根目录**
   - 推荐优先使用 **SFTP/SCP（走 SSH 22）** 上传，目标目录为：`/home/daisoubus/www/`（对应线上 `/`）
   - 说明：因为控制面板文件管理器操作受限（仅公开目录），且 FTP/FTPS 可能存在密码/模式差异；SSH/SFTP 一旦可登录，上传与排障效率更高。
3. **新增 `.htaccess`（SPA 必要）**
   - 在站点根目录添加 `.htaccess`，将未知路径重写到 `index.html`，避免刷新子路由 404。
   - 说明：樱花支持 `.htaccess` 配置（参考：[help.sakura.ad.jp/rs/2214](https://help.sakura.ad.jp/rs/2214/?utm_source=openai)）。

> 注意：如果你们同时有真实文件目录如 `/blog/`、`/api/`，重写规则要排除这些路径（避免把 WP/PHP 请求也重写到前端）。

---

### 阶段 3：迁移 WordPress（保持路径 `/blog/`）

#### 方案 A（优先）：SnapUp 自动迁移（无痛优先）

- 参考樱花 SnapUp 指南：[help.sakura.ad.jp/purpose_beginner/2591](https://help.sakura.ad.jp/purpose_beginner/2591/?utm_source=openai)
- 通常需要填入：
  - 迁移源站 URL（Onamae 上的 `/blog/`）
  - 源站 FTP/SFTP 信息（主机/端口/账号/密码或密钥）
  - 源站 DB 信息（主机/库名/账号/密码）
- 完成后重点验证：
  - 后台可登录
  - 文章、媒体库、固定链接、主题/插件正常
  - REST API：`/blog/wp-json/wp/v2/...` 返回正常

#### 方案 B（兜底）：手动迁移（文件 + DB）

- 参考樱花手动迁移文档：[help.sakura.ad.jp/rs/2799](https://help.sakura.ad.jp/rs/2799/?utm_source=openai)
- 核心步骤：
  1. 在樱花创建 MySQL 数据库
  2. 上传 Onamae 的 WordPress 文件到樱花 `blog/` 目录（包含 `wp-content`）
  3. 导入 Onamae 导出的数据库 SQL
  4. 更新 `blog/wp-config.php` 中数据库连接信息
  5. 如遇 URL 不一致，再处理 `siteurl/home`（若域名与路径保持不变通常不需要）
  6. 后台“固定链接”点一次保存（生成/刷新重写规则）

---

### 阶段 4：迁移 PHP 接口 `/api/send_email.php`

- 将 `api/` 目录与 `send_email.php` 上传到樱花站点根目录下的 `api/`。
- 重点验证点：
  - PHP 正常执行（返回 JSON）
  - 服务器允许出站访问 `https://api.resend.com`
  - PHP cURL 扩展可用（`curl_init/curl_exec` 正常）

**安全提醒（强烈建议在迁移窗口一并处理）**：
- 当前 `send_email.php` 将 Resend API Key 明文写在文件内；建议迁移前后进行 **Key 轮换**，并改为从环境变量/配置文件读取（避免代码泄露导致滥用）。

---

### 阶段 5：DNS 切换与回滚策略

#### 切换前

- 将 DNS TTL 调低（例如 300 秒）以缩短生效时间。
- 在樱花侧完成：
  - 静态站可访问 + 子路由刷新不 404（`.htaccess` 生效）
  - `/blog/` WP 正常
  - `/api/send_email.php` 发信成功
  - SSL 正常

#### 切换

- 将 `daisoubus.jp` 的 A/AAAA 记录指向樱花。
- **注意**：迁移 DNS 时要保留/迁移原有邮件相关 TXT 记录（SPF/DKIM/DMARC、Resend 验证等），否则发信可能失败。

#### 回滚

- 如出现严重问题：将 A/AAAA 回指 Onamae 原 IP（或恢复原 DNS 记录集），网站即可回滚。

---

## 迁移后的确认清单（上线验收 Checklist）

### A. 基础可用性
- [ ] `https://daisoubus.jp/` 首页 200、资源加载正常（无大量 404）
- [ ] SSL 正常（证书有效、无混合内容警告）
- [ ] 性能：首屏资源能在可接受时间内加载（尤其图片）

### B. SPA 路由（重点）
- [ ] 直接访问/刷新以下路径不 404（应回到前端页面正常渲染）：
  - [ ] `/fleet`
  - [ ] `/pricing`
  - [ ] `/process`
  - [ ] `/contact`
  - [ ] `/quote`
- [ ] 浏览器控制台无明显路由相关错误

### C. WordPress（/blog）
- [ ] `https://daisoubus.jp/blog/` 前台正常
- [ ] `https://daisoubus.jp/blog/wp-admin/` 后台可登录
- [ ] 文章列表/单篇打开正常（含日英多语言如有）
- [ ] 媒体库图片可正常打开（无 403/404）
- [ ] 固定链接正常（必要时后台重新“保存固定链接”）
- [ ] REST API 正常：
  - [ ] `GET /blog/wp-json/wp/v2/posts?...` 返回 JSON

### D. 前端 ↔ WP API 联动
- [ ] 前端新闻列表可正常加载
- [ ] 前端新闻详情页可正常打开
- [ ] 多语言筛选（如有）请求返回正常（无 CORS/HTML 误返回）

### E. 邮件接口（/api/send_email.php）
- [ ] 前端 Contact 表单提交成功（前端提示成功）
- [ ] Resend 实际收到邮件（收件箱有到达）
- [ ] reply-to 正常（直接回复能到客户邮箱）
- [ ] 失败路径：Resend 异常时前端/后端能返回可读错误（至少不 500 空白）

### F. 运维与回滚准备
- [ ] 樱花侧备份策略已开启（或至少手动备份一份站点文件+DB）
- [ ] 记录当前 DNS 配置快照（便于回滚）
- [ ] 关键账号/密码/密钥已妥善保管（尤其 Resend Key 已轮换）


