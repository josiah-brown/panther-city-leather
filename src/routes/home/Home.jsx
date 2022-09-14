import HOME from "../../assets/example-hero.jpg";
import SHOP_IMG from "../../assets/wallet.webp";
import "./home.css";
import Nav from "../../components/nav/Nav";
import ProductsList from "../products/products_list/ProductsList";
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import { useProductsState } from "../../context/ProductsContext";
import SectionLoader from "../../components/section_loader/SectionLoader";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [productsLoaded, setProductsLoaded] = useState(false);
  const productsState = useProductsState();

  useEffect(() => {
    if (!productsState.loading) {
      setProductsLoaded(true);
    }
  }, [productsState]);

  return (
    <main className="page-wrapper">
      <Nav />
      <div className="page-content">
        <div id="home-hero">
          <img src={HOME} alt="leather bag" />
        </div>

        <section className="page-section" id="home-message">
          <div className="wrapper">
            <p className="h-main">CURRENT LEAD TIME ON NEW ORDERS IS 5 DAYS</p>
          </div>
        </section>

        <section className="page-section" id="home-featured">
          {productsLoaded ? (
            <div className="content">
              <h5 className="h-sub">FEATURED ITEMS</h5>
              <br />
              <h2 className="h-main">LEATHER WALLETS</h2>
              <br />
              <br />
              <div className="featured-items">
                <ProductsList />
              </div>
              <div id="home-featured-btn">
                <a className="btn-def-black" href="/products">
                  SHOP ALL PRODUCTS
                </a>
              </div>
            </div>
          ) : (
            <SectionLoader />
          )}
        </section>

        <section id="home-about" className="page-section">
          <h5 className="h-sub">LEARN MORE</h5>
          <br />
          <h2 className="h-main">ABOUT THE SHOP</h2>
          <br />
          <p className="h-sub">
            Panther City Leather was started by Isaac Brown in 2022. Every
            single product is made with locally sourced materials and an intense
            attention to detail. Click below to learn more about the shop and
            materials.
          </p>
          <br />
          <Link to={"/about"} className="btn-def-black">
            LEARN MORE
          </Link>{" "}
        </section>

        <section id="home-shop">
          <img src={SHOP_IMG} alt="wallet" />
          <div className="home-shop-content">
            <h2 className="h-main">
              HANDMADE LEATHER <br /> GOODS
            </h2>
            <div id="home-shop-btn">
              <a className="btn-def-white" href="/products">
                VIEW PRODUCTS
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Home;
