import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import commerce from "../lib/commerce";

// Import the cart state context
// This works because the CheckoutProvider will always be nested inside CartProvider
import { useCartState } from "./CartContext";

const CheckoutStateContext = createContext(null);
const CheckoutDispatchContext = createContext(null);

const ACTIONS = {
  SET_TOKEN: "SET_TOKEN",
  SET_SHIPPING_COUNTRIES: "SET_SHIPPING_COUNTRIES",
  SET_SHIPPING_SUBDIVISIONS: "SET_SHIPPING_SUBDIVISIONS",
  SET_SHIPPING_OPTIONS: "SET_SHIPPING_OPTIONS",
  SET_SHIPPING_OPTION: "SET_SHIPPING_OPTION",
  UPDATE_ORDER_INFO: "UPDATE_ORDER_INFO",
};

export const STEPS = {
  LOADING: "LOADING",
  INFO: "INFO",
  SHIPPING: "SHIPPING",
  PAYMENT: "PAYMENT",
  CONFIRM: "CONFIRM",
};

const initialState = {
  checkout_token: {},
  curr_step: STEPS.LOADING,
  confirmed_order: {},
  order_data: {
    line_items: [],
    customer: {
      firstname: "Bob",
      lastname: "Green",
      email: "bob@gmail.com",
    },
    shipping: {
      name: "Bob Green",
      street: "4390 Timberview Dr",
      town_city: "Fort Worth",
      county_state: "",
      postal_zip_code: "76140",
      country: "",
    },
    billing: {
      name_b: "",
      street_b: "",
      town_city_b: "",
      county_state_b: "",
      postal_zip_code_b: "",
      country_b: "US",
    },
    fulfillment: {
      shipping_options: [],
      shipping_countries: {},
      shipping_subdivisions: {},
      shipping_option: "",
    },
    payment: {
      gateway: "test_gateway",
      card: {
        number: "4242 4242 4242 4242",
        expiry_month: "01",
        expiry_year: "2023",
        ccv: "123",
        postal_zip_code_p: "76140",
      },
    },
  },
};

// Takes in a nested object and a specified key value pair.
// Outputs a nested object with the updated key value pair
const updateObject = (keyName, newVal, object) => {
  const results = {};
  for (var key in object) {
    if (key === keyName) {
      results[key] = newVal;
    } else if (typeof object[key] === "object" && object[key] !== null) {
      results[key] = updateObject(keyName, newVal, object[key]);
    } else {
      results[key] = object[key];
    }
  }
  return results;
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_TOKEN:
      return { ...state, checkout_token: action.token };

    case ACTIONS.SET_SHIPPING_COUNTRIES:
      return {
        ...state,
        order_data: {
          ...state.order_data,
          fulfillment: {
            ...state.order_data.fulfillment,
            shipping_countries: action.countries_.countries,
          },
        },
      };

    case ACTIONS.SET_SHIPPING_SUBDIVISIONS:
      return {
        ...state,
        order_data: {
          ...state.order_data,
          fulfillment: {
            ...state.order_data.fulfillment,
            shipping_subdivisions: action.subs_.subdivisions,
          },
        },
      };

    case ACTIONS.SET_SHIPPING_OPTIONS:
      return {
        ...state,
        order_data: {
          ...state.order_data,
          fulfillment: {
            ...state.order_data.fulfillment,
            shipping_options: action.options,
          },
        },
      };

    case ACTIONS.SET_SHIPPING_OPTION:
      return {
        ...state,
        order_data: {
          ...state.order_data,
          fulfillment: {
            ...state.order_data.fulfillment,
            shipping_option: action.shipOption,
          },
        },
      };

    case ACTIONS.UPDATE_ORDER_INFO:
      return updateObject(
        Object.keys(action.payload)[0],
        Object.values(action.payload)[0],
        state
      );

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const CheckoutProvider = ({ children }) => {
  // Use the global cart context
  const cart = useCartState();
  const [state, dispatch] = useReducer(reducer, initialState);
  const isMounted = useRef(false);

  const setCheckoutToken = (token) =>
    dispatch({ type: ACTIONS.SET_TOKEN, token });

  const updateOrderInfo = (keyName, newValue) =>
    dispatch({
      type: ACTIONS.UPDATE_ORDER_INFO,
      payload: { [keyName]: newValue },
    });

  // Effect applied on mount and cart change
  useEffect(() => {
    if (cart) {
      if (cart.id && cart.line_items.length) {
        commerce.checkout
          .generateToken(cart.id, { type: "cart" })
          .then((token) => {
            setCheckoutToken(token);
          })
          .catch((error) => {
            console.log("There was an error in generating a token", error);
          });
      }
    }
  }, [cart]);

  // Anytime the checkout token changes, the shipping countries update
  useEffect(() => {
    if (isMounted.current) {
      let countries = {};
      commerce.services
        .localeListShippingCountries(state.checkout_token.id)
        .then((c) => {
          countries = c;
          return countries;
        })
        .then((countries_) => {
          dispatch({
            type: ACTIONS.SET_SHIPPING_COUNTRIES,
            countries_,
          });
          updateOrderInfo("country", Object.keys(countries_.countries)[0]);
        })
        .catch((err) => {
          console.log(
            "There was an error setting the shipping countries.",
            err
          );
        });
    } else {
      isMounted.current = true;
    }
  }, [state.checkout_token.id]);

  // Anytime the countries change, the shipping subdivisions update
  useEffect(() => {
    const country = state.order_data.shipping.country;
    if (country !== "") {
      commerce.services
        .localeListShippingSubdivisions(state.checkout_token.id, country)
        .then((subs_) => {
          dispatch({ type: ACTIONS.SET_SHIPPING_SUBDIVISIONS, subs_ });
          updateOrderInfo("county_state", Object.keys(subs_.subdivisions)[0]);
        })
        .catch((err) => {
          console.log("There was an error fetching the subdivisions", err);
        });
    }
  }, [state.order_data.shipping.country, state.checkout_token.id]);

  // Anytime the subdivisons change, the shipping options update
  useEffect(() => {
    const province = state.order_data.shipping.county_state;
    if (province !== "") {
      commerce.checkout
        .getShippingOptions(state.checkout_token.id, {
          country: state.order_data.shipping.country,
          region: province,
        })
        .then((options) => {
          const shipOption = options[0] || null;
          dispatch({ type: ACTIONS.SET_SHIPPING_OPTIONS, options });
          dispatch({ type: ACTIONS.SET_SHIPPING_OPTION, shipOption });
        })
        .catch((err) => {
          console.log("There was an error fetching the shipping methods", err);
        });
    }
    // eslint-disable-next-line
  }, [state.checkout_token.id, state.order_data.shipping.county_state]);

  // Once the checkout token has loaded, display the checkout form
  // This is a slight gamble that the user will not click through the
  // first page immediately. The fulfillment data on the next page will
  // take around 3-7 seconds to populate.
  useEffect(() => {
    if (state.checkout_token.id !== "") {
      if (state.curr_step === "LOADING") {
        updateOrderInfo("curr_step", STEPS.INFO);
      }
    }
  }, [state.curr_step, state.checkout_token.id]);

  return (
    <CheckoutDispatchContext.Provider value={{ updateOrderInfo }}>
      <CheckoutStateContext.Provider value={state}>
        {children}
      </CheckoutStateContext.Provider>
    </CheckoutDispatchContext.Provider>
  );
};

export const useCheckoutState = () => useContext(CheckoutStateContext);
export const useCheckoutDispatch = () => useContext(CheckoutDispatchContext);
