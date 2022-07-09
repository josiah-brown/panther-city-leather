import HOME from "../../assets/example-hero.jpg";
import SHOP_IMG from "../../assets/wallet.webp";
import ABOUT_IMG from "../../assets/about.jpeg";
import "./home.css";
import Nav from "../../components/nav/Nav";
import ProductsList from "../products/products_list/ProductsList";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";

const Home = (props) => {
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
          <h5 className="h-sub">FEATURED ITEMS</h5>
          <br />
          <h2 className="h-main">LEATHER WALLETS</h2>
          <br />
          <br />
          <div className="featured-items">
            <ProductsList products={props.products} onAddToCart={() => {}} />
          </div>
          <div id="home-featured-btn">
            <a className="btn-def-black" href="/products">
              SHOP ALL PRODUCTS
            </a>
          </div>
        </section>

        <section id="home-about" className="page-section">
          <div className="wrapper">
            <h5 className="h-sub">LEARN MORE</h5>
            <br />
            <h2 className="h-main">ABOUT THE SHOP</h2>
            <br />

            <p className="h-sub">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
              quidem quod fugit optio facilis ipsa, tenetur ipsam enim nemo
              nulla. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Saepe, placeat!
            </p>
            <br />
            <p className="h-sub">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima
              ullam maiores atque.
            </p>
            <br />
            <p className="h-sub">Lorem ipsum dolor sit amet consectetur.</p>
          </div>
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
