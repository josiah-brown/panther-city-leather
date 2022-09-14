import React, { useEffect } from "react";
import "./checkout.css";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import CheckoutForm from "./checkout_form/CheckoutForm";
import {
  useCheckoutState,
  useCheckoutDispatch,
} from "../../context/CheckoutContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const checkout = useCheckoutState();
  const { resetCheckoutState, generateNewToken } = useCheckoutDispatch();
  const currStep = checkout.curr_step;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.onpopstate = () => {
      if ("SHIPPINGBILLINGPAYMENT".includes(currStep)) {
        resetCheckoutState();
        generateNewToken();
      } else if (currStep === "CONFIRM") {
        resetCheckoutState();
        navigate("/");
      }
    };
  });

  return (
    <main className="page-wrapper">
      <Nav />
      <CheckoutForm />
      <Footer />
    </main>
  );
};

export default Checkout;
