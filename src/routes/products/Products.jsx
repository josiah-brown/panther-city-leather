import ProductsList from "./products_list/ProductsList.jsx";

const Products = ({ products, onAddToCart, loading }) => {
  return (
    <div>
      <h1>Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductsList products={products} onAddToCart={onAddToCart} />
      )}
      <h1>Footer</h1>
    </div>
  );
};

export default Products;
