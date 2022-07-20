import { useEffect } from "react";
import Nav from "../../components/nav/Nav.jsx";
import Footer from "../../components/footer/Footer.jsx";
import ProductsList from "./products_list/ProductsList.jsx";
import "./products.css";

const Products = (props) => {
  const fetchProducts = props.fetchProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-wrapper">
      <Nav />
      <div className="page-content">
        <h1 className="h-main">PRODUCTS</h1>
        <section className="page-section" id="products-item-list">
          {props.loading ? (
            <p>Loading...</p>
          ) : (
            <ProductsList
              products={props.products}
              onAddToCart={props.onAddToCart}
            />
          )}
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Products;
