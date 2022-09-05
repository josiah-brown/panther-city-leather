import React, { useState } from "react";
import { useCartDispatch } from "../../context/CartContext";
import Loader from "../../components/loader/Loader";

const ProductForm = (props) => {
  const product = props.product;
  const [variants, setVariants] = useState(() => {
    const tempVariant = {};
    product.variant_groups.forEach((group) => {
      tempVariant[group.id] = group.options[0].id;
    });
    return tempVariant;
  });
  const [qty, setQty] = useState(1);
  const [cartIsUpdating, setCartIsUpdating] = useState(false);
  const { addToCart } = useCartDispatch();

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

  // Calculates the total price of the item based on variations selected and qty
  const getTotalPrice = () => {
    const basePrice = product.price.raw;
    let variantsPrice = 0;
    for (const key in variants) {
      const optionId = variants[key];
      // eslint-disable-next-line
      product.variant_groups.forEach((group) => {
        group.options.forEach((option) => {
          if (group.id === key && option.id === optionId) {
            variantsPrice += option.price.raw;
          }
        });
      });
    }
    return (basePrice + variantsPrice) * qty;
  };

  // Calls the cart context 'addToCart' method
  const handleAddToCart = (e) => {
    e.preventDefault();
    setCartIsUpdating(true);
    addToCart(product.id, qty, variants);
  };

  return (
    <form className="product-form">
      {cartIsUpdating ? <Loader /> : null}
      {product.variant_groups.map((group) => {
        return (
          <div key={group.id + "container"} className="product-form-row">
            <h2 className="h-main">{group.name.toUpperCase()}</h2>
            <select
              name={group.name}
              key={group.id}
              id={group.id}
              value={variants ? variants[group.id] : "Loading..."}
              onChange={handleVariantsChange}
            >
              {group.options.map((variation) => {
                return (
                  <option value={variation.id} key={variation.id}>
                    {variation.name +
                      (variation.price.raw > 0
                        ? " (+$" + variation.price.raw + ")"
                        : "")}
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
  );
};

export default ProductForm;
