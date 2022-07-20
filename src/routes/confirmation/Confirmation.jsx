import React from "react";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import "./confirmation.css";

const Confirmation = (props) => {
  function renderOrderSummary() {
    const order = props.order;
    const onBackToHome = props.onBackToHome;

    if (!order) {
      console.log("Not Order...");
      return null;
    }

    return (
      <div className="confirmation">
        <div className="confirmation__wrapper">
          <h4>Thank you for your purchase, {order.customer.firstname}!</h4>
          <div>
            <p>Order reference #:</p>
            <p id="order-ref-num">{order.customer_reference}</p>
            <p id="email-notice">
              You should receive a confirmation email shortly.
            </p>
          </div>
          <Link type="button" to="/" onClick={onBackToHome}>
            {/* <BsFillArrowLeftCircleFill /> */}
            <span>RETURN HOME</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Nav cart={props.cart} />
      {renderOrderSummary()}
      <Footer />
    </div>
  );
};

export default Confirmation;
