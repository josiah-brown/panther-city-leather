import { Link } from "react-router-dom";
import Nav from "../../components/nav/Nav";

export default function Home() {
  return (
    <main>
      <Nav />
      <h1>Home</h1>
      {/* <Link to="/about">About</Link> */}
    </main>
  );
}
