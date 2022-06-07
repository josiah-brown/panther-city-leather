import React from "react";
import "./nav.css";
import { AiOutlineShopping } from "react-icons/ai";

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand m-0" href="/">
          BROWN
        </a>
        <AiOutlineShopping className="bag-icon me-2 fs-4" />
        <div
          class="offcanvas offcanvas-start fs-6 w-75"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div class="offcanvas-header mt-3">
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">
                  HOME
                </a>
              </li>
              <div className="spacer-line my-3"></div>
              <li class="nav-item">
                <a class="nav-link" href="/products">
                  PRODUCTS
                </a>
              </li>
              <div className="spacer-line my-3 w-100"></div>
              <li class="nav-item">
                <a class="nav-link" href="/about">
                  ABOUT
                </a>
              </li>
              <div className="spacer-line my-3 w-100"></div>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
