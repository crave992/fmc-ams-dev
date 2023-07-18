import React, { ReactNode } from 'react';
import Header from './templates/main/Header';
import Footer from './templates/main/Footer';
 type LayoutProps = {
  children: ReactNode;
};
 const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header/>
      <main>
        {children}
      </main>
      <Footer/>
    </div>
  );
};
 export default MainLayout;