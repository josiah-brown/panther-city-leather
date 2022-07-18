import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./product-item.css";

const ProductItem = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(product.id, 1);
  };

  return (
    <div className="product__card">
      <Link to={"/products/" + product.id}>
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
          </div>
        </div>
      </Link>

      {/* <button
        name="Add to cart"
        type="button"
        className="product__btn btn-def"
        onClick={handleAddToCart}
      >
        Quick add
      </button> */}
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object,
};

export default ProductItem;
