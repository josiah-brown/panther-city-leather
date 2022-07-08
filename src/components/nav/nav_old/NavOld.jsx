import React, { useEffect, useState } from "react";
import "./nav.css";
import { AiOutlineShopping } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { IoLogoVk } from "react-icons/io";
import { BiX } from "react-icons/bi";

const Nav = (props) => {
  const [stuck, setStuck] = useState(false);
  const [expand, setExpand] = useState(false);
  const [onDesktop, setOnDesktop] = useState(false);

  function updateNav() {
    const pos = window.scrollY;
    setStuck(pos >= 46 ? true : false);
  }

  function toggleExpand() {
    if (expand) {
      setExpand(false);
    } else {
      setExpand(true);
    }
  }

  useEffect(() => {
    const scrollTop = window.pageYOffset;
    const scrollLeft = window.pageXOffset;
    window.onscroll = () => {
      if (expand) {
        window.scrollTo(scrollLeft, scrollTop);
      }
      updateNav();
    };
  });

  useEffect(() => {
    const screenW = window.screen.width;
    if (screenW >= 960) {
      setOnDesktop(true);
    } else {
      setOnDesktop(false);
    }
  }, [expand]);

  function escapeExpand(e) {
    const width = window.screen.width;
    const x = e.pageX;
    const percent = x / width;
    if (percent >= 0.8) {
      toggleExpand();
    }
  }

  return (
    <nav>
      <div className="nav-announce">
        <p>HANDCRAFTED LEATHER GOODS - MADE TO ORDER</p>
      </div>
      <div
        className={
          "nav-main " +
          (stuck === true ? "nav-stuck " : "nav-unstuck ") +
          (props.color === "nav-white" ? "nav-white" : "")
        }
      >
        <div className="btn-toggle-menu" onClick={toggleExpand}>
          <AiOutlineMenu className="nav-icon" />
        </div>

        <div className="nav-center">
          <a href="/" className="nav-logo">
            <IoLogoVk />
          </a>
          <div
            className="nav-links-mobile"
            onClick={escapeExpand}
            style={
              expand
                ? { width: "80%", opacity: "1.0", visibility: "visible" }
                : { width: "0%", opacity: "0", visibility: "hidden" }
            }
          >
            <BiX className="nav-icon" onClick={toggleExpand} />
            <ul>
              <li>
                <a href="/">HOME</a>
              </li>
              <div className="spacer-line"></div>
              <li>
                <a href="/products">PRODUCTS</a>
              </li>
              <div className="spacer-line"></div>
              <li>
                <a href="/about">ABOUT</a>
              </li>
            </ul>
          </div>
          <div className="nav-links-large">
            <ul>
              <li>
                <a href="/" className="hover-underline">
                  HOME
                </a>
              </li>
              <li>
                <a href="/products" className="hover-underline">
                  PRODUCTS
                </a>
              </li>
              <li>
                <a href="/about" className="hover-underline">
                  ABOUT
                </a>
              </li>
            </ul>
          </div>
        </div>

        <a href="/cart" className="btn-cart hover-underline">
          {onDesktop ? "Cart (1)" : <AiOutlineShopping className="nav-icon" />}
        </a>
      </div>
    </nav>
  );
};

export default Nav;
