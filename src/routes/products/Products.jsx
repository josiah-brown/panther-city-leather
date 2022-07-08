import ProductsList from "./products_list/ProductsList.jsx";
import Nav from "../../components/nav/Nav.jsx";
import Footer from "../../components/footer/Footer.jsx";
import { useEffect } from "react";
import { checkPropTypes } from "prop-types";

const Products = ({ products, onAddToCart, loading, fetchProducts }) => {
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Nav />
      <h1>Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductsList products={products} onAddToCart={onAddToCart} />
      )}
      <Footer />
    </div>
  );
};

export default Products;
