import Main from "./Main";
import SideBar from "./SideBar";
import React from "react";
import "../style/globale.css";

const Menu = () => {
  return (
    <div className="Menu">
      <SideBar/>
      <Main />
    </div>
  );
};

export default Menu;
