import React, { useEffect } from "react";
import "./checkout.css";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import CheckoutForm from "./checkout_form/CheckoutForm";
// import {
//   useCheckoutState,
//   useCheckoutDispatch,
// } from "../../context/CheckoutContext";
import { useBeforeunload } from "react-beforeunload";
// import { useNavigate } from "react-router-dom";
import ErrorForm from "./checkout_form/ErrorForm";
// import { BiWindowAlt } from "react-icons/bi";

const Checkout = () => {
  // const { resetOrderData, updateOrderInfo } = useCheckoutDispatch();
  // const navigate = useNavigate();
  // const checkout = useCheckoutState();

  useBeforeunload((e) => {
    e.preventDefault();
    window.sessionStorage.setItem("is_reloaded", "true");
  });

  // // This resets the checkout data if the user leaves in the middle of checkout
  // useEffect(() => {
  //   console.log(
  //     "Mounting checkout...",
  //     window.sessionStorage.getItem("is_reloaded")
  //   );

  //   return () => {
  //     console.log("Unmounting checkout...");
  //   };
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-wrapper">
      <Nav />
      {window.sessionStorage.getItem("is_reloaded") === "true" ? (
        <ErrorForm
          customError={
            "Page refreshed during checkout. Return home and try again."
          }
        />
      ) : (
        <CheckoutForm />
      )}
      <Footer />
    </main>
  );
};

export default Checkout;
