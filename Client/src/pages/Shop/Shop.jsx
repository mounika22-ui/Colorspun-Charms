import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import "./Shop.css";

import bangle from "../../assets/images/bangle.jpg";
import keychain from "../../assets/images/keychain.jpg";
import frame from "../../assets/images/frame.jpg";

function Shop() {
  const imageMap = {
    bangle,
    keychain,
    frame,
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    id: "",
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await api.get("/products");

      setProducts(res.data.products);

      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Unable to fetch products");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (form.id) {
        await api.put(`/products/${form.id}`, {
          name: form.name,
          category: form.category,
          description: form.description,
          price: form.price,
          stock: form.stock,
          image: form.image,
        });

        alert("Product Updated");
      } else {
        await api.post("/products", {
          name: form.name,
          category: form.category,
          description: form.description,
          price: form.price,
          stock: form.stock,
          image: form.image,
        });

        alert("Product Added");
      }

      setForm({
        id: "",
        name: "",
        category: "",
        description: "",
        price: "",
        stock: "",
        image: "",
      });

      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  const handleEdit = (product) => {
    setForm({
      id: product._id,
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: product.image,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Product?")) return;

    try {
      await api.delete(`/products/${id}`);

      alert("Product Deleted");

      fetchProducts();
    } catch (error) {
      alert("Delete Failed");
    }
  };

  const addToCart = async (product) => {
    try {
      await api.post("/cart", {
        productId: product._id,
        quantity: 1,
      });

      alert("Added To Cart");
    } catch (error) {
      alert("Unable to Add");
    }
  };

  if (loading) {
    return (
      <div className="shop">
        <h2>Loading Products...</h2>
      </div>
    );
  }
    return (
    <div className="shop">

      <h1>Manage Products</h1>

      <input
        type="text"
        className="search-box"
        placeholder="Search Products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <form
        className="product-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
        />

        <select
          name="image"
          value={form.image}
          onChange={handleChange}
        >
          <option value="">Select Image</option>
          <option value="bangle">Thread Bangles</option>
          <option value="keychain">Resin Keychain</option>
          <option value="frame">Photo Frame</option>
        </select>

        <button type="submit">
          {form.id
            ? "Update Product"
            : "Add Product"}
        </button>

      </form>

      <div className="products">

        {filteredProducts.length === 0 ? (

          <h2>No Products Found</h2>

        ) : (

          filteredProducts.map((product) => (

            <div
              className="product-card"
              key={product._id}
            >

              <img
                src={
                  imageMap[product.image] ||
                  bangle
                }
                alt={product.name}
              />

              <h2>{product.name}</h2>

              <p>{product.category}</p>

              <h3>₹{product.price}</h3>

              <p>{product.description}</p>

              <p>
                <strong>Stock:</strong>{" "}
                {product.stock}
              </p>

              <div className="btn-group">

                <Link
                  to={`/products/${product._id}`}
                >
                  <button className="view-btn">
                    View
                  </button>
                </Link>

                <button
                  className="edit-btn"
                  onClick={() =>
                    handleEdit(product)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(product._id)
                  }
                >
                  Delete
                </button>

                <button
                  className="cart-btn"
                  onClick={() =>
                    addToCart(product)
                  }
                >
                  Add To Cart
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Shop;