import React, { useEffect } from "react";
import Nav2 from "../../components/nav/Nav2";
import CartItem from "./cart_item/CartItem";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const Cart = ({
  cart,
  onUpdateCartQty,
  onRemoveFromCart,
  onEmptyCart,
  fetchCart,
}) => {
  const renderEmptyMessage = () => {
    if (cart.total_unique_items > 0) {
      return;
    }
    return (
      <p className="cart__none">
        You have no items in your shopping cart, start adding some!
      </p>
    );
  };

  const renderItems = () => {
    return cart.line_items.map((lineItem) => (
      <CartItem
        item={lineItem}
        key={lineItem.id}
        onUpdateCartQty={onUpdateCartQty}
        onRemoveFromCart={onRemoveFromCart}
        className="cart__inner"
      />
    ));
  };

  const renderTotal = () => {
    <div className="cart__total">
      <p className="cart__total-title">Subtotal:</p>
      <p className="cart__total-price">{cart.subtotal.formatted_with_symbol}</p>
    </div>;
  };

  const handleEmptyCart = () => {
    onEmptyCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="cart">
      <Nav2 />
      <h4 className="cart__heading">Your Shopping Cart</h4>
      {cart.line_items ? (
        <div>
          {renderEmptyMessage()}
          {renderItems()}
          {renderTotal()}
          {cart.total_unique_items > 0 ? (
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
          ) : null}
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
