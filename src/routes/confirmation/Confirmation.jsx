import React from "react";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import {
  useCheckoutState,
  useCheckoutDispatch,
} from "../../context/CheckoutContext";
import "./confirmation.css";
import { useState } from "react";
import { useEffect } from "react";

const Confirmation = () => {
  const checkout = useCheckoutState();
  const { updateOrderInfo } = useCheckoutDispatch();
  const [order, setOrder] = useState(checkout.confirmed_order);

  function renderOrderSummary() {
    const onBackToHome = () => {
      window.localStorage.removeItem("order_receipt");
      setOrder({});
    };
    if (!order) {
      console.log("No Order...");
      return null;
    }
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
  }

  useEffect(() => {
    if (Object.keys(order).length > 0) {
      updateOrderInfo("confirmed_order", {});
    }
    // eslint-disable-next-line
  }, [order]);

  return (
    <div>
      <Nav />
      {renderOrderSummary()}

      <Footer />
    </div>
  );
};

export default Confirmation;
