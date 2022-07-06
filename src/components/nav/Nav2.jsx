import React from "react";
import { Link } from "react-router-dom";
// import { AiOutlineShopping } from "react-icons/ai";

const Nav2 = () => {
  return (
    <nav>
      <div className="nav-center">
        <div>
          <ul>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/products">PRODUCTS</Link>
            </li>
            <li>
              <Link to="/about">ABOUT</Link>
            </li>
            <li>
              <Link to="/cart">CART</Link>
            </li>
            <li>
              <Link to="/checkout">CHECKOUT</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* <a href="/cart">
          <AiOutlineShopping className="nav-icon" />
        </a> */}
    </nav>
  );
};

export default Nav2;
