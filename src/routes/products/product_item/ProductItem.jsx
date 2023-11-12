import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./product-item.css";
import ImageLoader from "../../../components/image_loader/ImageLoader";

const ProductItem = (props) => {
  const product = props.product;
  console.log(props);

  return (
    <div className="product__card">
      <Link to={"/products/" + product.id}>
        {product.image?.url ? (
          <div className="product__image__wrapper">
            <img
              className="product__image"
              src={product.image?.url}
              alt={product.name}
            />
          </div>
        ) : (
          <ImageLoader />
        )}

        <div className="product__info">
          <h4 className="product__name h-sub">{product.name.toUpperCase()}</h4>
          <div className="product__details">
            <p className="product__price h-sub">
              {product.price.formatted_with_symbol}
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
