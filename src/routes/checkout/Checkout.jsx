import React, { useEffect } from "react";
import "./checkout.css";
import Nav from "../../components/nav/Nav";
import CheckoutForm from "./checkout_form/CheckoutForm";

const Checkout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Nav />
      <h1>CHECKOUT</h1>
      <CheckoutForm />
    </React.Fragment>
  );
};

export default Checkout;
