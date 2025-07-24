export enum ContentType {
  FULL_HTML_DOCUMENT = 'full_html_document',
  HTML_FRAGMENT = 'html_fragment', 
  MIXED_CONTENT = 'mixed_content',
  PLAIN_TEXT = 'plain_text',
  MARKDOWN = 'markdown'
}

export interface ContentBlock {
  type: 'html' | 'text' | 'markdown';
  content: string;
  startIndex: number;
  endIndex: number;
  metadata?: {
    hasStyles?: boolean;
    hasScripts?: boolean;
    isSafeHTML?: boolean;
    lineCount?: number;
  };
}

export interface ContentAnalysis {
  type: ContentType;
  blocks: ContentBlock[];
  extractedStyles?: string;
  extractedBodyContent?: string;
  isSafe: boolean;
  stats: {
    totalLength: number;
    htmlTagCount: number;
    textLength: number;
    blockCount: number;
  };
}

export class SmartContentDetector {
  // 预编译正则表达式以提升性能
  private static readonly HTML_PATTERNS = {
    DOCTYPE: /^\s*<!DOCTYPE\s+html/i,
    HTML_TAGS: /<html[\s>]/i,
    HTML_CLOSE: /<\/html>/i,
    HEAD_TAGS: /<head[\s>]/i,
    HEAD_CLOSE: /<\/head>/i,
    BODY_TAGS: /<body[\s>]/i,
    BODY_CLOSE: /<\/body>/i,
    STYLE_TAGS: /<style[^>]*>([\s\S]*?)<\/style>/gi,
    SCRIPT_TAGS: /<script[^>]*>[\s\S]*?<\/script>/gi,
    HTML_TAG: /<\/?[a-z][\s\S]*?>/gi,
    UNSAFE_TAGS: /<(script|iframe|object|embed|form|input|link|meta)[^>]*>/gi,
    BODY_CONTENT: /<body[^>]*>([\s\S]*?)<\/body>/i
  };

  // 缓存分析结果
  private static cache = new Map<string, ContentAnalysis>();
  private static readonly CACHE_MAX_SIZE = 50;

  /**
   * 主要分析方法 - 返回完整的内容分析
   */
  static analyzeContent(content: string): ContentAnalysis {
    // 生成缓存键
    const cacheKey = this.generateCacheKey(content);
    
    // 检查缓存
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // 执行分析
    const analysis = this.performAnalysis(content.trim());
    
    // 缓存结果
    this.cacheResult(cacheKey, analysis);
    
    return analysis;
  }

  /**
   * 执行内容分析
   */
  private static performAnalysis(content: string): ContentAnalysis {
    const type = this.detectContentType(content);
    const blocks = this.extractContentBlocks(content, type);
    const isSafe = this.assessSafety(content);
    
    let extractedStyles: string | undefined;
    let extractedBodyContent: string | undefined;

    if (type === ContentType.FULL_HTML_DOCUMENT) {
      extractedStyles = this.extractStyles(content);
      extractedBodyContent = this.extractBodyContent(content);
    }

    return {
      type,
      blocks,
      extractedStyles,
      extractedBodyContent,
      isSafe,
      stats: this.generateStats(content, blocks)
    };
  }

  /**
   * 优化的内容类型检测
   */
  private static detectContentType(content: string): ContentType {
    // 快速长度检查
    if (content.length === 0) return ContentType.PLAIN_TEXT;
    if (content.length > 50000) { // 超大内容可能是完整文档
      if (this.isFullHTMLDocument(content)) {
        return ContentType.FULL_HTML_DOCUMENT;
      }
    }

    // 按复杂度递增检测
    if (this.isFullHTMLDocument(content)) {
      return ContentType.FULL_HTML_DOCUMENT;
    }
    
    if (this.isMarkdown(content)) {
      return ContentType.MARKDOWN;
    }
    
    if (this.isMixedContent(content)) {
      return ContentType.MIXED_CONTENT;
    }
    
    if (this.isHTMLFragment(content)) {
      return ContentType.HTML_FRAGMENT;
    }
    
    return ContentType.PLAIN_TEXT;
  }

