import React from "react";

const ProductHeading = (props) => {
  const product = props.product;
  return (
    <div className="product-heading">
      <h4 className="h-sub">{product.name.toUpperCase()}</h4>
      <p className="h-sub">FROM {product.price.formatted_with_symbol}</p>
    </div>
  );
};

export default ProductHeading;
