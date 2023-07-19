import React, { ReactNode } from 'react';
import Footer from './templates/main/Footer';
 type LayoutProps = {
  children: ReactNode;
};
 const SinglePageLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <main>
        <div className="container">
          {children}
        </div>
      </main>
      <Footer/>
    </div>
  );
};
 export default SinglePageLayout;