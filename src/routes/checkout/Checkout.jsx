// import React, { useEffect, useState } from "react";
// import commerce from "../../lib/commerce";
import "./checkout.css";
import Nav from "../../components/nav/Nav";
import { CheckoutProvider } from "../../context/CheckoutContext";
import CheckoutForm from "./checkout_form/CheckoutForm";

const Checkout = () => {
  // function sanitizedLineItems(lineItems) {
  //   return lineItems.reduce((data, lineItem) => {
  //     const item = data;
  //     let variantData = null;
  //     if (lineItem.selected_options.length) {
  //       variantData = {
  //         [lineItem.selected_options[0].group_id]:
  //           lineItem.selected_options[0].option_id,
  //       };
  //     }
  //     item[lineItem.id] = {
  //       quantity: lineItem.quantity,
  //       variants: variantData,
  //     };
  //     return item;
  //   }, {});
  // }

  // function handleCaptureCheckout(e) {
  //   e.preventDefault();
  //   const orderData = {
  //     line_items: sanitizedLineItems(cart.line_items),
  //     customer: {
  //       firstname: firstName,
  //       lastname: lastName,
  //       email: email,
  //     },
  //     shipping: {
  //       name: shippingName,
  //       street: shippingStreet,
  //       town_city: shippingCity,
  //       county_state: shippingStateProvince,
  //       postal_zip_code: shippingPostalZipCode,
  //       country: shippingCountry,
  //     },
  //     billing: {
  //       name: shippingName,
  //       street: shippingStreet,
  //       town_city: shippingCity,
  //       county_state: shippingStateProvince,
  //       postal_zip_code: shippingPostalZipCode,
  //       country: shippingCountry,
  //     },
  //     fulfillment: {
  //       shipping_method: shippingOption.id,
  //     },
  //     payment: {
  //       gateway: "test_gateway",
  //       card: {
  //         number: cardNum,
  //         expiry_month: expMonth,
  //         expiry_year: expYear,
  //         cvc: ccv,
  //         postal_zip_code: billingPostalZipcode,
  //       },
  //     },
  //   };
  //   props.onCaptureCheckout(checkoutToken.id, orderData);
  // }

  return (
    <CheckoutProvider>
      <Nav />
      <h1>Checkout</h1>
      <CheckoutForm />
    </CheckoutProvider>
  );
};

export default Checkout;
