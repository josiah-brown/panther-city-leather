import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoLogoVk } from "react-icons/io";
import { BiX } from "react-icons/bi";
import "./nav.css";

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
          <HiMenuAlt1 />
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
              to="/cart"
              onClick={() => {
                setLinksVisible(!linksVisible);
              }}
            >
              CART
            </Link>
          </li>
        </ul>

        <div className="nav-content-center">
          <Link to="/" className="nav-icon" id="logo-icon">
            <IoLogoVk />
          </Link>

          <ul className="nav-links-desktop">
            <li>
              <Link className="hover-underline" to="/">
                HOME
              </Link>
            </li>
            <li>
              <a className="hover-underline" href="/">
                TEST
              </a>
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

        <button className="nav-icon" id="cart-icon">
          <Link to="/cart">
            <AiOutlineShopping />
          </Link>
        </button>
      </div>
      <div className="nav-spacer"></div>
    </nav>
  );
};

export default Nav;
