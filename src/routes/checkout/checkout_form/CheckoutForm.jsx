import React, { useState, useEffect } from "react";
import { useCheckoutState } from "../../../context/CheckoutContext";
import CheckoutProgressBar from "../checkout_progress/CheckoutProgressBar";
import Loader from "../../../components/loader/Loader";
import ShippingForm from "./ShippingForm";
import PaymentForm from "./PaymentForm";
import ConfirmForm from "./ConfirmForm";

const CheckoutForm = () => {
  const checkout = useCheckoutState();
  const currStep = checkout.curr_step;
  const [loading, setLoading] = useState(true);

  // Effect that shows the form only once the content has loaded
  useEffect(() => {
    if (currStep !== "LOADING") {
      setLoading(false);
    }
  }, [currStep]);

  return (
    <React.Fragment>
      {loading ? <Loader /> : null}
      {currStep !== "LOADING" ? (
        <CheckoutProgressBar></CheckoutProgressBar>
      ) : null}
      {currStep === "SHIPPING" && <ShippingForm />}
      {currStep === "PAYMENT" && <PaymentForm />}
      {currStep === "CONFIRM" && <ConfirmForm />}
    </React.Fragment>
  );
};

export default CheckoutForm;

// return (
//   <React.Fragment>
//     {loading ? <Loader /> : null}
//     {currStep !== "LOADING" ? (
//       <CheckoutProgressBar></CheckoutProgressBar>
//     ) : null}
//     <div className="checkout_form">
//       {currStep === "INFO" ? <InfoSection></InfoSection> : null}
//       {currStep === "SHIPPING" ? <ShippingSection></ShippingSection> : null}
//       {currStep === "PAYMENT" ? <PaymentSection></PaymentSection> : null}
//     </div>
//   </React.Fragment>
// );
