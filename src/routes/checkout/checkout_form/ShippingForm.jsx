import React, { useState } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import MyTextInput from "../../../components/form_components/MyTextInput";
import MySelect from "../../../components/form_components/MySelect";
import {
  useCheckoutState,
  useCheckoutDispatch,
} from "../../../context/CheckoutContext";
import NextButton from "./checkout_buttons/NextButton";
import { useNavigate } from "react-router-dom";

const ShippingForm = () => {
  const checkout = useCheckoutState();
  const { updateOrderInfo } = useCheckoutDispatch();
  const shipping = checkout.order_data.shipping;
  const shippingCountries = checkout.order_data.fulfillment.shipping_countries;
  const shippingStates = checkout.order_data.fulfillment.shipping_subdivisions;
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const backToCart = () => {
    navigate("/cart");
  };

  return (
    <Formik
      initialValues={{
        name_s: shipping.name_s,
        street_s: shipping.street_s,
        city_s: shipping.city_s,
        state_s: shipping.state_s,
        zip_code_s: shipping.zip_code_s,
        country_s: shipping.country_s,
      }}
      validationSchema={yup.object({
        name_s: yup
          .string()
          .max(40, "Must be 40 characters or less")
          .matches(
            /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
            "Name can only contain Latin letters."
          )
          .matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, "Please enter your full name.")
          .required("Required"),
        street_s: yup.string().required("Required"),
        city_s: yup
          .string()
          .max(25, "Must be 25 characters or less")
          .required("Required"),
        state_s: yup.string().required("Required"),
        zip_code_s: yup
          .number()
          .positive()
          .integer()
          .max(99999, "Zip code must be 5 digits long")
          .min(9999, "Zip code must be 5 digits long")
          .required("Required"),
        country_s: yup.string().required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          updateOrderInfo("name_s", values.name_s);
          updateOrderInfo("street_s", values.street_s);
          updateOrderInfo("city_s", values.city_s);
          updateOrderInfo("state_s", values.state_s);
          updateOrderInfo("zip_code_s", values.zip_code_s);
          updateOrderInfo("country_s", values.country_s);
          setValidated(true);
          setSubmitting(false);
        }, 500);
      }}
    >
      <Form className="checkout_form">
        <h2 className="checkout_general_heading">SHIPPING INFO</h2>

        <MyTextInput
          label="FULL NAME"
          name="name_s"
          type="text"
          placeholder="Shipping name..."
        />

        <MyTextInput
          label="STREET"
          name="street_s"
          type="text"
          placeholder="Shipping street address..."
        />

        <MyTextInput
          label="CITY"
          name="city_s"
          type="text"
          placeholder="Shipping city..."
        />

        <MySelect
          label="COUNTRY"
          name="country_s"
          defaultText={"SELECT COUNTRY"}
          options={shippingCountries}
        />

        <MySelect
          label="STATE"
          name="state_s"
          defaultText={"SELECT STATE"}
          options={shippingStates}
        />

        <MyTextInput
          label="ZIP CODE"
          name="zip_code_s"
          type="number"
          placeholder="Shipping zip code..."
        />

        <div className="checkout_btn_container">
          <NextButton validForm={validated} />
          <button
            type="button"
            className="checkout_nav_btn checkout_light_btn"
            onClick={backToCart}
          >
            BACK TO CART
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default ShippingForm;
