import React, { ReactNode } from 'react';
import Header from './templates/Header';
import Sidebar from './templates/Sidebar';
import Footer from './templates/Footer';
 type LayoutProps = {
  children: ReactNode;
};
 const SinglePageLayout = ({ children }: LayoutProps) => {
  return (
    
    <div className="adminLayout">
      <Header/>
      <Sidebar/>
      <main>
        <div className="content">
          {children}
        </div>
      </main>
      <Footer/>
    </div>
  );
};
 export default SinglePageLayout;