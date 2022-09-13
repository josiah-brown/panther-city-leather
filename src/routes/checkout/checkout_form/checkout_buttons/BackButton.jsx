import React from "react";
import {
  useCheckoutState,
  useCheckoutDispatch,
} from "../../../../context/CheckoutContext";
import { STEPS } from "../../../../context/CheckoutContext";

const BackButton = () => {
  const checkout = useCheckoutState();
  const { updateOrderInfo } = useCheckoutDispatch();
  const currStep = checkout.curr_step;

  const handleClick = () => {
    switch (currStep) {
      case "BILLING":
        updateOrderInfo("curr_step", STEPS.SHIPPING);
        break;
      case "PAYMENT":
        updateOrderInfo("curr_step", STEPS.BILLING);
        break;
      case "CONFIRM":
        updateOrderInfo("curr_step", STEPS.PAYMENT);
        break;
      default:
        break;
    }
  };

  const renderBtn = () => {
    return currStep !== "INFO" ? (
      <button
        className="checkout_nav_btn checkout_light_btn"
        type="button"
        onClick={handleClick}
      >
        BACK
      </button>
    ) : null;
  };

  return renderBtn();
};

export default BackButton;
