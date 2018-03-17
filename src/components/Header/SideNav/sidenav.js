import React from "react";
import SimpleSideNav from "react-simple-sidenav";
import SideNavItems from "./sideNavItems";

const SideNav = props => {
  return (
    <div>
      <SimpleSideNav
        showNav={props.showNav}
        onHideNav={props.onHideNav}
        navStyle={{
          background: "#242424",
          maxWidth: "220px"
        }}
      >
        <SideNavItems />
      </SimpleSideNav>
    </div>
  );
};

export default SideNav;
