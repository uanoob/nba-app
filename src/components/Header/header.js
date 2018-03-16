import React from "react";
import { Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";

import style from "./header.css";
import SideNav from './SideNav/sidenav';

const Header = (props) => {
  const navbar = () => (
    <div className={style.bar}>
      <FontAwesome
        name="bars"
        onClick={props.onOpenNav}
        style={{
          color: "#dfdfdf",
          padding: "10px",
          cursor: "pointer"
        }}
      />
    </div>
  );

  const logo = () => (
    <Link to="/" className={style.logo}>
      <img src="/images/nba_logo.png" alt="logo nba" />
    </Link>
  );

  return (
    <header className={style.header}>
      <SideNav {...props}></SideNav>
      <div className={style.headerOpt}>
        {navbar()}
        {logo()}
      </div>
    </header>
  );
};

export default Header;
