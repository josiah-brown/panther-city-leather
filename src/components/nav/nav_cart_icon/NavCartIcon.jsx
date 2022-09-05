import React, { useEffect, useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useCartState } from "../../../context/CartContext";

const NavCartIcon = () => {
  const [cartLoaded, setCartLoaded] = useState(false);
  const cart = useCartState();

  useEffect(() => {
    if (Object.keys(cart).length !== 0) {
      setCartLoaded(true);
    } else {
      setCartLoaded(false);
    }
  }, [cart]);

  return (
    <button className="nav-icon" id="cart-icon">
      <Link to="/cart" id="cart-icon-link">
        <AiOutlineShopping />
        {cartLoaded ? (
          <div
            className="bubble"
            style={
              cart.line_items.length > 0
                ? { display: "inline-block" }
                : { display: "none" }
            }
          ></div>
        ) : null}
      </Link>
    </button>
  );
};

export default NavCartIcon;
