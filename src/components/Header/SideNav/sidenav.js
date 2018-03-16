import React from 'react';
import SimpleSideNav from 'react-simple-sidenav';

const SideNav = (props) => {
  return (
    <div>
      <SimpleSideNav 
        showNav={props.showNav}
        onHideNav={props.onHideNav}
        navStyle={{
          background: '#242424',
          maxWidth: '220px',
        }}

      >
        OPTIONS
      </SimpleSideNav>
    </div>
  );
};

export default SideNav;