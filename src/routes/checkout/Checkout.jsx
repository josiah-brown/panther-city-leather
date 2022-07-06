import React, { useEffect, useState } from "react";
import commerce from "../../lib/commerce";
import Nav2 from "../../components/nav/Nav2";
import CheckoutForm from "./checkout_form/CheckoutForm";

const Checkout = ({ cart, fetchCart }) => {
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
      return commerce.checkout
        .generateToken(cart.id, { type: "cart" })
        .then((token) => {
          setCheckoutToken(token);
        })
        .then(() => {
          fetchShippingCountries(checkoutToken.id);
        })
        .then(() => {
          fetchShippingOptions(checkoutToken.id, fields.shippingCountry);
        })
        .catch((error) => {
          console.log("There was an error in generating a token", error);
        });
    } else {
      console.log("Cart has not loaded yet.");
    }
  };

  const fetchShippingCountries = (checkoutTokenId) => {
    commerce.services
      .localeListShippingCountries(checkoutTokenId)
      .then((countries) => {
        setFields({ ...fields, shippingCountries: countries.countries });
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
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log("There was an error fetching the shipping methods", error);
      });
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
      {loading ? (
        "Loading..."
      ) : (
        <CheckoutForm fields={fields} handleFormChanges={handleFormChanges} />
      )}
    </main>
  );
};

export default Checkout;
