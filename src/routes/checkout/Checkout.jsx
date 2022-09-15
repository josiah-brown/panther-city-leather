import React, { useEffect } from "react";
import "./checkout.css";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import CheckoutForm from "./checkout_form/CheckoutForm";
import { useCheckoutDispatch } from "../../context/CheckoutContext";
import { useBeforeunload } from "react-beforeunload";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { resetCheckoutState } = useCheckoutDispatch();
  const navigate = useNavigate();

  // THERE IS A BUG ON RELOAD THAT DOESNT REFRESH DROP DOWNS
  useBeforeunload((e) => {
    e.preventDefault();
    // console.log(e.target);
    navigate("/");
  });

  // This resets the checkout data if the user leaves in the middle of checkout
  useEffect(() => {
    return () => {
      console.log("Exit checkout effect called");
      resetCheckoutState();
    };
  }, [resetCheckoutState]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-wrapper">
      <Nav />
      <CheckoutForm />
      <Footer />
    </main>
  );
};

export default Checkout;
