import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import "./contact-confirmation.css";

const ContactConfirmation = (props) => {
  return (
    <main className="page-wrapper">
      <Nav />

      <div className="page-content">
        <section className="page-section" id="confirm-content">
          <h1 className="h-main">Thanks! Your message has been sent.</h1>
          <p className="h-sub">We'll respond as soon as possible.</p>
          <Link to="/" id="return-home-btn">
            RETURN HOME
          </Link>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default ContactConfirmation;
