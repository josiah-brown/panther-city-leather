import { useField } from "formik";
import React from "react";
import { useEffect } from "react";
import { useCheckoutDispatch } from "../../context/CheckoutContext";

const MySelect = ({ options, defaultText, label, ...props }) => {
  const [field, meta] = useField(props);
  const { updateOrderInfo } = useCheckoutDispatch();

  useEffect(() => {
    if (field.value !== "" && field.value !== defaultText) {
      updateOrderInfo(field.name, field.value);
    }
  }, [field.value, field.name, defaultText, updateOrderInfo]);

  return (
    <div className="checkout_form_select form_element">
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props}>
        <option>{defaultText}</option>
        {Object.keys(options).map((o, index) => {
          return (
            <option value={o} key={o}>
              {options[o]}
            </option>
          );
        })}
      </select>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MySelect;
