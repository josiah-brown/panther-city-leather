import { useEffect } from "react";
import Nav from "../../components/nav/Nav.jsx";
import Footer from "../../components/footer/Footer.jsx";
import ProductsList from "./products_list/ProductsList.jsx";
import "./products.css";
import { useProductsState } from "../../context/ProductsContext.jsx";
import { Helmet } from "react-helmet";

const Products = () => {
  const products = useProductsState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-wrapper">
      <Nav />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products - Panther City Leather</title>
        <meta
          name="keywords"
          content="leather, fort worth, handmade, leather products, custom, wallet, texas, panther city leather, isaac brown"
        />
        <meta
          name="description"
          content="Panther City Leather specializes in high-quality, made-to-last, handmade leather goods. All products are made to order in Fort Worth, Texas by Isaac Brown."
        />
      </Helmet>
      <h1 className="h-main">PRODUCTS</h1>
      <section className="page-section" id="products-item-list">
        {products.loading ? <p>Loading...</p> : <ProductsList />}
      </section>
      <Footer />
    </main>
  );
};

export default Products;
