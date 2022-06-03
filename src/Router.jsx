import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import About from "./routes/About";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
<BrowserRouter></BrowserRouter>;
