import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import "./ProductDetails.css";

import bangle from "../../assets/images/bangle.jpg";
import keychain from "../../assets/images/keychain.jpg";
import frame from "../../assets/images/frame.jpg";

function ProductDetails() {
  const { id } = useParams();

  const imageMap = {
    bangle,
    keychain,
    frame,
  };

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
      alert("Unable to load product");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    try {
      await api.post("/cart", {
        productId: product._id,
        quantity: 1,
      });

      alert("Added To Cart");
    } catch (error) {
      console.log(error);
      alert("Unable to add to cart");
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  return (
    <div className="product-details">
      <div className="product-details-card">
        <img
          src={imageMap[product.image] || bangle}
          alt={product.name}
          className="product-image"
        />

        <div className="product-info">
          <h1>{product.name}</h1>

          <h2>₹{product.price}</h2>

          <h3>{product.category}</h3>

          <p>{product.description}</p>

          <h3>Stock : {product.stock}</h3>

          <button onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;