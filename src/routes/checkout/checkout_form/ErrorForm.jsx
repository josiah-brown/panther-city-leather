import React from "react";
import { useCheckoutState } from "../../../context/CheckoutContext";
import { useCheckoutDispatch } from "../../../context/CheckoutContext";
import { useCartDispatch } from "../../../context/CartContext";
import { Link } from "react-router-dom";

const ErrorForm = ({ customError }) => {
  const checkout = useCheckoutState();
  const error = customError
    ? customError
    : checkout.order_error.data.error.message;
  const { resetCheckoutState } = useCheckoutDispatch();
  const { refreshCart } = useCartDispatch();

  const onBackToHome = () => {
    resetCheckoutState();
    refreshCart();
  };

  return (
    <div className="error_wrapper">
      <h4>We're sorry! It seems there was an error.</h4>
      <div>
        <p className="error_message">{"Error - " + error}</p>
        <p className="error_next_step">
          Feel free to submit a message describing your issue or return home and
          try again.
        </p>
      </div>
      <Link type="button" to="/" onClick={onBackToHome}>
        <span>RETURN HOME</span>
      </Link>
    </div>
  );
};

export default ErrorForm;
