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
        <a href="https://www.google.com" target="_blank" rel="noreferrer">
          <AiOutlineInstagram />
        </a>
        <a href="https://www.google.com" target="_blank" rel="noreferrer">
          <AiFillFacebook />
        </a>
        <a href="https://www.google.com" target="_blank" rel="noreferrer">
          <AiOutlineYoutube />
        </a>
      </div>
      <h2 id="footer-text" className="h-sub">
        © {year} PANTHER CITY LEATHER
      </h2>
    </footer>
  );
};

export default Footer;
