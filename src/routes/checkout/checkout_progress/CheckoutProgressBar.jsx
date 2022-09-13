import React, { useEffect } from "react";
import { useCheckoutState } from "../../../context/CheckoutContext";
import "./checkout-progress-bar.css";

let defaultBubbleColor = {
  background: "rgba(0, 0, 0, 0.3)",
};

const CheckoutProgressBar = () => {
  const checkout = useCheckoutState();
  const step = checkout.curr_step;

  // Updates the color of the bubbles on step change
  useEffect(() => {
    if (step === "SHIPPING") {
      document
        .getElementById("step-shipping")
        .getElementsByClassName("progress-bubble")[0].style.backgroundColor =
        "rgba(0, 0, 0, 1.0)";
      document
        .getElementById("step-billing")
        .getElementsByClassName("progress-bubble")[0].style.backgroundColor =
        "rgba(0, 0, 0, 0.5)";
      document
        .getElementById("step-payment")
        .getElementsByClassName("progress-bubble")[0].style.backgroundColor =
        "rgba(0, 0, 0, 0.5)";
      document
        .getElementById("step-confirm")
        .getElementsByClassName("progress-bubble")[0].style.backgroundColor =
        "rgba(0, 0, 0, 0.5)";
    }
    if (step === "BILLING") {
      document
        .getElementById("step-billing")
        .getElementsByClassName("progress-bubble")[0].style.backgroundColor =
        "rgba(0, 0, 0, 1.0)";
      document
        .getElementById("step-payment")
        .getElementsByClassName("progress-bubble")[0].style.backgroundColor =
        "rgba(0, 0, 0, 0.5)";
      document
        .getElementById("step-confirm")
        .getElementsByClassName("progress-bubble")[0].style.backgroundColor =
        "rgba(0, 0, 0, 0.5)";
    }
    if (step === "PAYMENT") {
      document
        .getElementById("step-payment")
        .getElementsByClassName("progress-bubble")[0].style.backgroundColor =
        "rgba(0, 0, 0, 1.0)";
      document
        .getElementById("step-confirm")
        .getElementsByClassName("progress-bubble")[0].style.backgroundColor =
        "rgba(0, 0, 0, 0.5)";
    }
    if (step === "CONFIRM") {
      document
        .getElementById("step-confirm")
        .getElementsByClassName("progress-bubble")[0].style.backgroundColor =
        "rgba(0, 0, 0, 1.0)";
    }
  }, [step]);

  return (
    <React.Fragment>
      <div id="checkout-progress-bar">
        <div className="step" id="step-shipping">
          <div className="progress-bubble" style={defaultBubbleColor}></div>
          <div className="step_name">SHIPPING</div>
        </div>
        <div className="bar-spacer"></div>
        <div className="step" id="step-billing">
          <div className="progress-bubble" style={defaultBubbleColor}></div>
          <div className="step_name">BILLING</div>
        </div>
        <div className="bar-spacer"></div>
        <div className="step" id="step-payment">
          <div className="progress-bubble" style={defaultBubbleColor}></div>
          <div className="step_name">PAYMENT</div>
        </div>
        <div className="bar-spacer"></div>
        <div className="step" id="step-confirm">
          <div className="progress-bubble" style={defaultBubbleColor}></div>
          <div className="step_name">CONFIRM</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CheckoutProgressBar;
