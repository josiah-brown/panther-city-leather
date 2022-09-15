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
import { useCheckoutDispatch } from "../../../context/CheckoutContext";
import { useCartDispatch } from "../../../context/CartContext";
import OrderSummary from "./OrderSummary";
import STRIPE from "../../../assets/stripe_banner.svg";
import AMEX from "../../../assets/amex.jpg";
import DISCOVER from "../../../assets/discover.svg";
import VISA from "../../../assets/visa.png";
import MASTERCARD from "../../../assets/mc.svg";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../../../components/loader/Loader";

const stripePromise = loadStripe(
  String(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
);

const PaymentForm = () => {
  const checkout = useCheckoutState();
  const { updateOrderInfo } = useCheckoutDispatch();
  const { refreshCart } = useCartDispatch();
  const [email, setEmail] = useState(checkout.order_data.customer.email);
  const [confirmEmail, setConfirmEmail] = useState(
    checkout.order_data.customer.email
  );
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const resetErrorMessage = () => {
    setErrorMessage("");
  };

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();

    setSubmitting(true);

    if (!stripe || !elements) {
      console.log("Error here", stripe, elements);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
      switch (error.type) {
        case "validation_error":
          setSubmitting(false);
          setErrorMessage(error.message);
          break;
        case "insufficient_funds":
          setSubmitting(false);
          setErrorMessage(error.message);
          break;

        default:
          console.error("There was an unknown error during checkout.", error);
          break;
      }
    } else {
      const orderData = {
        line_items: checkout.checkout_token.live.line_items,
        customer: {
          firstname: checkout.order_data.billing.name_b.split(" ")[0],
          lastname: checkout.order_data.billing.name_b.split(" ")[1],
          email: checkout.order_data.customer.email,
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
          name: checkout.order_data.billing.name_b,
          street: checkout.order_data.billing.street_b,
          town_city: checkout.order_data.billing.city_b,
          county_state: checkout.order_data.billing.state_b,
          postal_zip_code: String(checkout.order_data.billing.zip_code_b),
          country: checkout.order_data.billing.country_b,
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

      onCaptureCheckout(checkout.checkout_token.id, orderData);
    }
  };

  const onCaptureCheckout = async (tokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(tokenId, newOrder);
      updateOrderInfo("confirmed_order", incomingOrder);
      refreshCart();
      updateOrderInfo("curr_step", "CONFIRM");
    } catch (err) {
      console.error("There was an error capturing checkout.", err);
      updateOrderInfo("order_error", err);
      updateOrderInfo("curr_step", "ERROR");
    }
  };

  useEffect(() => {
    if (email !== "") {
      updateOrderInfo("email", email);
    }
  }, [email, updateOrderInfo]);

  return (
    <React.Fragment>
      {submitting && <Loader />}
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => {
            return (
              <form
                onSubmit={(e) => handleSubmit(e, elements, stripe)}
                className="checkout_form"
              >
                <OrderSummary />
                <div className="card_container">
                  <h2 className="payment_heading">PAYMENT</h2>
                  <label className="payment_label">EMAIL</label>
                  <input
                    required
                    placeholder="Email (to send receipt)"
                    className="payment_email"
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="payment_label">CONFIRM EMAIL</label>
                  <input
                    required
                    placeholder="Confirm email"
                    className="payment_email"
                    value={confirmEmail}
                    type="email"
                    onChange={(e) => setConfirmEmail(e.target.value)}
                  />
                  <label className="payment_label">CARD INFO</label>
                  <div
                    className="payment_card_container"
                    onClick={resetErrorMessage}
                  >
                    <CardElement onFocus={resetErrorMessage} />
                    {errorMessage && (
                      <div className="error">{errorMessage}</div>
                    )}
                  </div>
                  <div className="payment_logos">
                    <img
                      src={STRIPE}
                      className="stripe_logo"
                      alt="Stripe Logo"
                    />
                    <div className="card_logos">
                      <img src={VISA} className="card_logo" alt="Visa Logo" />
                      <img
                        src={MASTERCARD}
                        className="card_logo"
                        alt="Mastercard Logo"
                      />
                      <img
                        src={DISCOVER}
                        className="card_logo"
                        alt="Discover Logo"
                      />
                      <img
                        src={AMEX}
                        className="card_logo"
                        alt="American Express Logo"
                      />
                    </div>
                  </div>
                </div>

                <div className="checkout_btn_container">
                  <button
                    type="submit"
                    disabled={!stripe}
                    className="checkout_nav_btn checkout_dark_btn"
                  >
                    Pay{" "}
                    {
                      checkout.checkout_token.live.subtotal
                        .formatted_with_symbol
                    }
                  </button>
                  <BackButton />
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
