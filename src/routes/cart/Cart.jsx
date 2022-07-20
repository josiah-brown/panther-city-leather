import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import CartItem from "./cart_item/CartItem";
import "./cart.css";
import { useCartState, useCartDispatch } from "../../context/CartContext";

const Cart = () => {
  const cart = useCartState();
  const { emptyCart } = useCartDispatch();

  // Displays message if cart is empty
  const renderEmptyMessage = () => {
    if (cart.total_unique_items > 0) {
      return;
    }
    return <p>You have no items in your shopping cart, start adding some!</p>;
  };

  // Renders the items in the cart
  const renderItems = () => {
    return cart.line_items.map((lineItem) => (
      <CartItem item={lineItem} key={lineItem.id} />
    ));
  };

  // Renders the total price of the order
  const renderTotal = () => {
    return (
      <p>
        TOTAL: <b>{cart.subtotal.formatted_with_symbol}</b>
      </p>
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-wrapper">
      <Nav />

      <div className="page-content">
        <h4 className="h-main" id="cart-heading">
          CART
        </h4>
        <section className="page-section" id="cart-table-heading">
          <p>PRODUCT</p>
          <p className="special-margin">QUANTITY</p>
          <p>TOTAL</p>
        </section>
        <section className="page-section" id="cart-items">
          {cart.line_items !== undefined ? (
            <div>
              {renderItems()}
              {cart.total_unique_items > 0 ? (
                <div className="cart-footer">
                  <div className="top-row">
                    <button onClick={emptyCart}>EMPTY CART</button>
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

export default Cart;
