import React, { useState } from "react";
import {
  useCheckoutState,
  useCheckoutDispatch,
  STEPS,
} from "../../../context/CheckoutContext";
import CheckoutProgressBar from "../checkout_progress/CheckoutProgressBar";
import InfoSection from "./info_section/InfoSection";
import ShippingSection from "./shipping_section/ShippingSection";
import PaymentSection from "./payment_section/PaymentSection";
import ConfirmSection from "./confirm_section/ConfirmSection";
import "./checkout-form.css";
import Loader from "../../../components/loader/Loader";
import { useEffect } from "react";

const CheckoutForm = () => {
  const checkout = useCheckoutState();
  const { updateOrderInfo } = useCheckoutDispatch();
  const currStep = checkout.curr_step;
  const [loading, setLoading] = useState(true);

  // Updates the checkout form displayed when the user clicks "NEXT" or "BACK"
  const handleStepClick = (btn) => {
    if (btn === "NEXT") {
      switch (currStep) {
        case "INFO":
          updateOrderInfo("curr_step", STEPS.SHIPPING);
          break;
        case "SHIPPING":
          updateOrderInfo("curr_step", STEPS.PAYMENT);
          break;
        case "PAYMENT":
          updateOrderInfo("curr_step", STEPS.CONFIRM);
          break;
        default:
          break;
      }
    } else if (btn === "BACK") {
      switch (currStep) {
        case "SHIPPING":
          updateOrderInfo("curr_step", STEPS.INFO);
          break;
        case "PAYMENT":
          updateOrderInfo("curr_step", STEPS.SHIPPING);
          break;
        case "CONFIRM":
          updateOrderInfo("curr_step", STEPS.PAYMENT);
          break;
        default:
          break;
      }
    }
  };

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
      <form className="checkout__form">
        {currStep === "INFO" ? <InfoSection></InfoSection> : null}
        {currStep === "SHIPPING" ? <ShippingSection></ShippingSection> : null}
        {currStep === "PAYMENT" ? <PaymentSection></PaymentSection> : null}
        {currStep === "CONFIRM" ? <ConfirmSection></ConfirmSection> : null}
        {currStep !== "INFO" ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleStepClick(e.target.innerHTML);
            }}
          >
            BACK
          </button>
        ) : null}
        {currStep !== "CONFIRM" ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleStepClick(e.target.innerHTML);
            }}
          >
            NEXT
          </button>
        ) : null}
      </form>
    </React.Fragment>
  );
};

export default CheckoutForm;
