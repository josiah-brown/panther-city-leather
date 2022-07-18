import Nav from "../../components/nav/Nav";
import { useParams } from "react-router-dom";
import ProductItem from "../products/product_item/ProductItem";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import "./product.css";

const Product = (props) => {
  const params = useParams();
  const [productLoaded, setProductLoaded] = useState(false);
  const [currProduct, setCurrProduct] = useState({});
  const [variants, setVariants] = useState({});
  const [qty, setQty] = useState(1);

  const handleStitchMethodChange = (e) => {
    const currValId = e.target.value;
    // setStitchMethod(() => {
    //   currProduct.variant_groups.forEach((group) => {
    //     group.options.forEach((option) => {
    //       if (option.id === currValId) {
    //         console.log(option);
    //         return option;
    //       }
    //     });
    //   });
    // });
  };

  const handleQtyChange = (e) => {
    const operation = e.target.textContent;
    if (operation === "+") {
      setQty((qty) => qty + 1);
    } else if (operation === "-") {
      if (qty > 1) {
        setQty((qty) => qty - 1);
      } else {
        return;
      }
    } else {
      console.log("There was an error changing the quantity");
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    props.onAddToCart(currProduct.id, qty);
  };

  const renderProduct = () => {
    if (productLoaded) {
      return (
        <div>
          <ProductItem
            key={currProduct.id}
            product={currProduct}
            onAddToCart={props.onAddToCart}
          />
          <div className="product-about">
            <p className="h-sub">
              The F1 is a minimalist wallet made with the finest of full grain
              leathers. Handcrafted to fit your minimalist lifestyle and made to
              last.
            </p>
            <br />
            <p className="h-sub">Features:</p>
            <p className="h-sub">
              - Option of Machine Stitched or Hand Stitched with Japanese
              thread.
              <br />- Rose gold foiled logo on closure strap
              <br />- Hand finished dyed edges
            </p>
          </div>
          <br />
          <form className="product-form">
            {currProduct.variant_groups.map((group) => {
              // console.log(group);
              return (
                <div>
                  <h2 className="h-main">{group.name}</h2>
                  <select
                    name={group.name}
                    key={group.id}
                    // value={stitchMethod}
                    onChange={handleStitchMethodChange}
                  >
                    {group.options.map((variation) => {
                      // console.log(variation);
                      return (
                        <option value={variation.id} key={variation.id}>
                          {variation.name + " ($" + variation.price.raw + ")"}
                        </option>
                      );
                    })}
                  </select>
                </div>
              );
            })}
            <br />
            <div className="qtyCounter h-sub">
              <span onClick={handleQtyChange}>-</span>
              <span>{qty}</span>
              <span onClick={handleQtyChange}>+</span>
            </div>
            <br />
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log(variants);
              }}
            >
              Add To Cart - ${currProduct.price.raw * qty} USD
            </button>
          </form>
        </div>
      );
    } else {
      return <p>No product found with that id</p>;
    }
  };

  useEffect(() => {
    if (props.products.length === 0) {
      return console.log("Products have not loaded yet.");
    }
    setProductLoaded(true);
    setCurrProduct(() => {
      for (var i = 0; i < props.products.length; i++) {
        if (props.products[i].id === params.id) {
          // console.log(props.products[i]);
          const product = props.products[i];
          // setVariants(() => {
          //   const newVariants = {};
          //   product.variant_groups.forEach((group) => {
          //     newVariants.group.id = group.options[0].id;
          //   });
          //   console.log(newVariants);
          //   return newVariants;
          // });
          return product;
        }
      }
    });
  }, [props.products]);

  return (
    <main className="page-wrapper">
      <Nav cart={props.cart} />
      <div className="page-content">
        <section className="page-section">{renderProduct()}</section>
      </div>
      <Footer />
    </main>
  );
};

export default Product;
