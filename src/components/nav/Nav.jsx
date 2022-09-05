import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { BiX } from "react-icons/bi";
import PANTHER from "../../assets/panther.svg";
import "./nav.css";
import NavCartIcon from "./nav_cart_icon/NavCartIcon";

const Nav = () => {
  const [linksVisible, setLinksVisible] = useState(false);

  return (
    <nav>
      <div className="nav-content">
        <button
          className="nav-icon"
          id="toggle-nav-icon"
          onClick={() => {
            setLinksVisible(!linksVisible);
          }}
        >
          <AiOutlineMenu />
        </button>
        <ul
          className="nav-links-mobile"
          style={
            linksVisible
              ? {
                  visibility: "visible",
                  width: "80vw",
                }
              : {
                  visibility: "hidden",
                  width: "0",
                }
          }
        >
          <li className="x-icon">
            <button
              className="nav-icon"
              onClick={() => {
                setLinksVisible(!linksVisible);
              }}
            >
              <BiX />
            </button>
          </li>
          <li>
            <Link
              to="/"
              onClick={() => {
                setLinksVisible(!linksVisible);
              }}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              onClick={() => {
                setLinksVisible(!linksVisible);
              }}
            >
              ABOUT
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              onClick={() => {
                setLinksVisible(!linksVisible);
              }}
            >
              PRODUCTS
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={() => {
                setLinksVisible(!linksVisible);
              }}
            >
              CONTACT
            </Link>
          </li>
        </ul>

        <div className="nav-content-center">
          <Link to="/" id="logo-icon">
            <img src={PANTHER} alt="panther logo" />
          </Link>

          <ul className="nav-links-desktop">
            <li>
              <Link className="hover-underline" to="/">
                HOME
              </Link>
            </li>
            <li>
              <Link className="hover-underline" to="/about">
                ABOUT
              </Link>
            </li>
            <li>
              <Link className="hover-underline" to="/products">
                PRODUCTS
              </Link>
            </li>
            <li>
              <Link className="hover-underline" to="/contact">
                CONTACT
              </Link>
            </li>
          </ul>
        </div>

        <NavCartIcon />
      </div>
      <div className="nav-spacer"></div>
    </nav>
  );
};

export default Nav;
