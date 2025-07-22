import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 定义一个全局的gtag函数类型，以避免TypeScript报错
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: { [key: string]: any }
    ) => void;
  }
}

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // 确认window.gtag存在
    if (window.gtag) {
      // 每当路由（location.pathname）发生变化时，就执行这里的代码
      window.gtag('config', 'G-ZQNTN4ZDNV', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]); // 依赖项是location，所以它只在URL变化时运行

  return null; // 这个组件不渲染任何可见内容
};

export default AnalyticsTracker;