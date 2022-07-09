import ProductsList from "./products_list/ProductsList.jsx";
import Nav from "../../components/nav/Nav.jsx";
import Footer from "../../components/footer/Footer.jsx";
import { useEffect } from "react";
import { AiFillPropertySafety } from "react-icons/ai";

const Products = (props) => {
  useEffect(() => {
    props.fetchProducts();
  }, []);

  return (
    <div>
      <Nav cart={props.cart} />
      <h1>Products</h1>
      {props.loading ? (
        <p>Loading...</p>
      ) : (
        <ProductsList
          products={props.products}
          onAddToCart={props.onAddToCart}
        />
      )}
      <Footer />
    </div>
  );
};

export default Products;
