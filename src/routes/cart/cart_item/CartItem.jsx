import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./cart_item.css";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
  const handleUpdateCartQty = (lineItemId, quantity) => {
    onUpdateCartQty(lineItemId, quantity);
  };

  const handleRemoveFromCart = () => {
    onRemoveFromCart(item.id);
  };

  useEffect(() => {
    console.log(item);
  }, []);

  return (
    <div className="cart-item">
      <div className="cart-item-img-container">
        <img className="cart-item-img" src={item.image.url} alt={item.name} />
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
              onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}
            >
              <AiOutlineMinus className="qty-icon" />
            </button>
            <p className="h-sub">{item.quantity}</p>
            <button
              type="button"
              className=" h-sub"
              onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}
            >
              <AiOutlinePlus className="qty-icon" />
            </button>
          </div>

          <div>
            <button
              type="button"
              id="item-remove"
              onClick={handleRemoveFromCart}
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
