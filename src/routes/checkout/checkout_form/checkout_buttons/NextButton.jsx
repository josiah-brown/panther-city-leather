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
        case "SHIPPING":
          updateOrderInfo("curr_step", STEPS.BILLING);
          break;
        case "BILLING":
          updateOrderInfo("curr_step", STEPS.PAYMENT);
          break;
        case "PAYMENT":
          updateOrderInfo("curr_step", STEPS.CONFIRM);
          break;
        default:
          console.error("There was an error updating the checkout step.");
          break;
      }
      window.scrollTo(0, 0);
    };

    if (validForm) {
      handleClick();
    }
    // eslint-disable-next-line
  }, [validForm]);

  const renderBtn = () => {
    return currStep !== "CONFIRM" ? (
      <button className="checkout_nav_btn checkout_dark_btn" type="submit">
        NEXT
      </button>
    ) : null;
  };

  return renderBtn();
};

export default NextButton;
