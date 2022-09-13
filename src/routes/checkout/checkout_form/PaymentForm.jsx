import React from "react";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCheckoutState } from "../../../context/CheckoutContext";
import BackButton from "./checkout_buttons/BackButton";
import commerce from "../../../lib/commerce";
import { useState } from "react";
import { useCheckoutDispatch } from "../../../context/CheckoutContext";
import { useCartDispatch } from "../../../context/CartContext";

const stripePromise = loadStripe(
  "pk_test_51LhCgJDAXaCkD2WYhTIjCSmcKrgYfchLHtub45RRSiBSsiRJqekdzhnach1wKhuOEXC3Fa0P2yO3LJcNgJeXxd1300rKEpiPeh"
);

const PaymentForm = () => {
  const checkout = useCheckoutState();
  const { updateOrderInfo } = useCheckoutDispatch();
  const { refreshCart } = useCartDispatch();

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log("Error here");
      return;
    }

    console.log(stripe, elements);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkout.checkout_token.live.line_items,
        customer: {
          firstname: checkout.order_data.shipping.name_s.split(" ")[0],
          lastname: checkout.order_data.shipping.name_s.split(" ")[1],
          email: "josiah.webdev@gmail.com",
        },
        shipping: {
          name: checkout.order_data.shipping.name_s,
          street: checkout.order_data.shipping.street_s,
          town_city: checkout.order_data.shipping.city_s,
          county_state: checkout.order_data.shipping.state_s,
          postal_zip_code: String(checkout.order_data.shipping.zip_code_s),
          country: checkout.order_data.shipping.country_s,
        },
        billing: {
          name: checkout.order_data.shipping.name_s,
          street: checkout.order_data.shipping.street_s,
          town_city: checkout.order_data.shipping.city_s,
          county_state: checkout.order_data.shipping.state_s,
          postal_zip_code: String(checkout.order_data.shipping.zip_code_s),
          country: checkout.order_data.shipping.country_s,
        },
        fulfillment: {
          shipping_method: checkout.order_data.fulfillment.shipping_option.id,
        },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      console.log(orderData);
      console.log(paymentMethod);

      onCaptureCheckout(checkout.checkout_token.id, orderData);
    }
  };

  const onCaptureCheckout = async (tokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(tokenId, newOrder);
      console.log(incomingOrder);
      updateOrderInfo("confirmed_order", incomingOrder);
      refreshCart();
      window.sessionStorage.setItem(
        "order_receipt",
        JSON.stringify(incomingOrder)
      );
      updateOrderInfo("curr_step", "CONFIRM");
    } catch (err) {
      console.error("There was an error capturing checkout.", err);
    }
  };

  return (
    <React.Fragment>
      <h1>HELLO</h1>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => {
            return (
              <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                <CardElement />
                <br />
                <br />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <BackButton />
                  <button type="submit" disabled={!stripe}>
                    Pay{" "}
                    {
                      checkout.checkout_token.live.subtotal
                        .formatted_with_symbol
                    }
                  </button>
                </div>
              </form>
            );
          }}
        </ElementsConsumer>
      </Elements>
    </React.Fragment>
  );
};

export default PaymentForm;
