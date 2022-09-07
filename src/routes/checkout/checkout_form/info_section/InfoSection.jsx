import React from "react";
import {
  useCheckoutState,
  useCheckoutDispatch,
} from "../../../../context/CheckoutContext";

const InfoSection = () => {
  const checkout = useCheckoutState();
  const { updateOrderInfo } = useCheckoutDispatch();
  const orderData = checkout.order_data;

  return (
    <div className="checkout_section">
      <h4 className="checkout_subheading">CONTACT INFO</h4>
      <label className="checkout_label" htmlFor="firstName">
        FIRST NAME
      </label>
      <input
        className="checkout_input"
        type="text"
        onChange={(e) => {
          updateOrderInfo("firstname", e.target.value);
        }}
        value={orderData.customer.firstname}
        name="firstName"
        placeholder="Enter your first name"
        required
      />

      <label className="checkout_label" htmlFor="lastName">
        LAST NAME
      </label>
      <input
        className="checkout_input"
        type="text"
        onChange={(e) => updateOrderInfo("lastname", e.target.value)}
        value={orderData.customer.lastname}
        name="lastName"
        placeholder="Enter your last name"
        required
      />

      <label className="checkout_label" htmlFor="email">
        EMAIL
      </label>
      <input
        className="checkout_input"
        type="email"
        onChange={(e) => updateOrderInfo("email", e.target.value)}
        value={orderData.customer.email}
        name="email"
        placeholder="Enter your email"
        required
      />
    </div>
  );
};

export default InfoSection;
