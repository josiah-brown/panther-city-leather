//========== 3RD PARTY IMPORTS ==========//
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//========== COMPONENT IMPORTS ==========//
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";

//========== ASSET IMPORTS ==========//
import { BsDot } from "react-icons/bs";

//========== CONTEXT IMPORTS ==========//
import { useCartDispatch } from "../../context/CartContext";
import { useProductsState } from "../../context/ProductsContext";

//========== CSS IMPORTS ==========//
import "./product.css";

//========== INDIVIDUAL PRODUCT PAGE COMPONENT ==========//
const Product = () => {
  // Get url params
  const params = useParams();

  // Set context variables
  const { addToCart } = useCartDispatch();
  const products = useProductsState();

  // Set state variables
  const [currProduct, setCurrProduct] = useState({});
  const [variants, setVariants] = useState(null);
  const [qty, setQty] = useState(1);

  // Updates the variants state when one of the variation dropdowns is changed
  const handleVariantsChange = (e) => {
    setVariants((variants) => {
      const groupId = e.target.id;
      const optionId = e.target.value;
      const updatedVariants = { ...variants, [groupId]: optionId };
      return updatedVariants;
    });
  };

  // Updates 'qty' state when changed via button or input
  const handleQtyChange = (e) => {
    const operation = e.target.textContent;
    if (operation === "+") {
      setQty((qty) => qty + 1);
    } else if (operation === "-") {
      // Make sure qty does not go negative
      if (qty > 1) {
        setQty((qty) => qty - 1);
      } else {
        return;
      }
    } else {
      console.log("There was an error changing the quantity");
    }
  };

  // Calls the cart context 'addToCart' method
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(currProduct.id, qty, variants);
  };

  // Calculates the total price of the item based on variations selected and qty
  const getTotalPrice = () => {
    const basePrice = currProduct.price.raw;
    let variantsPrice = 0;
    for (const key in variants) {
      const optionId = variants[key];
      currProduct.variant_groups.forEach((group) => {
        group.options.forEach((option) => {
          if (group.id === key && option.id === optionId) {
            variantsPrice += option.price.raw;
          }
        });
      });
    }
    return (basePrice + variantsPrice) * qty;
  };

  // Renders the product page only if the products have loaded in,
  // the currProduct has been set, and the variants have been set.
  const renderProduct = () => {
    if (!products.loading && variants && currProduct !== {}) {
      return (
        <div id="product-content">
          <img
            className="product-image"
            src={currProduct.image?.url}
            alt={currProduct.name}
          />
          <div className="right-side">
            <div className="product-heading">
              <h4 className="h-sub">{currProduct.name.toUpperCase()}</h4>
              <p className="h-sub">
                FROM {currProduct.price.formatted_with_symbol}
              </p>
            </div>

            <div className="product-about">
              <p className="h-sub">
                The F1 is a minimalist wallet made with the finest of full grain
                leathers. Handcrafted to fit your minimalist lifestyle and made
                to last.
              </p>
              <br />
              <p className="h-sub">
                <BsDot /> Option of Machine Stitched or Hand Stitched with
                Japanese thread.
              </p>
              <p className="h-sub">
                <BsDot /> Rose gold foiled logo on closure strap
              </p>
              <p className="h-sub">
                <BsDot /> Hand finished dyed edges
              </p>
            </div>

            <br />

            <form className="product-form">
              {currProduct.variant_groups.map((group) => {
                return (
                  <div
                    key={group.id + "container"}
                    className="product-form-row"
                  >
                    <h2 className="h-main">{group.name.toUpperCase()}</h2>
                    <select
                      name={group.name}
                      key={group.id}
                      id={group.id}
                      value={variants[group.id]}
                      onChange={handleVariantsChange}
                    >
                      {group.options.map((variation) => {
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
                <span onClick={handleQtyChange} className="qty-change-btn">
                  -
                </span>
                <span>{qty}</span>
                <span onClick={handleQtyChange} className="qty-change-btn">
                  +
                </span>
              </div>
              <br />

              <button onClick={handleAddToCart} id="add-to-cart-btn">
                Add To Cart - ${getTotalPrice()} USD
              </button>
            </form>
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
          setVariants(() => {
            const tempVariant = {};
            newProduct.variant_groups.forEach((group) => {
              tempVariant[group.id] = group.options[0].id;
            });
            return tempVariant;
          });
        }
      }
    }
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
