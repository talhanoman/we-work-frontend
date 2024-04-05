import SideNavbar from "@/components/side-navbar";
import React from "react";
import TalentPageWithHeaderSection from "@/components/talent/talent-page-with-header-section";

function TabsLayout({ tab }) {
  return (
    <div className="flex overflow-hidden">
      <SideNavbar talent={true} />
      <div className="flex-grow bg-primary-800 overflow-x-auto">
        <TalentPageWithHeaderSection tab={tab} />
      </div>
    </div>
  );
}

export default TabsLayout;
