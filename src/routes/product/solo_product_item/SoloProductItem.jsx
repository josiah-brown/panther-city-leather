import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./solo-product-item.css";

const SoloProductItem = ({ product }) => {
  return (
    <div className="product__card-solo">
      <img
        className="product__image-solo"
        src={product.image?.url}
        alt={product.name}
      />

      <div className="product__info-solo">
        <h4 className="product__name-solo h-sub">
          {product.name.toUpperCase()}
        </h4>
        <div className="product__details-solo">
          <p className="product__price-solo h-sub">
            FROM {product.price.formatted_with_symbol}
          </p>
        </div>
      </div>
    </div>
  );
};

SoloProductItem.propTypes = {
  product: PropTypes.object,
};

export default SoloProductItem;
