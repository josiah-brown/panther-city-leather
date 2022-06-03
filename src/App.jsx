import React from "react";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div>
      <h1>Hello World!</h1>
      <Link to="/about">About</Link>
    </div>
  );
};

export default App;
