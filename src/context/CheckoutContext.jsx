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

const STEPS = {
  LOADING: "LOADING",
  INFO: "INFO",
  SHIPPING: "SHIPPING",
  PAYMENT: "PAYMENT",
};

const initialState = {
  checkout_token: {},
  curr_step: STEPS.LOADING,
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
      county_state: "TX",
      postal_zip_code: "76140",
      country: "US",
    },
    billing: {
      name: "Bob Green",
      street: "4390 Timberview Dr",
      town_city: "Fort Worth",
      county_state: "TX",
      postal_zip_code: "76140",
      country: "US",
    },
    fulfillment: {
      shipping_options: [],
      shipping_countries: {},
      shipping_subdivisions: {},
      shipping_method: "shippingOption.id",
    },
    payment: {
      gateway: "test_gateway",
      card: {
        number: "4242 4242 4242 4242",
        expiry_month: "11",
        expiry_year: "2023",
        cvc: "123",
        postal_zip_code: "76140",
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
      console.log("Setting token");
      return { ...state, checkout_token: action.token };

    case ACTIONS.SET_SHIPPING_COUNTRIES:
      console.log("Setting countries");
      return {
        ...state,
        order_data: {
          ...state.order_data,
          fulfillment: {
            ...state.order_data.fulfillment,
            shipping_countries: action.countries.countries,
          },
        },
      };

    case ACTIONS.SET_SHIPPING_SUBDIVISIONS:
      console.log("Setting subs");
      return {
        ...state,
        order_data: {
          ...state.order_data,
          fulfillment: {
            ...state.order_data.fulfillment,
            shipping_subdivisions: action.subdivisions.subdivisions,
          },
        },
      };

    case ACTIONS.SET_SHIPPING_OPTIONS:
      console.log("Setting Options");
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
      console.log("Setting Option");
      return {
        ...state,
        order_data: {
          ...state.order_data,
          fulfillment: {
            ...state.order_data.fulfillment,
            shipping_options: action.shipOption,
          },
        },
      };

    case ACTIONS.UPDATE_ORDER_INFO:
      console.log("Updating an order variable");
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

  const setShippingCountries = (token) => {
    commerce.services
      .localeListShippingCountries(token.id)
      .then((countries) => {
        dispatch({
          type: ACTIONS.SET_SHIPPING_COUNTRIES,
          countries,
        });
      })
      .catch((err) => {
        console.log("There was an error setting the shipping countries.", err);
      });
  };

  const setSubdivisions = (countryCode) => {
    commerce.services
      .localeListSubdivisions(countryCode)
      .then((subdivisions) => {
        dispatch({ type: ACTIONS.SET_SHIPPING_SUBDIVISIONS, subdivisions });
      })
      .catch((error) => {
        console.log("There was an error fetching the subdivisions", error);
      });
  };

  const setShippingOptions = (country, stateProvince = null) => {
    const token = state.checkout_token;
    commerce.checkout
      .getShippingOptions(token.id, {
        country: country,
        region: stateProvince,
      })
      .then((options) => {
        const shipOption = options[0] || null;
        dispatch({ type: ACTIONS.SET_SHIPPING_OPTIONS, options });
        dispatch({ type: ACTIONS.SET_SHIPPING_OPTION, shipOption });
      })
      .catch((error) => {
        console.log("There was an error fetching the shipping methods", error);
      });
  };

  const updateOrderInfo = (keyName, newValue) =>
    dispatch({
      type: ACTIONS.UPDATE_ORDER_INFO,
      payload: { [keyName]: newValue },
    });

  // Effect applied on mount and cart change
  useEffect(() => {
    if (cart) {
      if (cart.id) {
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

  // Effect only applied after mount and after token has loaded
  useEffect(() => {
    if (isMounted.current) {
      const token = state.checkout_token;
      if (token !== {} && token) {
        setShippingCountries(token);
        setSubdivisions("US");
        setShippingOptions("US");
        updateOrderInfo("curr_step", STEPS.INFO);
      }
    } else {
      isMounted.current = true;
    }
  }, [state.checkout_token.id]);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const token = state.checkout_token;
  //     if (token !== {} && token) {
  //     }
  //   }
  // }, [state.order_data.shipping_countries]);

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
