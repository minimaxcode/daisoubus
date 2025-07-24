import { useState, useEffect, useCallback } from 'react';
import { SmartContentDetector, ContentAnalysis, ContentType } from '../lib/smartContentRenderer';

interface UseSmartContentOptions {
  enableCache?: boolean;
  autoAnalyze?: boolean;
  onAnalysisComplete?: (analysis: ContentAnalysis) => void;
  onError?: (error: Error) => void;
}

interface UseSmartContentReturn {
  analysis: ContentAnalysis | null;
  isAnalyzing: boolean;
  error: Error | null;
  analyzeContent: (content: string) => Promise<void>;
  clearCache: () => void;
  getRenderSuggestion: () => 'iframe' | 'inline' | 'safe';
}

export const useSmartContent = (
  initialContent?: string,
  options: UseSmartContentOptions = {}
): UseSmartContentReturn => {
  const {
    enableCache = true,
    autoAnalyze = true,
    onAnalysisComplete,
    onError
  } = options;

  const [analysis, setAnalysis] = useState<ContentAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 分析内容
  const analyzeContent = useCallback(async (content: string) => {
    if (!content.trim()) {
      setAnalysis(null);
      setError(null);
      return;
    }

    try {
      setIsAnalyzing(true);
      setError(null);

      // 异步分析以避免阻塞UI
      const result = await new Promise<ContentAnalysis>((resolve, reject) => {
        setTimeout(() => {
          try {
            const analysisResult = SmartContentDetector.analyzeContent(content);
            resolve(analysisResult);
          } catch (err) {
            reject(err);
          }
        }, 0);
      });

      setAnalysis(result);
      onAnalysisComplete?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Content analysis failed');
      setError(error);
      onError?.(error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [onAnalysisComplete, onError]);

  // 获取渲染建议
  const getRenderSuggestion = useCallback((): 'iframe' | 'inline' | 'safe' => {
    if (!analysis) return 'safe';

    // 根据内容类型和安全性给出建议
    switch (analysis.type) {
      case ContentType.FULL_HTML_DOCUMENT:
        return analysis.isSafe ? 'iframe' : 'safe';
      
      case ContentType.HTML_FRAGMENT:
        return analysis.isSafe ? 'inline' : 'safe';
      
      case ContentType.MIXED_CONTENT:
        return analysis.isSafe ? 'inline' : 'safe';
      
      default:
        return 'inline';
    }
  }, [analysis]);

  // 清理缓存
  const clearCache = useCallback(() => {
    if (enableCache) {
      SmartContentDetector.clearCache();
    }
  }, [enableCache]);

  // 自动分析初始内容
  useEffect(() => {
    if (initialContent && autoAnalyze) {
      analyzeContent(initialContent);
    }
  }, [initialContent, autoAnalyze, analyzeContent]);

  return {
    analysis,
    isAnalyzing,
    error,
    analyzeContent,
    clearCache,
    getRenderSuggestion
  };
}; 