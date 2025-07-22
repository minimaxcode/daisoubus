import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';

// ===================== 修改点 1：导入组件 =====================
import ScrollToTop from './components/ScrollToTop'; 
import AnalyticsTracker from './components/AnalyticsTracker'; // 导入GA追踪组件
// =======================================================================

import Layout from './components/Layout';
import Home from './pages/Home';
import News from './pages/News';
import Fleet from './pages/Fleet';
import Contact from './pages/Contact';
import Company from './pages/Company';
import Safety from './pages/Safety';
import FAQ from './pages/FAQ';
import Pricing from './pages/Pricing';
import Usage from './pages/Usage';
import Careers from './pages/Careers';
import Corporate from './pages/Corporate';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Quote from './pages/Quote'; 
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        {/* ===================== 修改点 2：在这里使用组件 ===================== */}
        <ScrollToTop />
        <AnalyticsTracker /> {/* 添加GA追踪组件，它会自动监听路由变化 */}
        {/* =========================================================================== */}
        
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="news" element={<News />} />
            <Route path="fleet" element={<Fleet />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="usage" element={<Usage />} />
            <Route path="company" element={<Company />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="careers" element={<Careers />} />
            <Route path="corporate" element={<Corporate />} />
            <Route path="contact" element={<Contact />} />
            <Route path="quote" element={<Quote />} />
            <Route path="safety" element={<Safety />} />
            <Route path="terms" element={<Terms />} />
            <Route path="privacy" element={<Privacy />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;