import Nav from "../../components/nav/Nav";
import { useParams } from "react-router-dom";
import ProductItem from "../products/product_item/ProductItem";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import { render } from "@testing-library/react";

const Product = (props) => {
  const params = useParams();
  const [productLoaded, setProductLoaded] = useState(false);

  const renderProduct = () => {
    if (productLoaded) {
      for (var i = 0; i < props.products.length; i++) {
        if (props.products[i].id === params.id) {
          const currProduct = props.products[i];
          return (
            <ProductItem
              key={currProduct.id}
              product={currProduct}
              onAddToCart={props.onAddToCart}
            />
          );
        }
      }
    } else {
      return <p>No product found with that id</p>;
    }
  };

  useEffect(() => {
    if (props.products.length === 0) {
      return console.log("Products have not loaded yet.");
    }
    setProductLoaded(true);
    // console.log(props.products);
  }, [props.products]);

  return (
    <main className="page-wrapper">
      <Nav cart={props.cart} />
      <div className="page-content">
        <section className="page-section" id="section-1">
          {renderProduct()}
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Product;
