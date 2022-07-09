import "./about.css";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import { AiFillPropertySafety } from "react-icons/ai";

export default function About(props) {
  return (
    <main>
      <Nav cart={props.cart} />
      <h1>About</h1>
      <Footer />
    </main>
  );
}
