import React from "react";
import Nav from "../../components/nav/Nav";
import { Link } from "react-router-dom";
import "./error-404.css";

const Error404 = () => {
  return (
    <React.Fragment>
      <Nav />
      <div className="error_404_wrapper">
        <h2>Uh-oh</h2>
        <h4>This page does not exist. Click below to return home.</h4>
        <Link type="button" to="/">
          <span>RETURN HOME</span>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Error404;
