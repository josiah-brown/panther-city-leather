import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import CartItem from "./cart_item/CartItem";
import "./cart.css";

const Cart = (props) => {
  // Displays message if cart is empty
  const renderEmptyMessage = () => {
    if (props.cart.total_unique_items > 0) {
      return;
    }
    return <p>You have no items in your shopping cart, start adding some!</p>;
  };

  // Renders the items in the cart
  const renderItems = () => {
    return props.cart.line_items.map((lineItem) => (
      <CartItem
        item={lineItem}
        key={lineItem.id}
        onUpdateCartQty={props.onUpdateCartQty}
        onRemoveFromCart={props.onRemoveFromCart}
      />
    ));
  };

  // Renders the total price of the order
  const renderTotal = () => {
    return (
      <p>
        TOTAL: <b>{props.cart.subtotal.formatted_with_symbol}</b>
      </p>
    );
  };

  // Called when "empty cart" is pressed
  const handleEmptyCart = () => {
    props.onEmptyCart();
  };

  useEffect(() => {
    props.fetchCart();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-wrapper">
      <Nav cart={props.cart} />

      <div className="page-content">
        <h4 className="h-main" id="cart-heading">
          CART
        </h4>
        <section className="page-section" id="cart-table-heading">
          {/* <div className="spacer"></div>
          <div className="cart-table-inner-box"> */}
          <p>PRODUCT</p>
          <p className="special-margin">QUANTITY</p>
          <p>TOTAL</p>
          {/* </div> */}
        </section>
        <section className="page-section" id="cart-items">
          {props.cart.line_items !== undefined ? (
            <div>
              {renderItems()}
              {props.cart.total_unique_items > 0 ? (
                <div className="cart-footer">
                  <div className="top-row">
                    <button onClick={handleEmptyCart}>EMPTY CART</button>
                    {renderTotal()}
                  </div>
                  <Link to="/products" className="continue-btn btn-lg">
                    CONTINUE SHOPPING
                  </Link>
                  <Link to="/checkout" className="checkout-btn btn-lg">
                    CHECKOUT
                  </Link>
                </div>
              ) : (
                renderEmptyMessage()
              )}
            </div>
          ) : (
            <h1>"Loading Cart..."</h1>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
};

Cart.propTypes = {
  cart: PropTypes.object,
  onEmptyCart: () => {},
};

export default Cart;
