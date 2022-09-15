import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./product-item.css";
import { useState } from "react";
import ImageLoader from "../../../components/image_loader/ImageLoader";

const ProductItem = (props) => {
  const product = props.product;
  const [imageLoading, setImageLoading] = useState(true);

  let image = new Image();
  image.src = product.image?.url;
  image.onload = () => {
    setImageLoading(false);
  };

  return (
    <div className="product__card">
      <Link to={"/products/" + product.id}>
        {imageLoading ? (
          <ImageLoader />
        ) : (
          <img
            className="product__image"
            src={product.image?.url}
            alt={product.name}
          />
        )}

        <div className="product__info">
          <h4 className="product__name h-sub">{product.name.toUpperCase()}</h4>
          <div className="product__details">
            <p className="product__price h-sub">
              FROM {product.price.formatted_with_symbol}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object,
};

export default ProductItem;
