import React, { useState } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import MyTextInput from "../../../components/form_components/MyTextInput";
import MySelect from "../../../components/form_components/MySelect";
import MyCheckbox from "../../../components/form_components/MyCheckbox";
import {
  useCheckoutState,
  useCheckoutDispatch,
} from "../../../context/CheckoutContext";
import NextButton from "./checkout_buttons/NextButton";
import BackButton from "./checkout_buttons/BackButton";

const BillingForm = () => {
  const checkout = useCheckoutState();
  const billing = checkout.order_data.billing;
  const { updateOrderInfo } = useCheckoutDispatch();
  const billingCountries = checkout.order_data.fulfillment.billing_countries;
  const billingStates = checkout.order_data.fulfillment.billing_states;
  const [validated, setValidated] = useState(false);

  return (
    <Formik
      initialValues={{
        name_b: billing.name_b,
        street_b: billing.street_b,
        city_b: billing.city_b,
        state_b: billing.state_b,
        zip_code_b: billing.zip_code_b,
        country_b: billing.country_b,
        same_address: false,
      }}
      validationSchema={yup.object({
        name_b: yup.string().when("same_address", {
          is: false,
          then: yup.string().required("Required"),
        }),
        street_b: yup.string().when("same_address", {
          is: false,
          then: yup.string().required("Required"),
        }),
        city_b: yup.string().when("same_address", {
          is: false,
          then: yup.string().required("Required"),
        }),
        state_b: yup.string().when("same_address", {
          is: false,
          then: yup.string().required("Required"),
        }),
        zip_code_b: yup.number().when("same_address", {
          is: false,
          then: yup
            .number()
            .positive()
            .integer()
            .max(99999, "Zip code must be 5 digits long")
            .min(9999, "Zip code must be 5 digits long")
            .required("Required"),
        }),
        country_b: yup.string().when("same_address", {
          is: false,
          then: yup.string().required("Required"),
        }),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const suf = values.same_address ? "s" : "b";
        const vals = suf === "s" ? checkout.order_data.shipping : values;
        setTimeout(() => {
          updateOrderInfo("name_b", vals[`name_${suf}`]);
          updateOrderInfo("street_b", vals[`street_${suf}`]);
          updateOrderInfo("city_b", vals[`city_${suf}`]);
          updateOrderInfo("state_b", vals[`state_${suf}`]);
          updateOrderInfo("zip_code_b", vals[`zip_code_${suf}`]);
          updateOrderInfo("country_b", vals[`country_${suf}`]);
          setValidated(true);
          setSubmitting(false);
        }, 500);
      }}
    >
      {({ values }) => (
        <Form className="checkout_form">
          {/* <button type="button" onClick={() => console.log(checkout.order_data)}>
          GET DATA
        </button> */}

          <MyCheckbox name={"same_address"}>SAME ADDRESS</MyCheckbox>

          {!values.same_address && (
            <MyTextInput
              label="FULL NAME"
              name="name_b"
              type="text"
              placeholder="Billing name..."
            />
          )}

          {!values.same_address && (
            <MyTextInput
              label="STREET"
              name="street_b"
              type="text"
              placeholder="Billing street address..."
            />
          )}

          {!values.same_address && (
            <MyTextInput
              label="CITY"
              name="city_b"
              type="text"
              placeholder="Billing city..."
            />
          )}

          {!values.same_address && (
            <MySelect
              label="COUNTRY"
              name="country_b"
              defaultText={"SELECT COUNTRY"}
              options={billingCountries}
            />
          )}

          {!values.same_address && (
            <MySelect
              label="STATE"
              name="state_b"
              defaultText={"SELECT STATE"}
              options={billingStates}
            />
          )}

          {!values.same_address && (
            <MyTextInput
              label="ZIP CODE"
              name="zip_code_b"
              type="number"
              placeholder="Billing zip code..."
            />
          )}

          <div className="checkout_btn_container">
            <NextButton validForm={validated} />
            <BackButton />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BillingForm;
