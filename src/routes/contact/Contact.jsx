import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";

const Contact = (props) => {
  return (
    <main className="page-wrapper">
      <Nav cart={props.cart} />
      <div className="page-content">
        <section className="page-section" id="section-1">
          <p>Contact</p>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Contact;
