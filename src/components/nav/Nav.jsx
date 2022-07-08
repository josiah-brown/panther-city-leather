import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoLogoVk } from "react-icons/io";
import { BiX } from "react-icons/bi";
import "./nav.css";

const Nav3 = () => {
  const [linksVisible, setLinksVisible] = useState(false);

  return (
    <nav>
      <div className="nav-content">
        <button
          className="nav-icon"
          onClick={() => {
            setLinksVisible(!linksVisible);
          }}
        >
          <HiMenuAlt1 />
        </button>
        <Link to="/" className="nav-icon">
          <IoLogoVk />
        </Link>
        <button className="nav-icon">
          <AiOutlineShopping />
        </button>
      </div>

      <ul
        className="nav-links"
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
    </nav>
  );
};

export default Nav3;
