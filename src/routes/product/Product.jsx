//========== 3RD PARTY IMPORTS ==========//
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//========== COMPONENT IMPORTS ==========//
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import Loader from "../../components/loader/Loader";
import ImageSlider from "../../components/image_slider/ImageSlider";
import ProductHeading from "./ProductHeading";
import ProductDescription from "./ProductDescription";
import ProductForm from "./ProductForm";

//========== CONTEXT IMPORTS ==========//
import { useProductsState } from "../../context/ProductsContext";

//========== CSS IMPORTS ==========//
import "./product.css";

//========== INDIVIDUAL PRODUCT PAGE COMPONENT ==========//
const Product = () => {
  // Get url params
  const params = useParams();

  // Set context variables
  const products = useProductsState();

  // Set state variables
  const [currProduct, setCurrProduct] = useState({});

  const renderProduct = () => {
    if (!products.loading && Object.keys(currProduct).length > 0) {
      return (
        <div id="product-content">
          <ImageSlider slides={currProduct["assets"]} />
          <div className="right-side">
            <ProductHeading product={currProduct} />
            <ProductDescription desc={currProduct.description} />
            <br />
            <ProductForm product={currProduct} />
          </div>
        </div>
      );
    } else {
      return <p>Loading the product...</p>;
    }
  };

  // Hook that sets the 'currProduct' and 'variants' after products have loaded into page.
  useEffect(() => {
    if (products.loading) {
      return console.log("Products have not loaded yet.");
    }
    if (!products.loading) {
      for (var i = 0; i < products.data.length; i++) {
        if (products.data[i].id === params.id) {
          const newProduct = products.data[i];
          setCurrProduct(newProduct);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.loading]);

  return (
    <main className="page-wrapper">
      <Nav />
      <div className="page-content">
        <section className="page-section" id="product-page">
          {renderProduct()}
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Product;
