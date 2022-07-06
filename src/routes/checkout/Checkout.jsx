import React, { useEffect, useState } from "react";
import commerce from "../../lib/commerce";
// import Nav from "../../components/nav/Nav";

const Checkout = ({ cart }) => {
  const [checkoutToken, setCheckoutToken] = useState({});
  const [fields, setFields] = useState({
    // checkoutToken: {},
    // Customer details
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@email.com",
    // Shipping details
    shippingName: "Jane Doe",
    shippingStreet: "123 Fake St",
    shippingCity: "San Francisco",
    shippingStateProvince: "CA",
    shippingPostalZipCode: "94107",
    shippingCountry: "US",
    // Payment details
    cardNum: "4242 4242 4242 4242",
    expMonth: "11",
    expYear: "2023",
    ccv: "123",
    billingPostalZipcode: "94107",
    // Shipping and fulfillment data
    shippingCountries: {},
    shippingSubdivisions: {},
    shippingOptions: [],
    shippingOption: "",
  });

  const generateCheckoutToken = () => {
    if (cart.line_items.length) {
      commerce.checkout
        .generateToken(cart.id, { type: "cart" })
        .then((token) => {
          setCheckoutToken(token);
          console.log(token);
          return token;
        })
        .then((token) => {
          fetchShippingCountries(token.id);
        })
        .catch((error) => {
          console.log("There was an error in generating a token", error);
        });
    }
  };

  const fetchShippingCountries = (checkoutTokenId) => {
    commerce.services
      .localeListShippingCountries(checkoutTokenId)
      .then((countries) => {
        console.log(countries.countries);
        setFields({ ...fields, shippingCountries: countries.countries });
        console.log(fields);
      })
      .catch((error) => {
        console.log(
          "There was an error fetching a list of shipping countries",
          error
        );
      });
  };

  const fetchSubdivisions = (countryCode) => {
    commerce.services
      .localeListSubdivisions(countryCode)
      .then((subdivisions) => {
        setFields({
          ...fields,
          shippingSubdivisions: subdivisions.subdivisions,
        });
      })
      .catch((error) => {
        console.log("There was an error fetching the subdivisions", error);
      });
  };

  const fetchShippingOptions = (
    checkoutTokenId,
    country,
    stateProvince = null
  ) => {
    commerce.checkout
      .getShippingOptions(checkoutTokenId, {
        country: country,
        region: stateProvince,
      })
      .then((options) => {
        const shippingOption = options[0] || null;
        setFields({
          ...fields,
          shippingOptions: options,
          shippingOption: shippingOption,
        });
      })
      .catch((error) => {
        console.log("There was an error fetching the shipping methods", error);
      });
  };

  const handleFormChanges = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const renderCheckoutForm = () => {
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
          {fields.shippingCountries
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

        {/*<label className="checkout__label" htmlFor="shippingStateProvince">
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
          {fields.shippingSubdivisions.map((index) => {
            return (
              <option value={index} key={index}>
                {fields.shippingSubdivisions[index]}
              </option>
            );
          })}
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
          {fields.shippingOptions.map((method, index) => {
            return (
              <option
                className="checkout__select-option"
                value={method.id}
                key={index}
              >{`${method.description} - $${method.price.formatted_with_code}`}</option>
            );
          })}
          ;
        </select> */}

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

  useEffect(() => {
    generateCheckoutToken();
  }, []);

  return (
    <main>
      <h1>Checkout</h1>
      {renderCheckoutForm()}
    </main>
  );
};

export default Checkout;
