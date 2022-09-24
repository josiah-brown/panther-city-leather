import HOME from "../../assets/hero_bag_web.jpeg";
import SHOP_IMG from "../../assets/hero_notebook_web.jpeg";
import "./home.css";
import Nav from "../../components/nav/Nav";
import ProductsList from "../products/products_list/ProductsList";
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import { useProductsState } from "../../context/ProductsContext";
import { useCheckoutDispatch } from "../../context/CheckoutContext";
import SectionLoader from "../../components/section_loader/SectionLoader";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [productsLoaded, setProductsLoaded] = useState(false);
  const productsState = useProductsState();
  const { resetOrderData } = useCheckoutDispatch();

  useEffect(() => {
    resetOrderData();
    window.sessionStorage.setItem("is_reloaded", "false");
  }, [resetOrderData]);

  useEffect(() => {
    if (!productsState.loading) {
      setProductsLoaded(true);
    }
  }, [productsState]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-wrapper">
      <Nav />
      <div className="page-content">
        <div id="home-hero">
          <img src={HOME} alt="leather bag" />
        </div>

        <section className="page-section" id="home-message">
          <div className="wrapper">
            <p className="h-main">FREE SHIPPING ON ALL ORDERS!</p>
          </div>
        </section>

        <section className="page-section" id="home-featured">
          {productsLoaded ? (
            <div className="content">
              <h5 className="h-sub">FEATURED ITEMS</h5>
              <h2 className="h-main">LEATHER WALLETS</h2>
              <div className="featured-items">
                <ProductsList />
              </div>
              <Link to={"/products"} className="btn-def-black">
                SHOP ALL PRODUCTS
              </Link>
            </div>
          ) : (
            <SectionLoader />
          )}
        </section>

        <section id="home-about" className="page-section">
          <h5 className="h-sub">LEARN MORE</h5>
          <h2 className="h-main">ABOUT THE SHOP</h2>
          <p className="h-sub">
            My name is Isaac Brown, I am 16 years old and living in Fort Worth,
            Texas. I am striving to create simple, beautiful, high quality
            leather goods which will exceed expectations and last my customers a
            lifetime.
          </p>
          <Link to={"/about"} className="btn-def-black">
            LEARN MORE
          </Link>
        </section>

        <section id="home-shop">
          <img src={SHOP_IMG} alt="wallet" />
          <div className="home-shop-content">
            <h2 className="h-main">
              HANDMADE LEATHER <br /> GOODS
            </h2>
            <Link to={"/products"} className="btn-def-white">
              VIEW PRODUCTS
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Home;
