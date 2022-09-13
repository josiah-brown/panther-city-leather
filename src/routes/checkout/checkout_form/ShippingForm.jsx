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

const ShippingForm = () => {
  const checkout = useCheckoutState();
  const shipping = checkout.order_data.shipping;
  const { updateOrderInfo } = useCheckoutDispatch();
  const shippingCountries = checkout.order_data.fulfillment.shipping_countries;
  const shippingStates = checkout.order_data.fulfillment.shipping_subdivisions;
  const [validated, setValidated] = useState(false);

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
          .max(15, "Must be 15 characters or less")
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
        console.log(values);
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
        {/* <button type="button" onClick={() => console.log(checkout.order_data)}>
          GET DATA
        </button> */}

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
          {/* Add return to cart button here */}
          <NextButton validForm={validated} />
        </div>
      </Form>
    </Formik>
  );
};

export default ShippingForm;
