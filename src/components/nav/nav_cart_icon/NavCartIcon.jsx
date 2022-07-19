import React, { useEffect, useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { Link } from "react-router-dom";

const NavCartIcon = (props) => {
  const [cartLoaded, setCartLoaded] = useState(false);

  useEffect(() => {
    if (Object.keys(props.cart).length !== 0) {
      setCartLoaded(true);
    }
  }, [props.cart]);

  return (
    <button className="nav-icon" id="cart-icon">
      <Link to="/cart" id="cart-icon-link">
        <AiOutlineShopping />
        {cartLoaded ? (
          <div
            className="full-bubble"
            style={
              props.cart.line_items.length > 0
                ? { display: "block" }
                : { display: "none" }
            }
          ></div>
        ) : null}
      </Link>
    </button>
  );
};

export default NavCartIcon;
