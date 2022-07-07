import React from "react";
import "./checkout-form.css";

const CheckoutForm = ({ fields, handleFormChanges }) => {
  return (
    <form className="checkout__form">
      <h4 className="checkout__subheading">Customer information</h4>

      <label className="checkout__label" htmlFor="firstName">
        First name
      </label>
      <input
        className="checkout__input"
        type="text"
        value={fields.firstName}
        name="firstName"
        placeholder="Enter your first name"
        required
        onChange={handleFormChanges}
      />

      <label className="checkout__label" htmlFor="lastName">
        Last name
      </label>
      <input
        className="checkout__input"
        type="text"
        value={fields.lastName}
        name="lastName"
        placeholder="Enter your last name"
        required
        onChange={handleFormChanges}
      />

      <label className="checkout__label" htmlFor="email">
        Email
      </label>
      <input
        className="checkout__input"
        type="text"
        value={fields.email}
        name="email"
        placeholder="Enter your email"
        required
        onChange={handleFormChanges}
      />

      <h4 className="checkout__subheading">Shipping details</h4>

      <label className="checkout__label" htmlFor="shippingName">
        Full name
      </label>
      <input
        className="checkout__input"
        type="text"
        value={fields.shippingName}
        name="shippingName"
        placeholder="Enter your shipping full name"
        required
        onChange={handleFormChanges}
      />

      <label className="checkout__label" htmlFor="shippingStreet">
        Street address
      </label>
      <input
        className="checkout__input"
        type="text"
        value={fields.shippingStreet}
        name="shippingStreet"
        placeholder="Enter your street address"
        required
        onChange={handleFormChanges}
      />

      <label className="checkout__label" htmlFor="shippingCity">
        City
      </label>
      <input
        className="checkout__input"
        type="text"
        value={fields.shippingCity}
        name="shippingCity"
        placeholder="Enter your city"
        required
        onChange={handleFormChanges}
      />

      <label className="checkout__label" htmlFor="shippingPostalZipCode">
        Postal/Zip code
      </label>
      <input
        className="checkout__input"
        type="text"
        value={fields.shippingPostalZipCode}
        name="shippingPostalZipCode"
        placeholder="Enter your postal/zip code"
        required
        onChange={handleFormChanges}
      />

      <label className="checkout__label" htmlFor="shippingCountry">
        Country
      </label>
      <select
        value={fields.shippingCountry}
        name="shippingCountry"
        className="checkout__select"
        onChange={handleFormChanges}
      >
        <option disabled>Country</option>
        {fields.shippingCountries?.length
          ? fields.shippingCountries.map((index) => {
              return (
                <option value={index} key={index}>
                  {fields.shippingCountries[index]}
                </option>
              );
            })
          : console.log("There are no countries")}
        ;
      </select>

      <label className="checkout__label" htmlFor="shippingStateProvince">
        State/province
      </label>
      <select
        value={fields.shippingStateProvince}
        name="shippingStateProvince"
        onChange={handleFormChanges}
        className="checkout__select"
      >
        <option className="checkout__option" disabled>
          State/province
        </option>
        {fields.shippingStateProvince?.length
          ? fields.shippingStateProvince.map((index) => {
              return (
                <option value={index} key={index}>
                  {fields.shippingStateProvince[index]}
                </option>
              );
            })
          : console.log("There are no state provinces")}
        ;
      </select>

      <label className="checkout__label" htmlFor="shippingOption">
        Shipping method
      </label>
      <select
        value={fields.shippingOption.id}
        name="shippingOption"
        onChange={handleFormChanges}
        className="checkout__select"
      >
        <option className="checkout__select-option" disabled>
          Select a shipping method
        </option>
        {fields.shippingOptions?.length
          ? fields.shippingOptions.map((method, index) => {
              return (
                <option
                  className="checkout__select-option"
                  value={method.id}
                  key={index}
                >{`${method.description} - $${method.price.formatted_with_code}`}</option>
              );
            })
          : console.log("There are no shipping options")}
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
        value={fields.cardNum}
        placeholder="Enter your card number"
        onChange={handleFormChanges}
      />

      <label className="checkout__label" htmlFor="expMonth">
        Expiry month
      </label>
      <input
        className="checkout__input"
        type="text"
        name="expMonth"
        value={fields.expMonth}
        placeholder="Card expiry month"
        onChange={handleFormChanges}
      />

      <label className="checkout__label" htmlFor="expYear">
        Expiry year
      </label>
      <input
        className="checkout__input"
        type="text"
        name="expYear"
        value={fields.expYear}
        placeholder="Card expiry year"
        onChange={handleFormChanges}
      />

      <label className="checkout__label" htmlFor="ccv">
        CCV
      </label>
      <input
        className="checkout__input"
        type="text"
        name="ccv"
        value={fields.ccv}
        placeholder="CCV (3 digits)"
        onChange={handleFormChanges}
      />

      <button className="checkout__btn-confirm">Confirm order</button>
    </form>
  );
};

export default CheckoutForm;
