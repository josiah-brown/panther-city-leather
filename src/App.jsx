import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/home/Home";
import About from "./routes/about/About";
import Products from "./routes/products/Products";
import Cart from "./routes/cart/Cart";
import Checkout from "./routes/checkout/Checkout";
import commerce from "./lib/commerce";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);

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

  const fetchCart = () => {
    commerce.cart
      .retrieve()
      .then((cart) => {
        setCart(cart);
        console.log("Cart updated successfully.");
      })
      .catch((error) => {
        console.log("There was an error fetching the cart", error);
      });
  };

  const handleAddToCart = (productId, quantity) => {
    commerce.cart
      .add(productId, quantity)
      .then((item) => {
        setCart(item.cart);
      })
      .catch((error) => {
        console.error("There was an error adding the item to the cart", error);
      });
  };

  const handleUpdateCartQty = (lineItemId, quantity) => {
    commerce.cart
      .update(lineItemId, { quantity })
      .then((resp) => {
        setCart(resp.cart);
      })
      .catch((error) => {
        console.log("There was an error updating the cart items", error);
      });
  };

  const handleRemoveFromCart = (lineItemId) => {
    commerce.cart
      .remove(lineItemId)
      .then((resp) => {
        setCart(resp.cart);
      })
      .catch((error) => {
        console.error(
          "There was an error removing the item from the cart",
          error
        );
      });
  };

  const handleEmptyCart = () => {
    commerce.cart
      .empty()
      .then((resp) => {
        setCart(resp.cart);
      })
      .catch((error) => {
        console.error("There was an error emptying the cart", error);
      });
  };

  useEffect(() => {
    // fetchProducts();
    // fetchCart();
  }, []);

  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                fetchProducts={fetchProducts}
                cart={cart}
                fetchCart={fetchCart}
              />
            }
          />
          <Route path="about" element={<About />} />
          <Route
            path="products"
            element={
              <Products
                products={products}
                onAddToCart={handleAddToCart}
                fetchProducts={fetchProducts}
                loading={loading}
              />
            }
          />
          <Route
            path="cart"
            element={
              <Cart
                cart={cart}
                onUpdateCartQty={handleUpdateCartQty}
                onRemoveFromCart={handleRemoveFromCart}
                onEmptyCart={handleEmptyCart}
                fetchCart={fetchCart}
              />
            }
          />
          <Route
            path="checkout"
            element={<Checkout cart={cart} fetchCart={fetchCart} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
