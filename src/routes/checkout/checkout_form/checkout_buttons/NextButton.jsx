import React from "react";
import { useEffect } from "react";
import {
  useCheckoutState,
  useCheckoutDispatch,
} from "../../../../context/CheckoutContext";
import { STEPS } from "../../../../context/CheckoutContext";

const NextButton = ({ validForm }) => {
  const checkout = useCheckoutState();
  const { updateOrderInfo } = useCheckoutDispatch();
  const currStep = checkout.curr_step;

  useEffect(() => {
    const handleClick = () => {
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
          console.error("There was an error updating the checkout step.");
          break;
      }
    };

    if (validForm) {
      handleClick();
    }
  }, [validForm]);

  const renderBtn = () => {
    return currStep !== "CONFIRM" ? (
      <button className="checkout_nav_btn" id="checkout_next_btn" type="submit">
        NEXT
      </button>
    ) : null;
  };

  return renderBtn();
};

export default NextButton;
