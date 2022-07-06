import ProductsList from "./products_list/ProductsList.jsx";
import Nav2 from "../../components/nav/Nav2.jsx";
import Footer from "../../components/footer/Footer.jsx";

const Products = ({ products, onAddToCart, loading }) => {
  return (
    <div>
      <Nav2 />
      <h1>Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductsList products={products} onAddToCart={onAddToCart} />
      )}
      <Footer />
    </div>
  );
};

export default Products;
