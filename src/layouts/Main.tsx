import React, { ReactNode } from 'react';
import Header from './templates/main/Header';
import Footer from './templates/main/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="mainLayout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;