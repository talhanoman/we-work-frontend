import SideNavbar from '@/components/side-navbar';
import React from 'react';
import HeadcountPageWithHeaderSection from '@/components/headcount/headcount-page-with-header-section';

function TabsLayout({ tab }) {
  return (
    <div className='flex overflow-hidden max-h-screen'>
      <SideNavbar headcount={true} />
      <div className='flex-1 bg-primary-800 overflow-x-auto overflow-hidden'>
        <HeadcountPageWithHeaderSection tab={tab} />
      </div>
    </div>
  );
}

export default TabsLayout;
