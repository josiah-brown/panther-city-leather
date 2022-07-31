// I commented 'CartContext.jsx' much more thoroughly.
// If this file is confusing, reference those comments as
// the 2 files are essentially the same.

// Import react modules
import { createContext, useReducer, useContext, useEffect } from "react";

// Import commerce.js
import commerce from "../lib/commerce";

// Initialize context for products state and dispatch
const ProductsStateContext = createContext(null);
const ProductsDispatchContext = createContext(null);

// Create 'ACTIONS' object to store action name
const ACTIONS = {
  SET_PRODUCTS: "SET_PRODUCTS",
};

// Init default products state
const initialState = { data: {}, loading: true };

// Reducer function called by dispatch(). Each case returns the new products state.
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_PRODUCTS:
      return { ...state, data: action.payload, loading: false };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

// Wrapper component that provides access to context
export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // getProducts() called on component mount
  useEffect(() => {
    const getProducts = async () => {
      try {
        const resp = await commerce.products.list();
        setProducts(resp.data);
        // console.log("Products updated successfully.");
      } catch (err) {
        console.log("There was an error fetching the products", err);
      }
    };

    getProducts();
  }, []);

  // Set the products state to the payload
  const setProducts = (payload) =>
    dispatch({ type: ACTIONS.SET_PRODUCTS, payload });

  // Return the children wrapped in the new context providers
  return (
    <ProductsDispatchContext.Provider value={{ setProducts }}>
      <ProductsStateContext.Provider value={state}>
        {children}
      </ProductsStateContext.Provider>
    </ProductsDispatchContext.Provider>
  );
};

// Export useHooks for convenience
export const useProductsState = () => useContext(ProductsStateContext);
export const useProductsDispatch = () => useContext(ProductsDispatchContext);
