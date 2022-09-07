//*========== IMPORT MODULES ==========*//
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

//*========== IMPORT CONTEXT ==========*//
import { ProductsProvider } from "./context/ProductsContext";
import { CartProvider } from "./context/CartContext";
import { CheckoutProvider } from "./context/CheckoutContext";

//*========== IMPORT COMPONENTS ==========*//
import App from "./App";

//*========== IMPORT STYLES ==========*//
import "./index.css";

// Create the root element and render entire app inside
// App is wrapped so that it has access to routes,
// along with product, cart, and checkout states.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ProductsProvider>
      <CartProvider>
        <CheckoutProvider>
          <App />
        </CheckoutProvider>
      </CartProvider>
    </ProductsProvider>
  </BrowserRouter>
);
