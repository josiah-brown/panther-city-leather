import React, { useEffect } from "react";
import Nav2 from "../../components/nav/Nav2";
import CartItem from "./cart_item/CartItem";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const Cart = (props) => {
  // Displays message if cart is empty
  const renderEmptyMessage = () => {
    if (props.cart.total_unique_items > 0) {
      return;
    }
    return (
      <p className="cart__none">
        You have no items in your shopping cart, start adding some!
      </p>
    );
  };

  // Renders the items in the cart
  const renderItems = () => {
    return props.cart.line_items.map((lineItem) => (
      <CartItem
        item={lineItem}
        key={lineItem.id}
        onUpdateCartQty={props.onUpdateCartQty}
        onRemoveFromCart={props.onRemoveFromCart}
        className="cart__inner"
      />
    ));
  };

  // Renders the total price of the order
  const renderTotal = () => {
    return (
      <div className="cart__total">
        <p className="cart__total-title">Subtotal:</p>
        <p className="cart__total-price">
          {props.cart.subtotal.formatted_with_symbol}
        </p>
      </div>
    );
  };

  // Called when "empty cart" is pressed
  const handleEmptyCart = () => {
    props.onEmptyCart();
  };

  useEffect(() => {
    props.fetchCart();
  }, []);

  return (
    <div className="cart">
      <Nav2 />
      <h4 className="cart__heading">Your Shopping Cart</h4>
      {props.cart.line_items != undefined ? (
        <div>
          {renderItems()}
          {props.cart.total_unique_items > 0 ? renderTotal() : null}
          {props.cart.total_unique_items > 0 ? (
            <div className="cart__footer">
              <button className="cart__btn-empty" onClick={handleEmptyCart}>
                Empty cart
              </button>
              <button>
                <Link className="cart__btn-checkout" to="/checkout">
                  Checkout
                </Link>
              </button>
            </div>
          ) : (
            renderEmptyMessage()
          )}
        </div>
      ) : (
        "Loading Cart..."
      )}
      <Footer />
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.object,
  onEmptyCart: () => {},
};

export default Cart;
