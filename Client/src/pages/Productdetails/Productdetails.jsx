import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./Productdetails.css";

function Productdetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/products/${id}`);

      setProduct(res.data.product);

      setLoading(false);
    } catch (err) {
      setError("Product not found");
      setLoading(false);
    }
  };

  const addToCart = async () => {
    try {
      setAdding(true);

      await api.post("/cart", {
        productId: product._id,
        quantity: 1,
      });

      alert("Product Added to Cart");

      navigate("/cart");
    } catch (err) {
      alert("Unable to add product to cart");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="product-details">
        <h2>Loading Product...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-details">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="product-details">

      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-info">

        <h1>{product.name}</h1>

        <h2>₹{product.price}</h2>

        <h4>{product.category}</h4>

        <p>{product.description}</p>

        <p>
          <strong>Stock :</strong> {product.stock}
        </p>

        <button
          onClick={addToCart}
          disabled={adding}
        >
          {adding ? "Adding..." : "Add to Cart"}
        </button>

      </div>

    </div>
  );
}

export default Productdetails;