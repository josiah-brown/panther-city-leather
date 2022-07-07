import React, { useEffect, useState } from "react";
import commerce from "../../lib/commerce";
import Nav2 from "../../components/nav/Nav2";
import CheckoutForm from "./checkout_form/CheckoutForm";

const Checkout = ({ cart, fetchCart, onCaptureCheckout }) => {
  const [checkoutToken, setCheckoutToken] = useState({});
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState({
    // Customer details
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@email.com",
    // Shipping details
    shippingName: "Jane Doe",
    shippingStreet: "123 Fake St",
    shippingCity: "San Francisco",
    shippingStateProvince: "TX",
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
      return commerce.checkout
        .generateToken(cart.id, { type: "cart" })
        .then((token) => {
          setCheckoutToken(token);
          return console.log("1 - Checkout Token Set");
        })
        .then(() => {
          fetchShippingCountries(checkoutToken.id);
          return console.log("2 - Shipping Countries Set");
        })
        .then(() => {
          fetchShippingOptions(checkoutToken.id, fields.shippingCountry);
          return console.log("3 - Shipping Options Set");
        })
        .then(() => {
          setLoading(false);
          return console.log("4 - Loading Set To False");
        })
        .then(() => {
          return console.log("Current Field Values: ", fields);
        })
        .catch((error) => {
          console.log("There was an error in generating a token", error);
        });
    } else {
      console.log("Cart is empty");
    }
  };

  const fetchShippingCountries = (checkoutTokenId) => {
    commerce.services
      .localeListShippingCountries(checkoutTokenId)
      .then((countries) => {
        let fieldsCopy = structuredClone(fields);
        fieldsCopy.shippingCountries = countries.countries;
        setFields({
          ...fields,
          shippingCountries: countries.countries,
        });
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

          {console.log(fields)}

          {/* {fields.shippingCountries
            ? fields.shippingCountries.map((index) => {
                return (
                  <option value={index} key={index}>
                    {fields.shippingCountries[index]}
                  </option>
                );
              })
            : console.log("There are no countries")}
          ; */}
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

          {/* {fields.shippingStateProvince?.length
            ? fields.shippingStateProvince.map((index) => {
                return (
                  <option value={index} key={index}>
                    {fields.shippingStateProvince[index]}
                  </option>
                );
              })
            : console.log("There are no state provinces")}
          ; */}
        </select>

        {/* <label className="checkout__label" htmlFor="shippingOption">
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

        <button onClick={onCaptureCheckout} className="checkout__btn-confirm">
          Confirm order
        </button>
      </form>
    );
  };

  const sanitizedLineItems = (lineItems) => {
    return lineItems.reduce((data, lineItem) => {
      const item = data;
      let variantData = null;
      if (lineItem.selected_options.length) {
        variantData = {
          [lineItem.selected_options[0].group_id]:
            lineItem.selected_options[0].option_id,
        };
      }
      item[lineItem.id] = {
        quantity: lineItem.quantity,
        variants: variantData,
      };
      return item;
    }, {});
  };

  const handleCaptureCheckout = (e) => {
    e.preventDefault();
    const orderData = {
      line_items: sanitizedLineItems(cart.line_items),
      customer: {
        firstname: fields.firstName,
        lastname: fields.lastName,
        email: fields.email,
      },
      shipping: {
        name: fields.shippingName,
        street: fields.shippingStreet,
        town_city: fields.shippingCity,
        county_state: fields.shippingStateProvince,
        postal_zip_code: fields.shippingPostalZipCode,
        country: fields.shippingCountry,
      },
      fulfillment: {
        shipping_method: fields.shippingOption.id,
      },
      payment: {
        gateway: "test_gateway",
        card: {
          number: fields.cardNum,
          expiry_month: fields.expMonth,
          expiry_year: fields.expYear,
          cvc: fields.ccv,
          postal_zip_code: fields.billingPostalZipcode,
        },
      },
    };
    onCaptureCheckout(checkoutToken.id, orderData);
  };

  const handleFormChanges = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    generateCheckoutToken();
  }, []);

  // useEffect(() => {
  //   fetchShippingOptions(checkoutToken.id, fields.shippingCountry);
  // });

  return (
    <main>
      <Nav2 />
      <h1>Checkout</h1>
      {
        loading ? "Loading..." : renderCheckoutForm() // <CheckoutForm fields={fields} handleFormChanges={handleFormChanges} />
      }
    </main>
  );
};

export default Checkout;
