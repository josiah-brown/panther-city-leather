import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import "./contact.css";
import CONTACT_IMG from "../../assets/contact-img.jpg";
// import CONTACT_IMG2 from "../../assets/contact-img2.jpg";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Contact = (props) => {
  const navigate = useNavigate();

  // Validates form fields
  const validateForm = () => {
    const form = document.getElementById("contact-form");
    for (var i = 0; i < form.elements.length; i++) {
      if (
        form.elements[i].value === "" &&
        form.elements[i].hasAttribute("required")
      ) {
        displayErrorMessage(
          "Please fill all required fields before submitting"
        );
        return false;
      }
      if (
        form.elements[i].id === "form-email" &&
        form.elements[i].validity.valid === false
      ) {
        displayErrorMessage("Invalid email address");
        return false;
      }
    }
    console.log("Form validated");
    return true;
  };

  // Displays the passed in error message below the form
  const displayErrorMessage = (m) => {
    const message = document.getElementById("form-error");
    message.style.display = "block";
    message.textContent = m;
  };

  // Called on submit click. Validates and sends message via email
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return console.log("Error validating the form");
    }

    const submitBtn = document.getElementById("submit-contact-form-btn");
    submitBtn.textContent = "Sending...";
    const errorMessage = document.getElementById("form-error");
    errorMessage.style.display = "none";

    const name = document.getElementById("form-name");
    const email = document.getElementById("form-email");
    const subject = document.getElementById("form-subject");
    const message = document.getElementById("form-message");

    emailjs
      .send(
        "service_hfswfbe",
        "template_b24ohy5",
        {
          from_name: name.value,
          subject: subject.value,
          message: message.value,
          from_email: email.value,
        },
        "AlmOFYKFPMZozZDmq"
      )
      .then(() => {
        navigate("/contact/confirmation");
      })
      .catch((err) => {
        console.log("Oops there was an error sending the message:", err);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-wrapper">
      <Nav />

      <div className="page-content">
        <section className="page-section" id="contact-content">
          <div className="contact-img-container">
            <img src={CONTACT_IMG} alt="leather working tools" />
          </div>

          <div className="contact-form-container">
            <h2 className="h-main">Have a special request or inquiry?</h2>
            <h2 className="h-sub">
              Send a message and I'll get back to you as soon as I can!
            </h2>

            <form className="contact-form" id="contact-form">
              <div className="contact-form-row">
                <label htmlFor="name">NAME</label>
                <input
                  type="text"
                  id="form-name"
                  required
                  placeholder="Enter full name"
                />
              </div>
              <div className="contact-form-row">
                <label htmlFor="email">EMAIL</label>
                <input
                  type="email"
                  id="form-email"
                  required
                  placeholder="Enter email"
                />
              </div>
              <div className="contact-form-row">
                <label htmlFor="subject">SUBJECT</label>
                <input
                  type="text"
                  id="form-subject"
                  required
                  placeholder="Enter subject"
                />
              </div>
              <div className="contact-form-row">
                <label htmlFor="message">MESSAGE</label>
                <textarea
                  placeholder="Compose message..."
                  id="form-message"
                  required
                  rows="7"
                ></textarea>
              </div>
              <div className="contact-form-error" id="form-error">
                <p className="h-sub">
                  Please fill all required fields before submitting.
                </p>
              </div>
              <div className="contact-form-row" id="form-submit-btn">
                <button
                  type="button"
                  id="submit-contact-form-btn"
                  onClick={handleFormSubmit}
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default Contact;