  /**
   * 检测完整HTML文档 - 优化性能
   */
  private static isFullHTMLDocument(content: string): boolean {
    // 快速检查：必须包含DOCTYPE或HTML标签
    const hasDoctype = this.HTML_PATTERNS.DOCTYPE.test(content);
    if (hasDoctype) return true;

    // 检查HTML标签结构
    const hasHtmlTags = this.HTML_PATTERNS.HTML_TAGS.test(content) && 
                       this.HTML_PATTERNS.HTML_CLOSE.test(content);
    
    if (!hasHtmlTags) return false;

    // 进一步验证完整性
    const hasHead = this.HTML_PATTERNS.HEAD_TAGS.test(content) && 
                   this.HTML_PATTERNS.HEAD_CLOSE.test(content);
    const hasBody = this.HTML_PATTERNS.BODY_TAGS.test(content) && 
                   this.HTML_PATTERNS.BODY_CLOSE.test(content);
    
    return hasHead && hasBody;
  }

  /**
   * 检测Markdown内容
   */
  private static isMarkdown(content: string): boolean {
    const markdownPatterns = [
      /^#{1,6}\s+/m,        // 标题
      /^\*\*.*\*\*$/m,      // 粗体
      /^\*.*\*$/m,          // 斜体
      /^\- |\* |\+ /m,      // 列表
      /^\d+\. /m,           // 数字列表
      /\[.*\]\(.*\)/,       // 链接
      /```[\s\S]*?```/,     // 代码块
      /`.*`/                // 内联代码
    ];
    
    return markdownPatterns.some(pattern => pattern.test(content));
  }

  /**
   * 检测HTML片段
   */
  private static isHTMLFragment(content: string): boolean {
    return this.HTML_PATTERNS.HTML_TAG.test(content);
  }

  /**
   * 检测混合内容 - 优化性能
   */
  private static isMixedContent(content: string): boolean {
    const htmlMatches = content.match(this.HTML_PATTERNS.HTML_TAG);
    if (!htmlMatches || htmlMatches.length === 0) return false;

    // 计算HTML标签覆盖的字符数
    const htmlLength = htmlMatches.reduce((sum, match) => sum + match.length, 0);
    const textLength = content.length - htmlLength;
    
    // 如果文本内容占比超过30%，认为是混合内容
    return textLength / content.length > 0.3;
  }

  /**
   * 优化的内容块提取
   */
  private static extractContentBlocks(content: string, type: ContentType): ContentBlock[] {
    switch (type) {
      case ContentType.FULL_HTML_DOCUMENT:
        return [{
          type: 'html',
          content,
          startIndex: 0,
          endIndex: content.length,
          metadata: {
            hasStyles: this.HTML_PATTERNS.STYLE_TAGS.test(content),
            hasScripts: this.HTML_PATTERNS.SCRIPT_TAGS.test(content),
            isSafeHTML: this.assessSafety(content)
          }
        }];

      case ContentType.MIXED_CONTENT:
        return this.extractMixedBlocks(content);

      case ContentType.HTML_FRAGMENT:
        return [{
          type: 'html',
          content,
          startIndex: 0,
          endIndex: content.length,
          metadata: {
            isSafeHTML: this.assessSafety(content)
          }
        }];

      default:
        return [{
          type: 'text',
          content,
          startIndex: 0,
          endIndex: content.length,
          metadata: {
            lineCount: content.split('\n').length
          }
        }];
    }
  }

