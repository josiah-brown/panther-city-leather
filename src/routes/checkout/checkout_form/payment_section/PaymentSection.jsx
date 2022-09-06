import React from "react";
import { useState } from "react";
import {
  useCheckoutState,
  useCheckoutDispatch,
} from "../../../../context/CheckoutContext";

const PaymentSection = () => {
  const checkout = useCheckoutState();
  const { updateOrderInfo } = useCheckoutDispatch();
  const orderData = checkout.order_data;
  const shippingCountries = orderData.fulfillment.shipping_countries;
  const shippingSubs = orderData.fulfillment.shipping_subdivisions;
  const [sameAddress, setSameAddress] = useState(false);

  const renderAddressSection = () => {
    return (
      <div className="checkout__section">
        <h4 className="checkout__subheading">BILLING ADDRESS</h4>

        <label className="checkout__label" htmlFor="shippingName">
          FULL NAME
        </label>
        <input
          className="checkout__input"
          type="text"
          onChange={(e) => {
            updateOrderInfo("name_b", e.target.value);
          }}
          value={orderData.billing.name_b}
          name="billingName"
          placeholder="Enter your shipping full name"
          required
        />

        <label className="checkout__label" htmlFor="shippingStreet">
          STREET ADDRESS
        </label>
        <input
          className="checkout__input"
          type="text"
          onChange={(e) => {
            updateOrderInfo("street_b", e.target.value);
          }}
          value={orderData.billing.street_b}
          name="billingStreet"
          placeholder="Enter your street address"
          required
        />

        <label className="checkout__label" htmlFor="shippingCity">
          CITY
        </label>
        <input
          className="checkout__input"
          type="text"
          onChange={(e) => {
            updateOrderInfo("town_city_b", e.target.value);
          }}
          value={orderData.billing.town_city_b}
          name="billingCity"
          placeholder="Enter your city"
          required
        />

        <label className="checkout__label" htmlFor="shippingPostalZipCode">
          POSTAL/ZIP CODE
        </label>
        <input
          type="number"
          onChange={(e) => {
            if (e.target.value.length < 6) {
              updateOrderInfo("postal_zip_code_b", e.target.value);
            }
          }}
          value={orderData.billing.postal_zip_code_b}
          name="billingPostalZipCode"
          placeholder="Enter your postal/zip code"
          required
        />

        <label className="checkout__label" htmlFor="shippingCountry">
          COUNTRY
        </label>
        <select
          onChange={(e) => {
            updateOrderInfo("country_b", e.target.value);
          }}
          value={orderData.billing.country_b}
          name="billingCountry"
          className="checkout__select"
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
          STATE
        </label>
        <select
          onChange={(e) => {
            updateOrderInfo("county_state_b", e.target.value);
          }}
          value={orderData.billing.county_state_b}
          name="shippingStateProvince"
          className="checkout__select"
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

  const getExpiryYears = () => {
    let year = new Date().getFullYear();
    let possibleYears = [];
    for (let i = 0; i < 12; i++) {
      possibleYears.push(year + i);
    }
    return possibleYears;
  };

  const renderPaymentDetails = () => {
    return (
      <React.Fragment>
        <h4 className="checkout__subheading">PAYMENT DETAILS</h4>

        <label className="checkout__label" htmlFor="cardNum">
          Credit card number
        </label>
        <input
          className="checkout__input"
          type="text"
          name="cardNum"
          onChange={(e) => {
            if (e.target.value.replace(" ", "").length < 17) {
              updateOrderInfo("number", e.target.value);
            }
          }}
          value={orderData.payment.card.number}
          placeholder="Enter card number"
        />

        <label className="checkout__label" htmlFor="expMonth">
          Expiry month
        </label>
        <select
          name="expMonth"
          onChange={(e) => {
            updateOrderInfo("expiry_month", e.target.value);
          }}
          value={orderData.payment.card.expiry_month}
          placeholder="Card expiry month"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m, index) => {
            return <option key={index}>{m}</option>;
          })}
        </select>

        <label className="checkout__label" htmlFor="expYear">
          Expiry year
        </label>
        <select
          name="expYear"
          onChange={(e) => {
            updateOrderInfo("expiry_year", e.target.value);
          }}
          value={orderData.payment.card.expiry_year}
          placeholder="Card expiry year"
        >
          {getExpiryYears().map((y, index) => {
            return <option key={index}>{y}</option>;
          })}
        </select>

        <label className="checkout__label" htmlFor="ccv">
          CCV
        </label>
        <input
          className="checkout__input"
          type="number"
          name="ccv"
          onChange={(e) => {
            if (e.target.value.length < 4) {
              updateOrderInfo("ccv", e.target.value);
            }
          }}
          value={orderData.payment.card.ccv}
          placeholder="Enter 3-digit ccv"
        />

        <label className="checkout__label" htmlFor="billingPostalZipcode">
          Billing Zip Code
        </label>
        <input
          className="checkout__input"
          type="number"
          name="billingPostalZipcode"
          onChange={(e) => {
            if (e.target.value.length < 6) {
              updateOrderInfo("postal_zip_code_p", e.target.value);
            }
          }}
          value={orderData.payment.card.postal_zip_code_p}
          placeholder="Billing zip code"
        />
      </React.Fragment>
    );
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setSameAddress(true);
    } else {
      setSameAddress(false);
    }
  };

  return (
    <React.Fragment>
      <label htmlFor="sameAddressCheckbox">
        Billing address is the same as shipping address
      </label>
      <input
        type="checkbox"
        id="sameAddressCheckbox"
        onChange={handleCheckboxChange}
      />
      {!sameAddress ? renderAddressSection() : null}
      {renderPaymentDetails()}
    </React.Fragment>
  );
};

export default PaymentSection;
