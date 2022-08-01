import React from "react";
import {
  useCheckoutState,
  // useCheckoutDispatch,
} from "../../../context/CheckoutContext";
import CheckoutProgressBar from "../checkout_progress/CheckoutProgressBar";
import InfoSection from "./info_section/InfoSection";
import ShippingSection from "./shipping_section/ShippingSection";
import "./checkout-form.css";

const CheckoutForm = () => {
  const checkout = useCheckoutState();
  // const { updateOrderInfo } = useCheckoutDispatch();
  // const orderData = checkout.order_data;

  return (
    // Add progress bar component
    // Maybe split each section into a new component
    // Fix update checkout function to reference a path
    <React.Fragment>
      <CheckoutProgressBar></CheckoutProgressBar>
      <form className="checkout__form">
        <InfoSection></InfoSection>
        <ShippingSection></ShippingSection>
        {/*<h4 className="checkout__subheading">Shipping details</h4>

      <label className="checkout__label" htmlFor="shippingName">
        Full name
      </label>
      <input
        className="checkout__input"
        type="text"
        onChange={handleShippingNameChange}
        value={shippingName}
        name="shippingName"
        placeholder="Enter your shipping full name"
        required
      />

      <label className="checkout__label" htmlFor="shippingStreet">
        Street address
      </label>
      <input
        className="checkout__input"
        type="text"
        onChange={handleShippingStreetChange}
        value={shippingStreet}
        name="shippingStreet"
        placeholder="Enter your street address"
        required
      />

      <label className="checkout__label" htmlFor="shippingCity">
        City
      </label>
      <input
        className="checkout__input"
        type="text"
        onChange={handleShippingCityChange}
        value={shippingCity}
        name="shippingCity"
        placeholder="Enter your city"
        required
      />

      <label className="checkout__label" htmlFor="shippingPostalZipCode">
        Postal/Zip code
      </label>
      <input
        className="checkout__input"
        type="text"
        onChange={handleShippingPostalZipCodeChange}
        value={shippingPostalZipCode}
        name="shippingPostalZipCode"
        placeholder="Enter your postal/zip code"
        required
      />

      <label className="checkout__label" htmlFor="shippingCountry">
        Country
      </label>
      <select
        value={shippingCountry}
        name="shippingCountry"
        className="checkout__select"
        onChange={handleShippingCountryChange}
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

      <label className="checkout__label" htmlFor="shippingStateProvince">
        State/Province
      </label>
      <select
        value={shippingStateProvince}
        name="shippingStateProvince"
        className="checkout__select"
        onChange={handleShippingStateProvinceChange}
      >
        <option className="checkout__option" disabled>
          State/province
        </option>
        {Object.keys(shippingSubdivisions).map((index) => {
          return (
            <option value={index} key={index}>
              {shippingSubdivisions[index]}
            </option>
          );
        })}
        ;
      </select>

      <label className="checkout__label" htmlFor="shippingOption">
        Shipping method
      </label>
      <select
        value={shippingOption.id ? shippingOption.id : ""}
        name="shippingOption"
        className="checkout__select"
        onChange={handleShippingOptionChange}
      >
        <option className="checkout__select-option" disabled>
          Select a shipping method
        </option>
        {shippingOptions.map((method, index) => {
          return (
            <option
              className="checkout__select-option"
              value={method.id}
              key={index}
            >{`${method.description} - $${method.price.formatted_with_code}`}</option>
          );
        })}
        ;
      </select>

      <h4 className="checkout__subheading">Payment information</h4>

      <label className="checkout__label" htmlFor="cardNum">
        Credit card number
      </label>
      <input
        className="checkout__input"
        type="text"
        name="cardNum"
        onChange={handleCardNumChange}
        value={cardNum}
        placeholder="Enter your card number"
      />

      <label className="checkout__label" htmlFor="expMonth">
        Expiry month
      </label>
      <input
        className="checkout__input"
        type="text"
        name="expMonth"
        onChange={handleExpMonthChange}
        value={expMonth}
        placeholder="Card expiry month"
      />

      <label className="checkout__label" htmlFor="expYear">
        Expiry year
      </label>
      <input
        className="checkout__input"
        type="text"
        name="expYear"
        onChange={handleExpYearChange}
        value={expYear}
        placeholder="Card expiry year"
      />

      <label className="checkout__label" htmlFor="ccv">
        CCV
      </label>
      <input
        className="checkout__input"
        type="text"
        name="ccv"
        onChange={handleCcvChange}
        value={ccv}
        placeholder="CCV (3 digits)"
      />

      <label className="checkout__label" htmlFor="billingPostalZipcode">
        Billing Zip Code
      </label>
      <input
        className="checkout__input"
        type="text"
        name="billingPostalZipcode"
        onChange={handleBillingPostalZipcodeChange}
        value={billingPostalZipcode}
        placeholder="CCV (3 digits)"
      />

      <button className="checkout__btn-confirm" onClick={handleCaptureCheckout}>
        Confirm order
      </button> */}

        <button
          onClick={(e) => {
            e.preventDefault();
            console.log(checkout);
          }}
        >
          Click Me
        </button>
      </form>
    </React.Fragment>
  );
};

export default CheckoutForm;
