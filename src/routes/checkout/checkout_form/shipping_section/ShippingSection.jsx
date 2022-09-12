import React from "react";
import * as yup from "yup";
import {
  useCheckoutState,
  useCheckoutDispatch,
} from "../../../../context/CheckoutContext";
import NextButton from "../checkout_buttons/NextButton";
import BackButton from "../checkout_buttons/BackButton";
import MyTextInput from "../../../../components/form_components/MyTextInput";
import MySelect from "../../../../components/form_components/MySelect";
import MyCheckbox from "../../../../components/form_components/MyCheckbox";
import { Form, Formik } from "formik";
import { useState } from "react";

const ShippingSection = () => {
  const checkout = useCheckoutState();
  const { updateOrderInfo } = useCheckoutDispatch();
  const orderData = checkout.order_data;
  const shippingCountries = checkout.order_data.fulfillment.shipping_countries;
  const shippingStates = checkout.order_data.fulfillment.shipping_subdivisions;
  const billingCountries = orderData.fulfillment.billing_countries;
  const billingStates = orderData.fulfillment.billing_states;
  const [validated, setValidated] = useState(false);

  return (
    <Formik
      initialValues={{
        name_s: "",
        street_s: "",
        city_s: "",
        state_s: "",
        zip_code_s: "",
        country_s: "",
        same_address_box: false,
        name_b: "",
        street_b: "",
        city_b: "",
        state_b: "",
        zip_code_b: "",
        country_b: "",
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
        name_b: yup.string().when("same_address_box", {
          is: false,
          then: yup.string().required("Required"),
        }),
        street_b: yup.string().when("same_address_box", {
          is: false,
          then: yup.string().required("Required"),
        }),
        city_b: yup.string().when("same_address_box", {
          is: false,
          then: yup.string().required("Required"),
        }),
        state_b: yup.string().when("same_address_box", {
          is: false,
          then: yup.string().required("Required"),
        }),
        zip_code_b: yup.number().when("same_address_box", {
          is: false,
          then: yup
            .number()
            .positive()
            .integer()
            .max(99999, "Zip code must be 5 digits long")
            .min(9999, "Zip code must be 5 digits long")
            .required("Required"),
        }),

        country_b: yup.string().when("same_address_box", {
          is: false,
          then: yup.string().required("Required"),
        }),
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
          if (values.same_address_box) {
            updateOrderInfo("name_b", values.name_s);
            updateOrderInfo("street_b", values.street_s);
            updateOrderInfo("city_b", values.city_s);
            updateOrderInfo("state_b", values.state_s);
            updateOrderInfo("zip_code_b", values.zip_code_s);
            updateOrderInfo("country_b", values.country_s);
          } else {
            updateOrderInfo("name_b", values.name_b);
            updateOrderInfo("street_b", values.street_b);
            updateOrderInfo("city_b", values.city_b);
            updateOrderInfo("state_b", values.state_b);
            updateOrderInfo("zip_code_b", values.zip_code_b);
            updateOrderInfo("country_b", values.country_b);
          }

          setValidated(true);
          setSubmitting(false);
        }, 500);
      }}
    >
      {({ values }) => (
        <Form>
          <button
            type="button"
            onClick={() => console.log(checkout.order_data)}
          >
            GET DATA
          </button>

          <section id="shipping-form-container">
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
          </section>

          <h1>==========</h1>

          <section id="billing-address-section">
            <MyCheckbox name={"same_address_box"}>Same Address</MyCheckbox>
            {`${values.same_address_box}` !== "true" ? (
              <div id="hide-address-container">
                <MyTextInput
                  label="FULL NAME"
                  name="name_b"
                  type="text"
                  placeholder="Billing name..."
                />

                <MyTextInput
                  label="STREET"
                  name="street_b"
                  type="text"
                  placeholder="Billing street address..."
                />

                <MyTextInput
                  label="CITY"
                  name="city_b"
                  type="text"
                  placeholder="Billing city..."
                />

                <MySelect
                  label="COUNTRY"
                  name="country_b"
                  defaultText={"SELECT COUNTRY"}
                  options={billingCountries}
                />

                <MySelect
                  label="STATE"
                  name="state_b"
                  defaultText={"SELECT STATE"}
                  options={billingStates}
                />

                <MyTextInput
                  label="ZIP CODE"
                  name="zip_code_b"
                  type="number"
                  placeholder="Billing zip code..."
                />
              </div>
            ) : (
              <h1>NOTHING HERE</h1>
            )}
          </section>

          <NextButton validForm={validated} />
          <BackButton />
        </Form>
      )}
    </Formik>
  );
};

export default ShippingSection;
