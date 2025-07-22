import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 这个组件用于在每次路由切换后，自动将页面滚动到顶部。
 */
function ScrollToTop() {
  // 使用 useLocation hook 来获取当前的位置信息对象
  const { pathname } = useLocation();

  // 使用 useEffect hook 来执行副作用操作
  useEffect(() => {
    // 当 pathname 发生变化时，执行此函数
    window.scrollTo(0, 0);
  }, [pathname]); // 将 pathname 作为依赖项，只有它变化时才触发 effect

  // 这个组件本身不渲染任何可见的 UI 元素
  return null;
}

export default ScrollToTop;