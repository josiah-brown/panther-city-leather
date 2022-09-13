import React from "react";
import { useCheckoutState } from "../../../context/CheckoutContext";
import { useCheckoutDispatch } from "../../../context/CheckoutContext";
import { Link } from "react-router-dom";

const ConfirmForm = () => {
  const checkout = useCheckoutState();
  const order = checkout.confirmed_order;
  const { updateOrderInfo } = useCheckoutDispatch();

  const onBackToHome = () => {
    updateOrderInfo("confirmed_order", {});
  };

  return (
    <div className="confirmation">
      <div className="confirmation__wrapper">
        <h4>Thank you for your purchase, {order.customer.firstname}!</h4>
        <div>
          <p>Order reference #:</p>
          <p id="order-ref-num">{order.customer_reference}</p>
          <p id="email-notice">
            You should receive a confirmation email shortly.
          </p>
        </div>
        <Link type="button" to="/" onClick={onBackToHome}>
          <span>RETURN HOME</span>
        </Link>
      </div>
    </div>
  );
};

export default ConfirmForm;
