// Import react modules
import { useState } from "react";
import { createContext, useContext, useEffect } from "react";

// Import commerce.js
import commerce from "../lib/commerce";

// Initialize context for products state and dispatch
const ProductsStateContext = createContext(null);

// Init default products state
const initialState = { data: {}, loading: true };

// Wrapper component that provides access to context
export const ProductsProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  // getProducts() called on component mount
  useEffect(() => {
    const getProducts = async () => {
      try {
        const resp = await commerce.products.list();
        setState((prevState) => ({
          ...prevState,
          data: resp.data,
          loading: false,
        }));
      } catch (err) {
        console.log("There was an error fetching the products", err);
      }
    };

    getProducts();
  }, []);

  // Return the children wrapped in the new context provider
  return (
    <ProductsStateContext.Provider value={state}>
      {children}
    </ProductsStateContext.Provider>
  );
};

// Export useHooks for convenience
export const useProductsState = () => useContext(ProductsStateContext);
