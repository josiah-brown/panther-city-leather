import React, { useState } from "react";
import { useCheckoutState } from "../../../context/CheckoutContext";
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
      <div className="checkout_form">
        {currStep === "INFO" ? <InfoSection></InfoSection> : null}
        {currStep === "SHIPPING" ? <ShippingSection></ShippingSection> : null}
        {currStep === "PAYMENT" ? <PaymentSection></PaymentSection> : null}
      </div>

      {/* {currStep === "SHIPPING" ? <ShippingSection></ShippingSection> : null}
        {currStep === "PAYMENT" ? <PaymentSection></PaymentSection> : null}
        {currStep === "CONFIRM" ? <ConfirmSection></ConfirmSection> : null}
        {currStep !== "CONFIRM" ? (
          <button
            className="checkout_nav_btn"
            id="checkout_next_btn"
            onClick={(e) => {
              e.preventDefault();
              handleStepClick(e.target.innerHTML);
            }}
          >
            NEXT
          </button>
        ) : null}
        {currStep !== "INFO" ? (
          <button
            className="checkout_nav_btn"
            id="checkout_back_btn"
            onClick={(e) => {
              e.preventDefault();
              handleStepClick(e.target.innerHTML);
            }}
          >
            BACK
          </button>
        ) : null} */}
      {/* </form> */}
    </React.Fragment>
  );
};

export default CheckoutForm;
