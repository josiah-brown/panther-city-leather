import React from "react";
import ProductItem from "../product_item/ProductItem";
import "./products-list.css";
import { useProductsState } from "../../../context/ProductsContext";

const ProductsList = () => {
  const { data, loading } = useProductsState();

  const renderProducts = () => {
    return data.map((product) => {
      return <ProductItem key={product.id} product={product} />;
    });
  };

  return (
    <div className="products_list">
      {loading ? <h1>Loading products...</h1> : renderProducts()}
    </div>
  );
};

export default ProductsList;
