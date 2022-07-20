//*========== GENERAL IMPORTS ==========*//
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import commerce from "./lib/commerce";
import { useCartDispatch } from "./context/CartContext";

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

//*========== TOP LEVEL APP COMPONENT ==========*//
// This is the parent component of the entire app.
// Everything else will flow downward from here.
const App = () => {
  // Initialize state variables
  const [products, setProducts] = useState([]);
  const { refreshCart } = useCartDispatch();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = () => {
    commerce.products
      .list()
      .then((products) => {
        setProducts(products.data);
        console.log("Products updated successfully.");
        setLoading(false);
      })
      .catch((error) => {
        console.log("There was an error fetching the products", error);
      });
  };

  const handleCaptureCheckout = (checkoutTokenId, newOrder) => {
    commerce.checkout
      .capture(checkoutTokenId, newOrder)
      .then((order) => {
        // Save the order into state
        setOrder(order);
        // Clear the cart
        refreshCart();
        // Send the user to the receipt
        navigate("/confirmation");
        // Store the order in session storage so we can show it again if the
        // user refreshes the page
        window.sessionStorage.setItem("order_receipt", JSON.stringify(order));
      })
      .catch((error) => {
        console.log("There was an error confirming your order", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="app-wrapper">
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route path="about" element={<About />} />
        <Route
          path="products"
          element={
            <Products
              products={products}
              fetchProducts={fetchProducts}
              loading={loading}
            />
          }
        />
        <Route path="products/:id" element={<Product products={products} />} />
        <Route path="cart" element={<Cart />} />
        <Route
          path="checkout"
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
      </Routes>
    </div>
  );
};

export default App;
