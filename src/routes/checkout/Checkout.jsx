import React, { useEffect, useState } from "react";
import commerce from "../../lib/commerce";
import "./checkout.css";
import Nav2 from "../../components/nav/Nav2";

const Checkout = (props) => {
  // STATE VARIABLES
  // Checkout token (generated when checkout is loaded)
  const [checkoutToken, setCheckoutToken] = useState({});

  // Contact details
  const [firstName, setFirstName] = useState("Jane");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("janedoe@gmail.com");

  // Shipping details
  const [shippingName, setShippingName] = useState("Jane Doe");
  const [shippingStreet, setShippingStreet] = useState("123 Fake St");
  const [shippingCity, setShippingCity] = useState("San Francisco");
  const [shippingStateProvince, setShippingStateProvince] = useState("");
  const [shippingPostalZipCode, setShippingPostalZipCode] = useState("94107");
  const [shippingCountry, setShippingCountry] = useState("");

  // Payment details
  const [cardNum, setCardNum] = useState("4242 4242 4242 4242");
  const [expMonth, setExpMonth] = useState("11");
  const [expYear, setExpYear] = useState("2023");
  const [ccv, setCcv] = useState("123");
  const [billingPostalZipcode, setBillingPostalZipcode] = useState("94107");

  // Shipping and fulfillment data
  const [shippingCountries, setShippingCountries] = useState({});
  const [shippingSubdivisions, setShippingSubdivisions] = useState({});
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  function generateCheckoutToken() {
    if (props.cart.line_items.length) {
      commerce.checkout
        .generateToken(props.cart.id, { type: "cart" })
        .then((token) => {
          return setCheckoutToken(token);
        })
        .then(() => {
          return console.log("1 - Token successfully generated.");
        })
        .then(() => {
          return fetchShippingCountries(checkoutToken.id);
        })
        .then(() => {
          return console.log("2 - Shipping countries fetched successfully");
        })
        .catch((error) => {
          console.log("There was an error in generating a token", error);
        });
    }
  }

  function fetchShippingCountries(checkoutTokenId) {
    commerce.services
      .localeListShippingCountries(checkoutTokenId)
      .then((countries) => {
        setShippingCountries(countries.countries);
      })
      .catch((error) => {
        console.log(
          "There was an error fetching a list of shipping countries",
          error
        );
      });
  }

  function fetchSubdivisions(countryCode) {
    commerce.services
      .localeListSubdivisions(countryCode)
      .then((subdivisions) => {
        setShippingSubdivisions(subdivisions.subdivisions);
      })
      .catch((error) => {
        console.log("There was an error fetching the subdivisions", error);
      });
  }

  function fetchShippingOptions(
    checkoutTokenId,
    country,
    stateProvince = null
  ) {
    commerce.checkout
      .getShippingOptions(checkoutTokenId, {
        country: country,
        region: stateProvince,
      })
      .then((options) => {
        const shipOption = options[0] || null;
        setShippingOptions(options);
        setShippingOption(shipOption);
      })
      .catch((error) => {
        console.log("There was an error fetching the shipping methods", error);
      });
  }

  //Contact detail change handlers
  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }
  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  //Shipping detail change handlers
  function handleShippingNameChange(e) {
    setShippingName(e.target.value);
  }
  function handleShippingStreetChange(e) {
    setShippingStreet(e.target.value);
  }
  function handleShippingCityChange(e) {
    setShippingCity(e.target.value);
  }
  function handleShippingPostalZipCodeChange(e) {
    setShippingPostalZipCode(e.target.value);
  }

  //Payment detail change handlers
  function handleCardNumChange(e) {
    setCardNum(e.target.value);
  }
  function handleExpMonthChange(e) {
    setExpMonth(e.target.value);
  }
  function handleExpYearChange(e) {
    setExpYear(e.target.value);
  }
  function handleCcvChange(e) {
    setCcv(e.target.value);
  }

  //Fulfillment change handlers
  function handleShippingCountryChange(e) {
    setShippingCountry(e.target.value);
  }
  function handleShippingStateProvinceChange(e) {
    setShippingStateProvince(e.target.value);
  }
  function handleShippingOptionChange(e) {
    setShippingOption(e.target.value);
  }

  function renderCheckoutForm() {
    return (
      <form className="checkout__form">
        <h4 className="checkout__subheading">Customer information</h4>

        <label className="checkout__label" htmlFor="firstName">
          First name
        </label>
        <input
          className="checkout__input"
          type="text"
          onChange={handleFirstNameChange}
          value={firstName}
          name="firstName"
          placeholder="Enter your first name"
          required
        />

        <label className="checkout__label" htmlFor="lastName">
          Last name
        </label>
        <input
          className="checkout__input"
          type="text"
          onChange={handleLastNameChange}
          value={lastName}
          name="lastName"
          placeholder="Enter your last name"
          required
        />

        <label className="checkout__label" htmlFor="email">
          Email
        </label>
        <input
          className="checkout__input"
          type="text"
          onChange={handleEmailChange}
          value={email}
          name="email"
          placeholder="Enter your email"
          required
        />

        <h4 className="checkout__subheading">Shipping details</h4>

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
          defaultValue={shippingCountry}
          name="shippingCountry"
          className="checkout__select"
          onChange={handleShippingCountryChange}
        >
          <option disabled>Country</option>
          {/* <option selected disabled>
            Select Country
          </option> */}
          {Object.keys(shippingCountries).map((index) => {
            return (
              <option value={index} key={index}>
                {shippingCountries[index]}
              </option>
            );
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
          value={shippingOption.id}
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

        <button
          className="checkout__btn-confirm"
          onClick={(e) => {
            e.preventDefault();
            console.log(shippingCountry);
          }}
        >
          Confirm order
        </button>
      </form>
    );
  }

  useEffect(() => {
    if (props.cart.line_items) {
      generateCheckoutToken();
    }
  }, [props.cart]);

  useEffect(() => {
    if (shippingCountry && shippingCountry != "") {
      fetchSubdivisions(shippingCountry);
      fetchShippingOptions(checkoutToken.id, shippingCountry);
    }
  }, [shippingCountry]);

  return (
    <div>
      <Nav2 />
      <h1>Checkout</h1>
      {renderCheckoutForm()}
    </div>
  );
};

export default Checkout;
