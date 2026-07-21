import { useState, useEffect } from "react";
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

  const defaultProducts = [
    {
      id: 1,
      name: "Pink Thread Bangles",
      category: "Thread Bangles",
      price: "199",
      image: "bangle",
    },
    {
      id: 2,
      name: "Resin Keychain",
      category: "Resin",
      price: "149",
      image: "keychain",
    },
    {
      id: 3,
      name: "Resin Photo Frame",
      category: "Photo Frame",
      price: "599",
      image: "frame",
    },
  ];

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    id: null,
    name: "",
    category: "",
    price: "",
    image: "",
  });

  const [deletedProduct, setDeletedProduct] = useState(null);

  useEffect(() => {
  const savedProducts = JSON.parse(localStorage.getItem("products"));

  if (
    savedProducts &&
    Array.isArray(savedProducts) &&
    savedProducts.length > 0
  ) {
    setProducts(savedProducts);
  } else {
    setProducts(defaultProducts);
    localStorage.setItem(
      "products",
      JSON.stringify(defaultProducts)
    );
  }
}, []);


  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveActivity = (message) => {
    const activity =
      JSON.parse(localStorage.getItem("activity")) || [];

    activity.unshift(message);

    localStorage.setItem("activity", JSON.stringify(activity));
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.category.trim() ||
      !form.price
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (form.id === null) {
      const newProduct = {
        ...form,
        id: Date.now(),
        image: form.image || "bangle",
      };

      setProducts((prev) => [...prev, newProduct]);

      saveActivity("Added Product : " + form.name);

      alert("Product Added Successfully!");
    } else {
      const updatedProducts = products.map((product) =>
        product.id === form.id
          ? {
              ...form,
              image: form.image || "bangle",
            }
          : product
      );

      setProducts(updatedProducts);

      saveActivity("Updated Product : " + form.name);

      alert("Product Updated Successfully!");
    }

    setForm({
      id: null,
      name: "",
      category: "",
      price: "",
      image: "",
    });
  };

  const handleEdit = (product) => {
    setForm(product);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) {
      const productToDelete = products.find(
        (p) => p.id === id
      );

      setDeletedProduct(productToDelete);

      setProducts(products.filter((p) => p.id !== id));

      saveActivity(
        "Deleted Product : " + productToDelete.name
      );

      alert("Product Deleted Successfully!");
    }
  };

  const handleUndo = () => {
    if (deletedProduct) {
      setProducts((prev) => [...prev, deletedProduct]);

      saveActivity(
        "Restored Product : " + deletedProduct.name
      );

      setDeletedProduct(null);

      alert("Product Restored!");
    }
  };
  const addToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find(
    (item) => item.id === product.id
  );

  if (existingProduct) {
    existingProduct.quantity =
      (existingProduct.quantity || 1) + 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Product Added to Cart!");
};

  const exportProducts = () => {
    const blob = new Blob(
      [JSON.stringify(products, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "products.json";

    link.click();

    URL.revokeObjectURL(url);
  };

  const importProducts = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const importedProducts = JSON.parse(
          e.target.result
        );

        const updatedProducts = importedProducts.map(
          (product) => ({
            ...product,
            image: product.image || "bangle",
          })
        );

        setProducts(updatedProducts);

        saveActivity("Imported Products");

        alert("Products Imported Successfully!");
      } catch {
        alert("Invalid JSON File");
      }
    };

    reader.readAsText(file);
  };

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
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
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

      <div className="crud-actions">
        <button
          className="export-btn"
          onClick={exportProducts}
        >
          Export JSON
        </button>

        <label className="import-btn">
          Import JSON
          <input
            type="file"
            accept=".json"
            hidden
            onChange={importProducts}
          />
        </label>

        {deletedProduct && (
          <button
            className="undo-btn"
            onClick={handleUndo}
          >
            Undo Delete
          </button>
        )}
      </div>

      <div className="products">
        {filteredProducts.length === 0 ? (
          <h2>No Products Found</h2>
        ) : (
          filteredProducts.map((product) => (
            <div
              className="product-card"
              key={product.id}
            >
              <img
                src={
                  imageMap[product.image] || bangle
                }
                alt={product.name}
              />

              <h2>{product.name}</h2>

              <p>{product.category}</p>

              <h3>₹{product.price}</h3>

              <div className="btn-group">
  <button
    className="edit-btn"
    onClick={() => handleEdit(product)}
  >
    Edit
  </button>

  <button
    className="delete-btn"
    onClick={() => handleDelete(product.id)}
  >
    Delete
  </button>

  <button
    className="cart-btn"
    onClick={() => addToCart(product)}
  >
    Add to Cart
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