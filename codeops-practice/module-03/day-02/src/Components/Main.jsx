import React from "react";
import PropTypes from "prop-types";
import "../style/globale.css";

const Main = ({ children }) => {
  return <div className="Main">{children}</div>;
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
