import React from "react";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const Confirmation = (props) => {
  function renderOrderSummary() {
    const { order, onBackToHome } = props;

    if (!order) {
      console.log("Not Order...");
      return null;
    }

    return (
      <div className="confirmation">
        <div className="confirmation__wrapper">
          <div className="confirmation__wrapper-message">
            <h4>
              Thank you for your purchase, {order.customer.firstname}{" "}
              {order.customer.lastname}!
            </h4>
            <p className="confirmation__wrapper-reference">
              <span>Order ref:</span> {order.customer_reference}
            </p>
          </div>
          <Link
            className="confirmation__wrapper-back"
            type="button"
            to="/"
            onClick={onBackToHome}
          >
            <BsFillArrowLeftCircleFill />
            <span>Back to home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      {renderOrderSummary()}
      <Footer />
    </div>
  );
};

export default Confirmation;
