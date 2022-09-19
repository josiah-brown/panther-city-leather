import React from "react";
import "./footer.css";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineYoutube } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="social-icons">
        {/* <a href="/social/empty" target="_blank" rel="noreferrer"> */}
        <a href="/social/empty">
          <AiOutlineInstagram />
        </a>
        <a href="/social/empty">
          <AiFillFacebook />
        </a>
        <a href="/social/empty">
          <AiOutlineYoutube />
        </a>
      </div>
      <h2 id="footer-text" className="h-sub">
        © {year} PANTHER CITY LEATHER
      </h2>
      <h4>
        Made by{" "}
        <a href="https://www.josiahbrown.com" target="_blank" rel="noreferrer">
          Josiah Brown
        </a>
      </h4>
    </footer>
  );
};

export default Footer;
