import React from "react";
import { useCheckoutState } from "../../../context/CheckoutContext";
import "./checkout-progress-bar.css";
const CheckoutProgressBar = () => {
  const checkout = useCheckoutState();
  const step = checkout.curr_step;

  return (
    <React.Fragment>
      <h1>{step}</h1>
      {/* {console.log(checkout)} */}
      <div id="checkout-progress-bar">
        <div className="step" id="step-1">
          <div className="bubble"></div>
          <div className="step_name">INFO</div>
        </div>
        <div className="bar-spacer"></div>
        <div className="step" id="step-2">
          <div className="bubble"></div>
          <div className="step_name">SHIPPING</div>
        </div>
        <div className="bar-spacer"></div>
        <div className="step" id="step-3">
          <div className="bubble"></div>
          <div className="step_name">PAYMENT</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CheckoutProgressBar;
