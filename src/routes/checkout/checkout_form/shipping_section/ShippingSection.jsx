import React from "react";
import {
  useCheckoutState,
  useCheckoutDispatch,
} from "../../../../context/CheckoutContext";

const ShippingSection = () => {
  const checkout = useCheckoutState();
  const { updateOrderInfo } = useCheckoutDispatch();
  const orderData = checkout.order_data;
  const shippingCountries = orderData.fulfillment.shipping_countries;
  const shippingSubs = orderData.fulfillment.shipping_subdivisions;

  return (
    <div className="checkout_section">
      <h4 className="checkout_subheading">SHIPPING DETAILS</h4>
      <label className="checkout_label" htmlFor="shippingName">
        FULL NAME
      </label>
      <input
        className="checkout_input"
        type="text"
        onChange={(e) => {
          updateOrderInfo("name", e.target.value);
        }}
        value={orderData.shipping.name}
        name="shippingName"
        placeholder="Enter shipping full name"
        required
      />

      <label className="checkout_label" htmlFor="shippingStreet">
        STREET ADDRESS
      </label>
      <input
        className="checkout_input"
        type="text"
        onChange={(e) => {
          updateOrderInfo("street", e.target.value);
        }}
        value={orderData.shipping.street}
        name="shippingStreet"
        placeholder="Enter shipping street address"
        required
      />

      <label className="checkout_label" htmlFor="shippingCity">
        CITY
      </label>
      <input
        className="checkout_input"
        type="text"
        onChange={(e) => {
          updateOrderInfo("town_city", e.target.value);
        }}
        value={orderData.shipping.town_city}
        name="shippingCity"
        placeholder="Enter shipping city"
        required
      />

      <label className="checkout_label" htmlFor="shippingPostalZipCode">
        POSTAL/ZIP CODE
      </label>
      <input
        className="checkout_input"
        type="text"
        onChange={(e) => {
          updateOrderInfo("postal_zip_code", e.target.value);
        }}
        value={orderData.shipping.postal_zip_code}
        name="shippingPostalZipCode"
        placeholder="Enter shipping zip code"
        required
      />

      <label className="checkout_label" htmlFor="shippingCountry">
        COUNTRY
      </label>
      <select
        onChange={(e) => {
          updateOrderInfo("country", e.target.value);
        }}
        value={orderData.shipping.country}
        name="shippingCountry"
        className="checkout_select"
      >
        <option className="checkout__option" disabled>
          Country
        </option>
        <option value={"US"} key={"US"}>
          {"United States"}
        </option>
        {Object.keys(shippingCountries).map((index) => {
          return index !== "US" ? (
            <option value={index} key={index}>
              {shippingCountries[index]}
            </option>
          ) : null;
        })}
        ;
      </select>

      <label className="checkout_label" htmlFor="shippingStateProvince">
        STATE
      </label>
      <select
        onChange={(e) => {
          updateOrderInfo("county_state", e.target.value);
        }}
        value={orderData.shipping.county_state}
        name="shippingStateProvince"
        className="checkout_select"
      >
        <option className="checkout__option" disabled>
          State
        </option>
        {Object.keys(shippingSubs).map((index) => {
          return (
            <option value={index} key={index}>
              {shippingSubs[index]}
            </option>
          );
        })}
        ;
      </select>
    </div>
  );
};

export default ShippingSection;
