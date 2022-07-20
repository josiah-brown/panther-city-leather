import "./index.css";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";

const DefaultPage = (props) => {
  return (
    <main className="page-wrapper">
      <Nav />
      <div className="page-content">
        <section className="page-section" id="section-1">
          <p>Section 1</p>
        </section>
        <section className="page-section" id="section-2">
          <p>Section 2</p>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default DefaultPage;
