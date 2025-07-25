import React, { useState, useMemo, Suspense, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { SmartContentDetector, ContentAnalysis, ContentType } from '../lib/smartContentRenderer';

interface SmartContentRendererProps {
  content: string;
  className?: string;
  maxHeight?: number;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  onAnalysisComplete?: (analysis: ContentAnalysis) => void;
}



const SmartContentRenderer: React.FC<SmartContentRendererProps> = ({
  content,
  className = '',
  maxHeight = 600,
  loadingComponent,
  errorComponent,
  onAnalysisComplete
}) => {
  // 状态管理 - 简化版
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // 使用 useMemo 优化内容分析性能
  const analysis = useMemo(() => {
    if (!content) return null;
    
    try {
      setIsLoading(true);
      const result = SmartContentDetector.analyzeContent(content);
      setIsLoading(false);
      onAnalysisComplete?.(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Content analysis failed'));
      setIsLoading(false);
      return null;
    }
  }, [content, onAnalysisComplete]);



  // 渲染加载状态
  if (isLoading) {
    return (
      <div className="smart-content-loading flex items-center justify-center p-8">
        {loadingComponent || (
          <div className="flex items-center space-x-2 text-gray-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>分析内容中...</span>
          </div>
        )}
      </div>
    );
  }

  // 渲染错误状态
  if (error || !analysis) {
    return (
      <div className="smart-content-error">
        {errorComponent || (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-red-600 mb-2">
              <span className="text-red-500 text-xl">⚠️</span>
              <span className="font-medium">内容渲染失败</span>
            </div>
            <p className="text-red-700 text-sm">
              {error?.message || '无法分析内容格式'}
            </p>

          </div>
        )}
      </div>
    );
  }

    // 渲染组件 - 极简版本
  return (
    <div className={`smart-content-renderer ${className}`}>
      {/* 主要内容区域 - 直接显示 */}
      <div className="content-area">
        <Suspense fallback={<ContentLoadingFallback />}>
          <MixedContentRenderer 
            analysis={analysis}
            styles={analysis.extractedStyles || ''} 
            className={className}
          />
        </Suspense>
      </div>
    </div>
  );
};




// 混合内容渲染器 - 支持文本块和HTML块的组合渲染，增强样式处理
const MixedContentRenderer: React.FC<{ 
  analysis: ContentAnalysis; 
  styles?: string; 
  className?: string; 
}> = ({ analysis, styles, className }) => {
  
  // 解析并处理样式，分离@import和普通CSS
  const processStyles = (rawStyles: string) => {
    if (!rawStyles) return { imports: [], styles: '' };
    
    const imports: string[] = [];
    let processedStyles = rawStyles;
    
    // 提取@import语句
    const importMatches = rawStyles.match(/@import\s+url\([^)]+\);/g);
    if (importMatches) {
      imports.push(...importMatches.map(imp => imp.match(/url\(['"]*([^'")]+)['"]*\)/)?.[1]).filter(Boolean) as string[]);
      processedStyles = rawStyles.replace(/@import\s+url\([^)]+\);/g, '').trim();
    }
    
    return { imports, styles: processedStyles };
  };
  
  // 处理内容中的Unicode转义字符和清理函数
  const processContent = (content: string, isHTML: boolean = false) => {
    // 1. 处理Unicode转义字符
    let processed = content;
    try {
      // 处理不同格式的Unicode转义
      // 格式1: \\u65e5 (双反斜杠)
      processed = processed.replace(/\\\\u([\da-fA-F]{4})/g, (match, grp) => {
        return String.fromCharCode(parseInt(grp, 16));
      });
      
      // 格式2: \u65e5 (单反斜杠)  
      processed = processed.replace(/\\u([\da-fA-F]{4})/g, (match, grp) => {
        return String.fromCharCode(parseInt(grp, 16));
      });
      
      // 尝试JSON.parse解码（如果内容看起来像JSON字符串）
      if (processed.includes('\\u') && !processed.includes('<')) {
        try {
          processed = JSON.parse('"' + processed + '"');
        } catch (jsonError) {
          // 静默处理解码失败
        }
      }
    } catch (error) {
      console.warn('Unicode decoding failed:', error);
    }

    // 2. 如果是纯文本，确保清理任何意外的HTML标签
    if (!isHTML) {
      // 移除可能意外添加的HTML标签，但保留换行
      processed = processed
        .replace(/<br\s*\/?>/gi, '\n')  // 将br标签转换为换行
        .replace(/<[^>]+>/g, '')        // 移除其他HTML标签
        .trim();
    }

    return processed;
  };
  
  const { imports, styles: processedStyles } = processStyles(styles || '');
  
  // 根据内容类型选择渲染策略
  const renderContent = () => {
    if (analysis.type === ContentType.FULL_HTML_DOCUMENT) {
      // 完整HTML文档：优先使用iframe渲染以保持完整样式
      const hasExternalStyles = imports.length > 0 || processedStyles.length > 500;
      
      if (hasExternalStyles) {
        // 包含外部样式或复杂样式时，使用iframe保持完整性
        const processedContent = processContent(analysis.blocks[0]?.content || '', true);
        return (
          <FullDocumentIframeRenderer 
            content={processedContent} 
            className={className}
          />
        );
      } else if (analysis.extractedBodyContent) {
        // 简单样式时，使用提取的body内容
        const processedBodyContent = processContent(analysis.extractedBodyContent, true);
        return (
          <div className="full-document-wrapper">
            <div 
              className={`content-wrapper ${className || ''}`}
              dangerouslySetInnerHTML={{ __html: processedBodyContent }}
            />
          </div>
        );
      }
    }
    
    if (analysis.type === ContentType.MIXED_CONTENT && analysis.blocks.length > 1) {
      // 混合内容：逐块渲染
      return (
        <div className={`content-wrapper prose prose-lg max-w-none p-8 ${className || ''}`}>
          {analysis.blocks.map((block, index) => {
            const processedContent = processContent(block.content, block.type === 'html');
            return (
              <div key={index} className="content-block">
                {block.type === 'html' ? (
                  <div dangerouslySetInnerHTML={{ __html: processedContent }} />
                ) : (
                  <div className="text-block whitespace-pre-line leading-relaxed">
                    {processedContent}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }
    
    // 其他情况：使用第一个块的内容
    const content = analysis.blocks[0]?.content || '';
    const isHTML = analysis.blocks[0]?.type === 'html' || analysis.type === ContentType.HTML_FRAGMENT;
    const processedContent = processContent(content, isHTML);
    
    if (isHTML) {
      return (
        <div 
          className={`content-wrapper prose prose-lg max-w-none p-8 ${className || ''}`}
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />
      );
    } else {
      // 纯文本渲染
      return (
        <div className={`content-wrapper prose prose-lg max-w-none p-8 ${className || ''}`}>
          <div className="text-block whitespace-pre-line leading-relaxed">
            {processedContent}
          </div>
        </div>
      );
    }
  };

  // 对完整HTML文档，使用最小化的容器样式
  const containerClasses = analysis.type === ContentType.FULL_HTML_DOCUMENT 
    ? "html-document-container" 
    : "mixed-content-container bg-white rounded-lg shadow-xl overflow-hidden";

  return (
    <div className={containerClasses}>
      {/* 内联样式处理 */}
      <style dangerouslySetInnerHTML={{ 
        __html: `
          ${processedStyles || ''}
          
          /* 完整文档容器 - 最小化干扰 */
          .html-document-container {
            width: 100%;
            min-height: 100%;
            background: transparent;
          }
          
          .html-document-container .full-document-wrapper {
            width: 100%;
            min-height: 100%;
          }
          
          /* 基础样式覆盖 - 只在非完整文档时应用 */
          ${analysis.type !== ContentType.FULL_HTML_DOCUMENT ? `
            .content-wrapper {
              line-height: 1.8;
              font-family: 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif;
            }
            .content-wrapper img {
              max-width: 100%;
              height: auto;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            .content-wrapper table {
              width: 100%;
              border-collapse: collapse;
              margin: 1rem 0;
            }
            .content-wrapper th,
            .content-wrapper td {
              border: 1px solid #e5e7eb;
              padding: 0.75rem;
              text-align: left;
            }
            .content-wrapper th {
              background-color: #f9fafb;
              font-weight: bold;
            }
            /* 强制内联元素保持内联显示，防止意外换行 */
            .content-wrapper strong,
            .content-wrapper em,
            .content-wrapper b,
            .content-wrapper i,
            .content-wrapper a,
            .content-wrapper span,
            .content-wrapper code {
              display: inline !important;
            }
            /* 修复可能的prose类样式冲突 */
            .content-wrapper p strong {
              display: inline !important;
            }
          ` : ''}
          
          .content-block {
            margin-bottom: 1rem;
          }
          .text-block {
            color: #374151;
            margin: 1rem 0;
          }
          .text-block:first-child {
            margin-top: 0;
          }
          .text-block:last-child {
            margin-bottom: 0;
          }
        `
      }} />
      
      {renderContent()}
    </div>
  );
};

// 完整文档iframe渲染器 - 专用于处理外部样式资源的HTML文档
const FullDocumentIframeRenderer: React.FC<{ content: string; className?: string }> = ({ content, className }) => {
  const [iframeHeight, setIframeHeight] = useState(800);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          // 移除iframe内部的滚动条
          const style = iframeDoc.createElement('style');
          style.textContent = `
            html, body {
              margin: 0 !important;
              padding: 0 !important;
              overflow: hidden !important;
              height: auto !important;
            }
          `;
          iframeDoc.head.appendChild(style);

          // 等待外部资源加载
          setTimeout(() => {
            const contentHeight = Math.max(
              iframeDoc.documentElement.scrollHeight,
              iframeDoc.body.scrollHeight,
              iframeDoc.documentElement.offsetHeight,
              iframeDoc.body.offsetHeight,
              600 // 最小高度
            );
            
            setIframeHeight(contentHeight + 20); // 添加少量边距
            setIsLoading(false);
          }, 1000); // 增加等待时间确保外部CSS加载完成
        }
      } catch (error) {
        // 跨域问题时使用估算高度
        const estimatedHeight = Math.max(content.length * 0.3, 800);
        setIframeHeight(estimatedHeight);
        setIsLoading(false);
      }
    };

    iframe.addEventListener('load', handleLoad);
    return () => iframe.removeEventListener('load', handleLoad);
  }, [content]);

  return (
    <div className="full-document-iframe-container relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10 rounded-lg">
          <div className="flex items-center space-x-2 text-gray-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>加载完整文档中...</span>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        srcDoc={content}
        className={`w-full border-0 rounded-lg transition-all duration-300 ${className || ''}`}
        style={{ 
          height: iframeHeight,
          minHeight: '600px',
          opacity: isLoading ? 0 : 1,
          overflow: 'hidden'
        }}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
        title="Complete HTML Document"
        scrolling="no"
        onError={() => {
          setIsLoading(false);
        }}
      />
    </div>
  );
};

// 加载占位符
const ContentLoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
  </div>
);

export default SmartContentRenderer; 