import HOME from "../../assets/example-hero.jpg";
import "./home.css";

export default function Home() {
  return (
    <main className="page-wrapper">
      <div id="home-hero">
        <img src={HOME} alt="leather bag" />
      </div>
      <div id="home-message">
        <p>CURRENT ORDER WAIT IS 5 DAYS</p>
      </div>
      <div id="home-featured">
        <h5>FEATURED ITEMS</h5>
        <h2>LEATHER WALLETS</h2>
        <div className="home-featured-items">
          <p>LIST X # OF ITEMS HERE</p>
        </div>
        <div id="home-about">
          <h5>ABOUT THE SHOP</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
            ipsam quibusdam doloremque excepturi cum nam reprehenderit ducimus
            quam corporis? Eligendi est esse architecto tenetur sed, voluptate
            iure illo qui tempora!
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            nulla dignissimos dolorem hic ipsa! Voluptate!
          </p>
        </div>
        <div id="footer">
          <p>FOOTER</p>
        </div>
      </div>
    </main>
  );
}
