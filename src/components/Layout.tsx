import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingContactButton from './FloatingContactButton';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-daisou-bg font-noto-jp">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingContactButton />
    </div>
  );
};

export default Layout;
