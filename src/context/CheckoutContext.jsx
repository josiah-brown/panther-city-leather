import { useCallback } from "react";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  // useRef,
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
  RESET_CHECKOUT_STATE: "RESET_CHECKOUT_STATE",
  RESET_ORDER_DATA: "RESET_ORDER_DATA",
};

export const STEPS = {
  LOADING: "LOADING",
  SHIPPING: "SHIPPING",
  BILLING: "BILLING",
  PAYMENT: "PAYMENT",
  CONFIRM: "CONFIRM",
};

const initialState = {
  checkout_token: {},
  curr_step: STEPS.LOADING,
  confirmed_order: {},
  order_error: {},
  order_data: {
    line_items: [],
    customer: {
      firstname: "",
      lastname: "",
      email: "",
    },
    shipping: {
      name_s: "",
      street_s: "",
      city_s: "",
      state_s: "",
      zip_code_s: "",
      country_s: "",
    },
    billing: {
      name_b: "",
      street_b: "",
      city_b: "",
      state_b: "",
      zip_code_b: "",
      country_b: "",
    },
    fulfillment: {
      shipping_options: [],
      shipping_countries: { US: "United States" },
      shipping_subdivisions: {
        AK: "Alaska",
        AL: "Alabama",
        AR: "Arkansas",
        AS: "American Samoa",
        AZ: "Arizona",
        CA: "California",
        CO: "Colorado",
        CT: "Connecticut",
        DC: "District of Columbia",
        DE: "Delaware",
        FL: "Florida",
        GA: "Georgia",
        GU: "Guam",
        HI: "Hawaii",
        IA: "Iowa",
        ID: "Idaho",
        IL: "Illinois",
        IN: "Indiana",
        KS: "Kansas",
        KY: "Kentucky",
        LA: "Louisiana",
        MA: "Massachusetts",
        MD: "Maryland",
        ME: "Maine",
        MI: "Michigan",
        MN: "Minnesota",
        MO: "Missouri",
        MP: "Northern Mariana Islands",
        MS: "Mississippi",
        MT: "Montana",
        NC: "North Carolina",
        ND: "North Dakota",
        NE: "Nebraska",
        NH: "New Hampshire",
        NJ: "New Jersey",
        NM: "New Mexico",
        NV: "Nevada",
        NY: "New York",
        OH: "Ohio",
        OK: "Oklahoma",
        OR: "Oregon",
        PA: "Pennsylvania",
        PR: "Puerto Rico",
        RI: "Rhode Island",
        SC: "South Carolina",
        SD: "South Dakota",
        TN: "Tennessee",
        TX: "Texas",
        UM: "United States Minor Outlying Islands",
        UT: "Utah",
        VA: "Virginia",
        VI: "Virgin Islands, U.S.",
        VT: "Vermont",
        WA: "Washington",
        WI: "Wisconsin",
        WV: "West Virginia",
        WY: "Wyoming",
      },
      shipping_option: "",
      billing_countries: { US: "United States" },
      billing_states: {
        AK: "Alaska",
        AL: "Alabama",
        AR: "Arkansas",
        AS: "American Samoa",
        AZ: "Arizona",
        CA: "California",
        CO: "Colorado",
        CT: "Connecticut",
        DC: "District of Columbia",
        DE: "Delaware",
        FL: "Florida",
        GA: "Georgia",
        GU: "Guam",
        HI: "Hawaii",
        IA: "Iowa",
        ID: "Idaho",
        IL: "Illinois",
        IN: "Indiana",
        KS: "Kansas",
        KY: "Kentucky",
        LA: "Louisiana",
        MA: "Massachusetts",
        MD: "Maryland",
        ME: "Maine",
        MI: "Michigan",
        MN: "Minnesota",
        MO: "Missouri",
        MP: "Northern Mariana Islands",
        MS: "Mississippi",
        MT: "Montana",
        NC: "North Carolina",
        ND: "North Dakota",
        NE: "Nebraska",
        NH: "New Hampshire",
        NJ: "New Jersey",
        NM: "New Mexico",
        NV: "Nevada",
        NY: "New York",
        OH: "Ohio",
        OK: "Oklahoma",
        OR: "Oregon",
        PA: "Pennsylvania",
        PR: "Puerto Rico",
        RI: "Rhode Island",
        SC: "South Carolina",
        SD: "South Dakota",
        TN: "Tennessee",
        TX: "Texas",
        UM: "United States Minor Outlying Islands",
        UT: "Utah",
        VA: "Virginia",
        VI: "Virgin Islands, U.S.",
        VT: "Vermont",
        WA: "Washington",
        WI: "Wisconsin",
        WV: "West Virginia",
        WY: "Wyoming",
      },
    },
    payment: {
      gateway: "",
      card: {
        number: "",
        expiry_month: "",
        expiry_year: "",
        cvc: "",
        zip_code_p: "",
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

    case ACTIONS.RESET_CHECKOUT_STATE:
      return initialState;

    case ACTIONS.RESET_ORDER_DATA:
      return {
        checkout_token: state.checkout_token,
        ...initialState,
      };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const CheckoutProvider = ({ children }) => {
  const cart = useCartState();
  const [state, dispatch] = useReducer(reducer, initialState);
  // const isMounted = useRef(false);

  const setCheckoutToken = (token) =>
    dispatch({ type: ACTIONS.SET_TOKEN, token });

  const updateOrderInfo = useCallback(
    (keyName, newValue) =>
      dispatch({
        type: ACTIONS.UPDATE_ORDER_INFO,
        payload: { [keyName]: newValue },
      }),
    []
  );

  const resetCheckoutState = useCallback(() => {
    dispatch({
      type: ACTIONS.RESET_CHECKOUT_STATE,
      payload: null,
    });
  }, []);

  const resetOrderData = useCallback(() => {
    dispatch({
      type: ACTIONS.RESET_ORDER_DATA,
      payload: null,
    });
  }, []);

  const generateNewToken = useCallback(() => {
    commerce.checkout
      .generateToken(cart.id, { type: "cart" })
      .then((token) => {
        setCheckoutToken(token);
      })
      .catch((err) => {
        console.log("There was an error in generating a token", err);
      });
  }, [cart]);

  // Anytime the checkout token changes, the shipping countries update
  // useEffect(() => {
  //   if (isMounted.current && state.checkout_token.id) {
  //     console.log("Updating shipping countries...");
  //     commerce.services
  //       .localeListShippingCountries(state.checkout_token.id)
  //       .then((countries_) => {
  //         console.log(countries_);
  //         updateOrderInfo("shipping_countries", countries_.countries);
  //         updateOrderInfo("country_s", "US");
  //       })
  //       .catch((err) => {
  //         console.log(
  //           "There was an error setting the shipping countries.",
  //           err
  //         );
  //       });
  //   } else {
  //     isMounted.current = true;
  //   }
  // }, [state.checkout_token.id, updateOrderInfo]);

  // Update the billing countries on new token generation
  // useEffect(() => {
  //   if (isMounted.current && state.checkout_token.id) {
  //     console.log("Updating billing countries...");
  //     commerce.services
  //       .localeListCountries()
  //       .then((c) => {
  //         updateOrderInfo("billing_countries", c.countries);
  //         updateOrderInfo("country_b", "US");
  //       })
  //       .catch((err) => {
  //         console.error("There was an error getting all countries.", err);
  //       });
  //   }
  // }, [state.checkout_token.id, updateOrderInfo]);

  // Update the shipping subdivisions on shipping country change
  // useEffect(() => {
  //   const country = state.order_data.shipping.country_s;
  //   if (country !== "") {
  //     console.log("Updating shipping states...");
  //     commerce.services
  //       .localeListShippingSubdivisions(state.checkout_token.id, country)
  //       .then((subs_) => {
  //         console.log(subs_);
  //         updateOrderInfo("shipping_subdivisions", subs_.subdivisions);
  //         updateOrderInfo("state_s", Object.keys(subs_.subdivisions)[0]);
  //       })
  //       .catch((err) => {
  //         console.error(
  //           "There was an error fetching the shipping subdivisions",
  //           err
  //         );
  //       });
  //   }
  // }, [
  //   state.order_data.shipping.country_s,
  //   state.checkout_token.id,
  //   updateOrderInfo,
  // ]);

  // Update the billing subdivisions on billing country change
  // useEffect(() => {
  //   let country = state.order_data.billing.country_b;
  //   if (country !== "") {
  //     console.log("Updating billing states...");
  //     commerce.services
  //       .localeListSubdivisions(country)
  //       .then((subs) => {
  //         updateOrderInfo("billing_states", subs.subdivisions);
  //         updateOrderInfo("state_b", Object.keys(subs.subdivisions)[0]);
  //       })
  //       .catch((err) => {
  //         console.error(
  //           "There was an error fetching the billing subdivisions.",
  //           err
  //         );
  //       });
  //   }
  // }, [
  //   state.checkout_token.id,
  //   state.order_data.billing.country_b,
  //   updateOrderInfo,
  // ]);

  // Anytime the shipping subdivisons change, the shipping options update
  useEffect(() => {
    // const province = state.order_data.shipping.state_s;
    if (cart.line_items.length && state.checkout_token.id) {
      commerce.checkout
        .getShippingOptions(state.checkout_token.id, {
          // country: state.order_data.shipping.country_s,
          // region: province,
          country: "US",
          region: "TX",
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
  }, [
    state.checkout_token.id,
    cart.line_items.length,
    // state.order_data.shipping.state_s,
    // state.order_data.shipping.country_s,
  ]);

  // Once the checkout token has loaded, display the checkout form
  // This is a slight gamble that the user will not click through the
  // first page immediately. The fulfillment data on the next page will
  // take around 3-7 seconds to populate.
  useEffect(() => {
    if (state.checkout_token.id !== "") {
      if (state.curr_step === "LOADING") {
        updateOrderInfo("curr_step", STEPS.SHIPPING);
      }
    }
  }, [state.curr_step, state.checkout_token.id, updateOrderInfo]);

  return (
    <CheckoutDispatchContext.Provider
      value={{
        updateOrderInfo,
        resetCheckoutState,
        generateNewToken,
        resetOrderData,
      }}
    >
      <CheckoutStateContext.Provider value={state}>
        {children}
      </CheckoutStateContext.Provider>
    </CheckoutDispatchContext.Provider>
  );
};

export const useCheckoutState = () => useContext(CheckoutStateContext);
export const useCheckoutDispatch = () => useContext(CheckoutDispatchContext);
