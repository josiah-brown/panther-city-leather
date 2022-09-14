import React from "react";
import Nav from "../../components/nav/Nav";
import { Link } from "react-router-dom";
import "./future-social.css";

const FutureSocial = () => {
  return (
    <React.Fragment>
      <Nav />
      <div className="future_social_wrapper">
        <h2>Oops...</h2>
        <h4>
          This social media account has not been created yet. Check back soon!
        </h4>
        <Link type="button" to="/">
          <span>RETURN HOME</span>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default FutureSocial;
