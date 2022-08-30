//*========== GENERAL IMPORTS ==========*//
import React from "react";

// import React, { useState } from "react";
// import { Routes, Route, useNavigate } from "react-router-dom";
// import commerce from "./lib/commerce";
// import { useCartDispatch } from "./context/CartContext";
// import { CheckoutProvider } from "./context/CheckoutContext";

//*========== IMPORT ROUTES ==========*//
// import Home from "./routes/home/Home";
// import About from "./routes/about/About";
// import Products from "./routes/products/Products";
// import Product from "./routes/product/Product";
// import Cart from "./routes/cart/Cart";
// import Checkout from "./routes/checkout/Checkout";
// import Confirmation from "./routes/confirmation/Confirmation";
// import Contact from "./routes/contact/Contact";
// import ContactConfirmation from "./routes/contact_confirmation/ContactConfirmation";

//*========== TOP LEVEL APP COMPONENT ==========*//
// This is the parent component of the entire app.
// Everything else will flow downward from here.
const App = () => {
  // Initialize context variables
  // const { refreshCart } = useCartDispatch();

  // // Initialize state variables
  // const [order, setOrder] = useState({});
  // const navigate = useNavigate();

  // const handleCaptureCheckout = (checkoutTokenId, newOrder) => {
  //   commerce.checkout
  //     .capture(checkoutTokenId, newOrder)
  //     .then((order) => {
  //       // Save the order into state
  //       setOrder(order);
  //       // Clear the cart
  //       refreshCart();
  //       // Send the user to the receipt
  //       navigate("/confirmation");
  //       // Store the order in session storage so we can show it again if the
  //       // user refreshes the page
  //       window.sessionStorage.setItem("order_receipt", JSON.stringify(order));
  //     })
  //     .catch((error) => {
  //       console.log("There was an error confirming your order", error);
  //     });
  // };

  return (
    <div className="app-wrapper">
      <h1>Hello World</h1>
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route
          path="checkout/:id"
          element={<Checkout onCaptureCheckout={handleCaptureCheckout} />}
        />
        <Route
          path="confirmation"
          element={
            <Confirmation
              order={order}
              onBackToHome={() =>
                window.localStorage.removeItem("order_receipt")
              }
            />
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact/confirmation" element={<ContactConfirmation />} />
      </Routes> */}
    </div>
  );
};

export default App;
