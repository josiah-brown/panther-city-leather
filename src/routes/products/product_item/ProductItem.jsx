import React from "react";
// import { stripHtml } from "string-strip-html";
import PropTypes from "prop-types";
import "./product-item.css";

const ProductItem = ({ product, onAddToCart }) => {
  // const { result } = stripHtml(product.description);

  const handleAddToCart = () => {
    onAddToCart(product.id, 1);
  };

  return (
    <div className="product__card">
      <img
        className="product__image"
        src={product.image?.url}
        alt={product.name}
      />
      <div className="product__info">
        <h4 className="product__name h-sub">{product.name.toUpperCase()}</h4>
        <div className="product__details">
          <p className="product__price h-sub">
            FROM {product.price.formatted_with_symbol}
          </p>
          {/* <button
            name="Add to cart"
            className="product__btn"
            onClick={handleAddToCart}
          >
            Quick add
          </button> */}
        </div>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object,
};

export default ProductItem;
