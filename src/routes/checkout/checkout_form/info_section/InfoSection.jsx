import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  useCheckoutState,
  useCheckoutDispatch,
} from "../../../../context/CheckoutContext";
import NextButton from "../checkout_buttons/NextButton";
import MyTextInput from "../../../../components/form_components/MyTextInput";
import { useState } from "react";

const InfoSection = () => {
  const checkout = useCheckoutState();
  const { updateOrderInfo } = useCheckoutDispatch();
  const [validated, setValidated] = useState(false);

  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
      }}
      validationSchema={Yup.object({
        firstname: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        lastname: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setTimeout(() => {
          updateOrderInfo("firstname", values.firstname);
          updateOrderInfo("lastname", values.lastname);
          updateOrderInfo("email", values.email);
          setValidated(true);
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <button type="button" onClick={() => console.log(checkout.order_data)}>
          GET DATA
        </button>

        <MyTextInput
          label="FIRST NAME"
          name="firstname"
          type="text"
          placeholder="First name..."
        />

        <MyTextInput
          label="LAST NAME"
          name="lastname"
          type="text"
          placeholder="Last name..."
        />

        <MyTextInput
          label="EMAIL"
          name="email"
          type="email"
          placeholder="Email address..."
        />

        <NextButton validForm={validated} />
      </Form>
    </Formik>
  );
};

export default InfoSection;
