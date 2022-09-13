import React, { useState } from "react";
import * as yup from "yup";
import {
  useCheckoutState,
  useCheckoutDispatch,
} from "../../../../context/CheckoutContext";
import NextButton from "../checkout_buttons/NextButton";
import BackButton from "../checkout_buttons/BackButton";
import MyTextInput from "../../../../components/form_components/MyTextInput";
import MySelect from "../../../../components/form_components/MySelect";
import { Form, Formik } from "formik";
import valid from "card-validator";

const PaymentSection = () => {
  const checkout = useCheckoutState();
  const { updateOrderInfo } = useCheckoutDispatch();
  const orderData = checkout.order_data;
  const billingCountries = orderData.fulfillment.billing_countries;
  const billingStates = orderData.fulfillment.billing_states;
  const [validated, setValidated] = useState(false);

  return (
    <Formik
      initialValues={{
        number: "",
        expiry_month: "",
        expiry_year: "",
        cvc: "",
        zip_code_p: "",
      }}
      validationSchema={yup.object({
        number: yup
          .string()
          .test(
            "test-number",
            "Invalid card number",
            (value) => valid.number(value).isValid
          )
          .required("Required"),
        expiry_month: yup
          .string()
          .test(
            "test-exp-month",
            "Invalid expiry month",
            (value) => valid.expirationMonth(value).isValidForThisYear
          )
          .required("Required"),
        expiry_year: yup
          .string()
          .test(
            "test-exp-year",
            "Invalid expiry year",
            (value) => valid.expirationYear(value).isValid
          )
          .required("Required"),
        cvc: yup
          .string()
          .test("test-cvc", "Invalid cvc", (value) => valid.cvv(value).isValid)
          .required("Required"),
        zip_code_p: yup
          .string()
          .test(
            "test-zip-code",
            "Invalid zip code",
            (value) => valid.postalCode(value).isValid
          )
          .required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setTimeout(() => {
          setValidated(true);
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <button type="button" onClick={() => console.log(orderData)}>
          GET DATA
        </button>
      </Form>
    </Formik>
  );
};

export default PaymentSection;

// const getExpiryYears = () => {
//   let year = new Date().getFullYear();
//   let possibleYears = [];
//   for (let i = 0; i < 12; i++) {
//     possibleYears.push(year + i);
//   }
//   return possibleYears;
// };

// const renderPaymentDetails = () => {
//   return null;
// };

// const handleCheckboxChange = (e) => {
//   if (e.target.checked) {
//     setSameAddress(true);
//   } else {
//     setSameAddress(false);
//   }
// };

{
  /* <div className="same_address_container">
        <div className="checkbox_container">
          <input
            type="checkbox"
            value="1"
            id="sameAddressCheckbox"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="sameAddressCheckbox"></label>
        </div>
        <label htmlFor="sameAddressCheckbox">
          Billing address is the same as shipping address
        </label>
      </div> */
}
