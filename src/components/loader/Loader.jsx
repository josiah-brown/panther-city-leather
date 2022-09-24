import React from "react";
import "./loader.css";

const Loader = (props) => {
  let currMessage = props.m ? props.m : null;

  return (
    <div className="loader-container">
      <div className="loader"></div>
      <div className="loader_message">{currMessage}</div>
    </div>
  );
};

export default Loader;
