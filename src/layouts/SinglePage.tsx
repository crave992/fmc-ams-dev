
import React, { ReactNode } from 'react';
import Footer from './templates/main/Footer';
 type LayoutProps = {
  children: ReactNode;
};
 const SinglePageLayout = ({ children }: LayoutProps) => {
  return (
    <div className="singlePageLayout background-1">
      <main>
        <div className="card">
          {children}
        </div>
      </main>
      <Footer/>
    </div>
  );
};
 export default SinglePageLayout;