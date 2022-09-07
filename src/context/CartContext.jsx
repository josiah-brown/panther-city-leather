// This file contains all functionality and state related to the cart

//*========== IMPORT MODULES ==========*//
import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import commerce from "../lib/commerce";

// Initialize context for cart state and cart dispatch function.
// The cart state context obviously stores the state of the cart.
// The dispatch context stores an object containing all functions
// that can be applied to the cart. For example, setCart(), clearCart(), etc.
const CartStateContext = createContext(null);
const CartDispatchContext = createContext(null);

// This object stores all actions that the reducer function uses
const ACTIONS = {
  SET_CART: "SET_CART",
};

// Initial state of the cart
const initialState = {
  total_items: 0,
  total_unique_items: 0,
  line_items: [],
};

// Function called by dispatch().
// Returns the new state.
const reducer = (state, action) => {
  // Apply the action specified by dispatch()
  switch (action.type) {
    case ACTIONS.SET_CART:
      return { ...state, ...action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

// This wrapper will wrap App at the top level.
// Thus, any children have access to the cart state and methods
export const CartProvider = ({ children }) => {
  // The useReducer() hook is similar to useState() but gives more control.
  // The 'state' variable stores the cart object.
  // The 'dispatch' variable is a function that calls the
  // reducer specified upon initialization.
  const [state, dispatch] = useReducer(reducer, initialState);

  // This react method is used to navigate to the cart page after
  // adding an item to the cart.
  const navigate = useNavigate();

  // setCart() takes in a payload (in this case the cart object)
  // and sets the current cart state to that payload.
  const setCart = (payload) => dispatch({ type: ACTIONS.SET_CART, payload });

  // Remove the specified line item from the cart
  const removeFromCart = useCallback((lineItemId) => {
    commerce.cart
      .remove(lineItemId)
      .then((resp) => {
        setCart(resp.cart);
      })
      .catch((err) => {
        console.error(
          "There was an error removing the item from the cart",
          err
        );
      });
  }, []);

  // Empties the cart
  const emptyCart = () => {
    commerce.cart
      .empty()
      .then((resp) => {
        return setCart(resp.cart);
      })
      .catch((err) => {
        console.error("There was an error emptying the cart", err);
      });
  };

  // Refresh the cart state via commerce api
  const refreshCart = () => {
    commerce.cart
      .refresh()
      .then((newCart) => {
        setCart(newCart);
      })
      .catch((err) => {
        console.log("There was an error refreshing your cart", err);
      });
  };

  // Add specified quantity of item to cart and redirect to cart page
  const addToCart = (productId, quantity, variantObject = null) => {
    commerce.cart
      .add(productId, quantity, variantObject)
      .then((resp) => {
        setCart(resp.cart);
        navigate("/cart");
      })
      .catch((err) => {
        console.error("There was an error adding the item to the cart", err);
      });
  };

  // Updates the quantity of the specified item
  const updateCartQty = (lineItemId, quantity) => {
    commerce.cart
      .update(lineItemId, { quantity })
      .then((resp) => {
        setCart(resp.cart);
      })
      .catch((err) => {
        console.log("There was an error updating the cart qty", err);
      });
  };

  //*========== USEEFFECT HOOKS ==========*//
  // getCart() is called once when the component mounts
  useEffect(() => {
    // Retrieves the cart from commercejs api and
    // sets cart to the returned object
    const getCart = async () => {
      try {
        const cart = await commerce.cart.retrieve();
        setCart(cart);
      } catch (err) {
        console.error(err);
      }
    };

    getCart();
  }, []);

  // This is run after the cart has loaded and removes any items from the cart
  // that are no longer valid.
  // i.e. If the merchant changes or removes a product in Chec while
  // it is in a cart
  useEffect(() => {
    state.line_items.forEach((item) => {
      if (item.product_id === null) {
        removeFromCart(item.id);
      }
    });
  }, [state, removeFromCart]);

  // Wrap the children in the cart and dispatch contexts.
  // All children will have access to the values specified by the 'Provider'.
  return (
    <CartDispatchContext.Provider
      value={{
        setCart,
        emptyCart,
        refreshCart,
        addToCart,
        updateCartQty,
        removeFromCart,
      }}
    >
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Export hooks that nicely wrap the context functionality.
// To use the context in a child component, import these variables
// and set equal to local constants.
// i.e. const cartState = useCartState();
export const useCartState = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
