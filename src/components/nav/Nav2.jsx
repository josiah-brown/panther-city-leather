import React from "react";
// import { AiOutlineShopping } from "react-icons/ai";
// import { AiOutlineMenu } from "react-icons/ai";
// import { IoLogoVk } from "react-icons/io";
// import { BiX } from "react-icons/bi";

const Nav2 = () => {
  return (
    <nav>
      <div className="nav-center">
        <div>
          <ul>
            <li>
              <a href="/">HOME</a>
            </li>
            <li>
              <a href="/products">PRODUCTS</a>
            </li>
            <li>
              <a href="/about">ABOUT</a>
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
