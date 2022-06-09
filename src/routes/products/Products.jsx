import React, { useEffect, useState } from "react";
import commerce from "../../lib/commerce.js";
import ProductsList from "../../components/products_list/ProductsList.jsx";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    commerce.products
      .list()
      .then((products) => {
        setProducts(products.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("There was an error fetching the products", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {loading ? <p>Loading...</p> : <ProductsList products={products} />}
      <h1>Footer</h1>
    </div>
  );
};

export default Products;
