import React, { useState, useEffect } from "react";
import { useCheckoutState } from "../../../context/CheckoutContext";
import CheckoutProgressBar from "../checkout_progress/CheckoutProgressBar";
import Loader from "../../../components/loader/Loader";
import ShippingForm from "./ShippingForm";
import BillingForm from "./BillingForm";
import PaymentForm from "./PaymentForm";
import ConfirmForm from "./ConfirmForm";
import ErrorForm from "./ErrorForm";

const CheckoutForm = () => {
  const checkout = useCheckoutState();
  const currStep = checkout.curr_step;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currStep !== "LOADING") {
      setLoading(false);
    }
  }, [currStep]);

  return (
    <React.Fragment>
      {loading ? <Loader /> : null}
      {currStep !== "LOADING" && currStep !== "ERROR" ? (
        <CheckoutProgressBar></CheckoutProgressBar>
      ) : null}
      {currStep === "SHIPPING" && <ShippingForm />}
      {currStep === "BILLING" && <BillingForm />}
      {currStep === "PAYMENT" && <PaymentForm />}
      {currStep === "CONFIRM" && <ConfirmForm />}
      {currStep === "ERROR" && <ErrorForm />}
    </React.Fragment>
  );
};

export default CheckoutForm;
