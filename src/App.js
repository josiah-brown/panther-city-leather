//*========== IMPORT MODULES ==========*//
import React from "react";
import { Routes, Route } from "react-router-dom";

//*========== IMPORT ROUTES ==========*//
import Home from "./routes/home/Home";
import About from "./routes/about/About";
import Products from "./routes/products/Products";
import Product from "./routes/product/Product";
import Cart from "./routes/cart/Cart";
import Checkout from "./routes/checkout/Checkout";
import Confirmation from "./routes/confirmation/Confirmation";
import Contact from "./routes/contact/Contact";
import ContactConfirmation from "./routes/contact_confirmation/ContactConfirmation";
import FutureSocial from "./routes/future_social/FutureSocial";

//*========== TOP LEVEL APP COMPONENT ==========*//
// This is the parent component of the entire app.
// It should only contain Route elements.
// No routes should have props as context will store
// all necessary states.
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:id" element={<Product />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout/:id" element={<Checkout />} />
      <Route path="confirmation" element={<Confirmation />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/contact/confirmation" element={<ContactConfirmation />} />
      <Route path="/social/empty" element={<FutureSocial />} />
    </Routes>
  );
};

export default App;
