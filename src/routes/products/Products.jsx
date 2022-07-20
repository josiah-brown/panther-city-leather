import { useEffect } from "react";
import Nav from "../../components/nav/Nav.jsx";
import Footer from "../../components/footer/Footer.jsx";
import ProductsList from "./products_list/ProductsList.jsx";
import "./products.css";
import { useProductsState } from "../../context/ProductsContext.jsx";

const Products = () => {
  const products = useProductsState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-wrapper">
      <Nav />
      <div className="page-content">
        <h1 className="h-main">PRODUCTS</h1>
        <section className="page-section" id="products-item-list">
          {products.loading ? <p>Loading...</p> : <ProductsList />}
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Products;
