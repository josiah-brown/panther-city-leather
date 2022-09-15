import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./cart_item.css";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { useCartDispatch } from "../../../context/CartContext";
import { useState } from "react";
import Loader from "../../../components/loader/Loader";
import { useEffect } from "react";
import { MAX_CART_QTY } from "../../../utility_functions";

const CartItem = ({ item }) => {
  const { updateCartQty, removeFromCart } = useCartDispatch();
  const [qty, setQty] = useState(item.quantity);
  const [updating, setUpdating] = useState(false);

  const handleUpdateCartQty = (lineItemId, quantity) => {
    updateCartQty(lineItemId, quantity);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(item.id);
  };

  const displayError = () => {
    let message = document.getElementById("qty-error" + item.id);
    message.style.display = "inline-block";
  };

  const hideError = () => {
    let message = document.getElementById("qty-error" + item.id);
    message.style.display = "none";
  };

  useEffect(() => {
    if (updating) {
      setUpdating(!updating);
    }
    // eslint-disable-next-line
  }, [item.quantity]);

  useEffect(() => {
    if (qty > MAX_CART_QTY) {
      displayError();
      setQty(MAX_CART_QTY);
    } else if (qty < MAX_CART_QTY) {
      hideError();
    }
    // eslint-disable-next-line
  }, [qty]);

  return (
    <div className="cart-item">
      {updating ? <Loader /> : null}
      <div className="cart-item-img-container">
        <Link to={"/products/" + item.product_id}>
          <img className="cart-item-img" src={item.image.url} alt={item.name} />
        </Link>
      </div>

      <div className="cart-item-content">
        <div className="cart-item-text">
          <h4 className="h-sub">{item.name.toUpperCase()}</h4>

          <div className="cart-item-variants h-sub">
            {item.selected_options.length > 0
              ? item.selected_options.map((option) => {
                  return (
                    <p key={option.option_id}>
                      {option.option_name.toUpperCase()}
                    </p>
                  );
                })
              : null}
          </div>

          <div className="h-sub" id="item-total-mobile">
            {item.line_total.formatted_with_symbol}
          </div>

          <div className="h-sub" id="item-total-desktop">
            {item.price.formatted_with_symbol}
          </div>
        </div>

        <div className="cart-item-content-bottom-row">
          <div className="cart-item-qty">
            <button
              type="button"
              id={"input" + item.id}
              onClick={() => {
                setUpdating(true);
                handleUpdateCartQty(item.id, item.quantity - 1);
                setQty(qty - 1);
              }}
            >
              <AiOutlineMinus className="qty-icon" />
            </button>

            <input
              className="h-sub"
              type="text"
              value={qty}
              onChange={(e) => {
                let newValue = e.target.value;
                if (!isNaN(newValue)) {
                  if (newValue !== "") {
                    setQty(newValue);
                  } else if (newValue !== MAX_CART_QTY) {
                    setQty(newValue);
                  } else {
                    setQty(MAX_CART_QTY);
                    displayError();
                  }
                }
              }}
              onBlur={(e) => {
                if (!isNaN(e.target.value) && qty !== item.quantity) {
                  if (e.target.value !== "") {
                    setUpdating(true);
                    handleUpdateCartQty(item.id, qty);
                  } else {
                    setUpdating(true);
                    handleUpdateCartQty(item.id, 1);
                    setQty(1);
                  }
                }
              }}
              onKeyDown={(e) => {
                let k = e.key;
                if (k === "Enter") {
                  e.target.blur();
                }
              }}
            ></input>

            <button
              type="button"
              className=" h-sub"
              onClick={() => {
                setUpdating(true);
                handleUpdateCartQty(item.id, item.quantity + 1);
                setQty(qty + 1);
              }}
            >
              <AiOutlinePlus className="qty-icon" />
            </button>
          </div>
          <div id="error-and-remove">
            <div id={"qty-error" + item.id} className="qty-error">
              Max of {MAX_CART_QTY} allowed
            </div>
            <button
              type="button"
              id="item-remove"
              onClick={() => {
                setUpdating(true);
                handleRemoveFromCart();
              }}
            >
              REMOVE
            </button>
          </div>
        </div>
        <div className="line-item-total">
          {item.line_total.formatted_with_symbol}
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem;
