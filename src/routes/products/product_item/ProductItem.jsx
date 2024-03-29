import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./product-item.css";
import ImageLoader from "../../../components/image_loader/ImageLoader";

const ProductItem = (props) => {
  const product = props.product;
  const [imgURL, setImgURL] = useState(null);
  // console.log(props);

  useEffect(() => {
    if (product.image?.url) {
      if (product.image.url.includes("|")) {
        setImgURL(product.image.url.split("|").join("%7C"));
      } else {
        setImgURL(product.image.url);
      }
    }
  }, [product.image?.url]);

  return (
    <div className="product__card">
      <Link to={"/products/" + product.id}>
        {imgURL ? (
          <div className="product__image__wrapper">
            <img className="product__image" src={imgURL} alt={product?.name} />
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
