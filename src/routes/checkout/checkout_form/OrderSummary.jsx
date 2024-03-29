import React from "react";
import { useCheckoutState } from "../../../context/CheckoutContext";
import { generateId } from "../../../utility_functions";

const OrderSummary = () => {
  const checkout = useCheckoutState();
  const items = checkout.checkout_token.line_items;

  return (
    <div className="summary_container">
      <div className="summary_heading">
        <h2>ORDER SUMMARY</h2>
      </div>
      <div className="shipping_to_wrapper">
        <div className="shipping_to_header">SHIPPING TO...</div>
        <div className="shipping_to_content">
          <p>{checkout.order_data.shipping.name_s}</p>
          <p>{checkout.order_data.shipping.street_s}</p>
          <p>{`${checkout.order_data.shipping.city_s}, ${checkout.order_data.shipping.state_s}, ${checkout.order_data.shipping.country_s}, ${checkout.order_data.shipping.zip_code_s}`}</p>
        </div>
      </div>
      <div className="summary_items">
        {Object.keys(items).map((item) => {
          return (
            <div className="summary_item" key={generateId(10)}>
              <div className="summary_item_image">
                <img
                  src={items[item].image.url}
                  alt={"Item #" + item + " in your cart"}
                />
              </div>
              <div className="summary_item_text">
                <p className="summary_item_name">{items[item].name}</p>
                {Object.keys(items[item].selected_options).map((index) => {
                  return (
                    <p className="summary_item_option" key={generateId(10)}>
                      {items[item].selected_options[index].option_name}
                    </p>
                  );
                })}
                <p className="summary_item_qty">
                  {"QTY: " + items[item].quantity}
                </p>
              </div>
              <div className="summary_item_price">
                {items[item].line_total.formatted_with_symbol}
              </div>
            </div>
          );
        })}
      </div>
      <div className="summary_footer">
        <div className="h-sub">
          FREE SHIPPING
          <span>
            {" "}
            <span> </span>
          </span>{" "}
          -
          <span>
            {" "}
            <span> </span>
          </span>{" "}
          $0.00
        </div>
        <div className="summary_spacer"></div>
        <span>TOTAL: </span>
        <span>{checkout.checkout_token.live.total.formatted_with_symbol}</span>
        <div className="summary_spacer"></div>
      </div>
    </div>
  );
};

export default OrderSummary;
