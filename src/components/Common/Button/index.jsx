import React from "react";
import "./styles.css";
const index = ({ type, theme, children }) => {
  return (
    <button type={type} className={`btn-${theme}`}>
      {children}
    </button>
  );
};

export default index;