  /**
   * 优化的混合内容块提取
   */
  private static extractMixedBlocks(content: string): ContentBlock[] {
    const blocks: ContentBlock[] = [];
    let lastIndex = 0;
    
    // 匹配HTML标签
    const htmlTagRegex = /<[^>]+>[\s\S]*?<\/[^>]+>|<[^>]+\/>/g;
    let match;

    while ((match = htmlTagRegex.exec(content)) !== null) {
      // 添加HTML标签前的文本
      if (match.index > lastIndex) {
        const textContent = content.slice(lastIndex, match.index).trim();
        if (textContent) {
          blocks.push({
            type: 'text',
            content: textContent,
            startIndex: lastIndex,
            endIndex: match.index,
            metadata: { lineCount: textContent.split('\n').length }
          });
        }
      }

      // 添加HTML块
      blocks.push({
        type: 'html',
        content: match[0],
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        metadata: { isSafeHTML: this.assessSafety(match[0]) }
      });

      lastIndex = match.index + match[0].length;
    }

    // 添加最后剩余的文本
    if (lastIndex < content.length) {
      const textContent = content.slice(lastIndex).trim();
      if (textContent) {
        blocks.push({
          type: 'text',
          content: textContent,
          startIndex: lastIndex,
          endIndex: content.length,
          metadata: { lineCount: textContent.split('\n').length }
        });
      }
    }

    return blocks;
  }

  /**
   * 安全性评估
   */
  private static assessSafety(content: string): boolean {
    // 检查危险标签
    const hasUnsafeTags = this.HTML_PATTERNS.UNSAFE_TAGS.test(content);
    
    // 检查JavaScript代码
    const hasInlineJS = /on\w+\s*=/i.test(content) || /javascript:/i.test(content);
    
    return !hasUnsafeTags && !hasInlineJS;
  }

  /**
   * 提取样式 - 增强版：支持外部CSS和内联样式
   */
  private static extractStyles(content: string): string {
    let styles = '';
    
    // 1. 提取内联<style>标签内容
    const styleMatches = content.match(this.HTML_PATTERNS.STYLE_TAGS);
    if (styleMatches) {
      const inlineStyles = styleMatches
        .map(match => match.replace(/<\/?style[^>]*>/gi, ''))
        .join('\n');
      styles += inlineStyles;
    }
    
    // 2. 提取外部CSS链接并转换为@import
    const linkMatches = content.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi);
    if (linkMatches) {
      const cssImports = linkMatches
        .map(link => {
          const hrefMatch = link.match(/href=["']([^"']+)["']/);
          if (hrefMatch && hrefMatch[1]) {
            return `@import url('${hrefMatch[1]}');`;
          }
          return '';
        })
        .filter(Boolean)
        .join('\n');
      
      if (cssImports) {
        styles = cssImports + '\n' + styles;
      }
    }
    
    return styles.trim();
  }

  /**
   * 提取body内容 - 优化性能
   */
  private static extractBodyContent(content: string): string {
    const bodyMatch = content.match(this.HTML_PATTERNS.BODY_CONTENT);
    if (bodyMatch) {
      return bodyMatch[1].trim();
    }
    
    // 清理文档级标签
    return content
      .replace(/<!DOCTYPE[\s\S]*?>/gi, '')
      .replace(/<html[^>]*>|<\/html>/gi, '')
      .replace(/<head[\s\S]*?<\/head>/gi, '')
      .replace(/<body[^>]*>|<\/body>/gi, '')
      .trim();
  }

  /**
   * 生成统计信息
   */
  private static generateStats(content: string, blocks: ContentBlock[]) {
    const htmlTags = content.match(this.HTML_PATTERNS.HTML_TAG) || [];
    const textContent = content.replace(this.HTML_PATTERNS.HTML_TAG, '');
    
    return {
      totalLength: content.length,
      htmlTagCount: htmlTags.length,
      textLength: textContent.length,
      blockCount: blocks.length
    };
  }

  /**
   * 缓存管理
   */
  private static generateCacheKey(content: string): string {
    // 使用内容长度和前100字符生成简单哈希
    const prefix = content.slice(0, 100);
    return `${content.length}_${btoa(prefix).slice(0, 20)}`;
  }

  private static cacheResult(key: string, analysis: ContentAnalysis): void {
    // 限制缓存大小
    if (this.cache.size >= this.CACHE_MAX_SIZE) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, analysis);
  }

  /**
   * 清理缓存
   */
  static clearCache(): void {
    this.cache.clear();
  }
} 