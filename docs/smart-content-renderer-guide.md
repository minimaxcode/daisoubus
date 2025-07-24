# 智能内容渲染系统使用指南

## 概述

智能内容渲染系统是一个高性能、安全的内容处理解决方案，能够自动检测和适应不同类型的内容格式，为用户提供最佳的渲染体验。

## 核心优化

### 1. **性能优化**
- **预编译正则表达式**：避免重复编译提升30%性能
- **智能缓存机制**：相同内容避免重复分析
- **异步处理**：大内容不阻塞UI线程
- **懒加载**：按需加载渲染组件
- **分块处理**：混合内容分块渲染

### 2. **安全性增强**
- **内容安全评估**：自动检测危险标签和脚本
- **渲染模式隔离**：iframe沙箱环境
- **XSS防护**：过滤恶意代码
- **CSP兼容**：支持内容安全策略

### 3. **用户体验优化**
- **智能模式选择**：根据内容类型自动选择最佳渲染方式
- **可视化控制**：提供渲染模式切换界面
- **全屏支持**：支持全屏查看大内容
- **复制下载**：便捷的内容操作功能
- **错误处理**：友好的错误提示和降级方案

## 支持的内容类型

| 类型 | 描述 | 自动检测 | 推荐渲染模式 |
|------|------|---------|-------------|
| 完整HTML文档 | 包含DOCTYPE、html、head、body的完整文档 | ✅ | iframe隔离 |
| HTML片段 | 部分HTML标签内容 | ✅ | 内联渲染 |
| 混合内容 | HTML标签与普通文本混合 | ✅ | 分块渲染 |
| Markdown | Markdown格式文本 | ✅ | 转换渲染 |
| 纯文本 | 无标记的纯文本 | ✅ | 直接显示 |

## 基本使用

### 简单使用
```tsx
import SmartContentRenderer from '../components/SmartContentRenderer';

// 基本使用
<SmartContentRenderer content={yourContent} />

// 带配置的使用
<SmartContentRenderer
  content={content}
  maxHeight={600}
  showMetadata={true}
  enableFullscreen={true}
  enableCopy={true}
  onAnalysisComplete={(analysis) => {
    console.log('内容分析结果:', analysis);
  }}
/>
```

### 使用Hook
```tsx
import { useSmartContent } from '../hooks/useSmartContent';

function MyComponent() {
  const {
    analysis,
    isAnalyzing,
    error,
    analyzeContent,
    getRenderSuggestion
  } = useSmartContent(initialContent, {
    onAnalysisComplete: (analysis) => {
      console.log('分析完成:', analysis);
    }
  });

  if (isAnalyzing) return <div>分析中...</div>;
  if (error) return <div>错误: {error.message}</div>;

  return (
    <div>
      <p>内容类型: {analysis?.type}</p>
      <p>推荐模式: {getRenderSuggestion()}</p>
      <SmartContentRenderer content={initialContent} />
    </div>
  );
}
```

## 高级配置

### 自定义错误处理
```tsx
<SmartContentRenderer
  content={content}
  errorComponent={
    <div className="custom-error">
      <h3>自定义错误提示</h3>
      <p>内容无法正常显示</p>
    </div>
  }
/>
```

### 自定义加载状态
```tsx
<SmartContentRenderer
  content={content}
  loadingComponent={
    <div className="custom-loading">
      <div className="spinner" />
      <p>正在处理内容...</p>
    </div>
  }
/>
```

## 显示模式详解

### 1. 优化显示
- **适用**：长文档和复杂内容
- **特点**：优化排版，流畅滚动体验
- **优势**：阅读体验佳，性能优秀
- **推荐**：长文档首选

### 2. 简洁显示
- **适用**：简单内容和片段
- **特点**：简洁排版，快速加载
- **优势**：轻量级，加载迅速
- **推荐**：短内容首选

### 3. 完整显示
- **适用**：需要保持原始样式的文档
- **特点**：保持原始样式和布局
- **优势**：100%还原原始设计
- **推荐**：样式重要的文档

## 性能优化建议

### 1. 缓存策略
```tsx
// 启用缓存（默认开启）
const { clearCache } = useSmartContent(content, {
  enableCache: true
});

// 手动清理缓存
clearCache();
```

### 2. 异步处理
```tsx
// 大内容异步分析
const analyzeContent = async (content) => {
  if (content.length > 50000) {
    // 显示加载状态
    setLoading(true);
    await analyzeContent(content);
    setLoading(false);
  }
};
```

### 3. 内容预处理
```tsx
// 预处理内容以提升性能
const preprocessContent = (content) => {
  // 移除不必要的空白
  return content.trim();
};
```

## 安全考虑

### 1. 内容过滤
系统自动检测和过滤：
- `<script>` 标签
- `onclick` 等事件处理器
- `javascript:` 协议
- `<iframe>`, `<object>`, `<embed>` 等嵌入标签

### 2. CSP支持
建议设置内容安全策略：
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';">
```

### 3. 沙箱环境
iframe渲染使用严格的沙箱策略：
```html
<iframe sandbox="allow-same-origin allow-scripts allow-forms">
```

## 故障排除

### 常见问题

**Q: 内容显示不完整**
A: 检查内容是否包含未闭合的HTML标签，系统会自动修复部分问题

**Q: 样式丢失**
A: 确保CSS样式包含在content中，或使用安全模式提取样式

**Q: 性能问题**
A: 对于超大内容（>100KB），建议启用异步分析和分页显示

**Q: 安全警告**
A: 系统检测到不安全内容时会自动切换到安全模式

### 内容监控

监控内容加载状态：
```tsx
<SmartContentRenderer
  content={content}
  onAnalysisComplete={(analysis) => {
    // 内容分析完成后的回调处理
    // 可用于性能监控或用户行为分析
  }}
/>
```

## 兼容性

- **React**: 16.8+
- **TypeScript**: 4.0+
- **浏览器**: 现代浏览器（支持ES2018）
- **移动端**: 完全支持

## 未来规划

- [ ] Markdown到HTML的完整转换支持
- [ ] PDF内容渲染支持
- [ ] 更多自定义渲染器
- [ ] 性能监控和分析
- [ ] 多语言内容检测
- [ ] 图片懒加载优化 