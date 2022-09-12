import React from "react";
import { useCartState, useCartDispatch } from "../../../../context/CartContext";
import {
  useCheckoutState,
  useCheckoutDispatch,
} from "../../../../context/CheckoutContext";
import commerce from "../../../../lib/commerce";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../../../../components/loader/Loader";

const ConfirmSection = () => {
  const cart = useCartState();
  const checkout = useCheckoutState();
  const { refreshCart } = useCartDispatch();
  const { updateOrderInfo } = useCheckoutDispatch();
  const data = checkout.order_data;
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);

  function handleConfirmClick(e) {
    e.preventDefault();
    setSubmitLoading(true);
    const orderData = {
      line_items: sanitizedLineItems(cart.line_items),
      customer: {
        firstname: data.customer.firstname,
        lastname: data.customer.lastname,
        email: data.customer.email,
      },
      shipping: {
        name: data.shipping.name_s,
        street: data.shipping.street_s,
        town_city: data.shipping.city_s,
        county_state: data.shipping.state_s,
        postal_zip_code: data.shipping.zip_code_s,
        country: data.shipping.country_s,
      },
      billing: {
        name: data.billing.name_b,
        street: data.billing.street_b,
        town_city: data.billing.city_b,
        county_state: data.billing.state_b,
        postal_zip_code: data.billing.zip_code_b,
        country: data.billing.country_b,
      },
      fulfillment: {
        shipping_method: data.fulfillment.shipping_option,
      },
      payment: {
        gateway: "test_gateway",
        card: {
          number: data.payment.card.number,
          expiry_month: data.payment.card.expiry_month,
          expiry_year: data.payment.card.expiry_year,
          cvc: data.payment.card.ccv,
          postal_zip_code: data.payment.card.zip_code_p,
        },
      },
    };
    onCaptureCheckout(checkout.checkout_token.id, orderData);
  }

  function sanitizedLineItems(lineItems) {
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
  }

  const onCaptureCheckout = (checkoutTokenId, newOrder) => {
    commerce.checkout
      .capture(checkoutTokenId, newOrder)
      .then((order) => {
        // Save the confirmed order to checkout state
        updateOrderInfo("confirmed_order", { ...order });
        // Clear the cart
        refreshCart();
        // Store the order in session storage so we can show it again if the
        // user refreshes the page
        window.sessionStorage.setItem("order_receipt", JSON.stringify(order));
      })
      .catch((error) => {
        console.log("There was an error confirming your order", error);
      });
  };

  useEffect(() => {
    if (
      checkout.confirmed_order &&
      Object.keys(checkout.confirmed_order).length !== 0
    ) {
      setSubmitLoading(false);
      navigate("/confirmation");
    }
    // eslint-disable-next-line
  }, [checkout.confirmed_order]);

  return (
    <React.Fragment>
      {submitLoading ? <Loader /> : null}
      <button onClick={handleConfirmClick}>CONFIRM ORDER</button>
    </React.Fragment>
  );
};

export default ConfirmSection;
