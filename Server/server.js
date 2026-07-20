import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
connectDB();

// Logging Middleware
app.use((req, res, next) => {
    console.log(
        `${new Date().toLocaleString()} | ${req.method} | ${req.url}`
    );
    next();
});

// Sample Data
let products = [
    {
        id: 1,
        name: "Pink Thread Bangles",
        category: "Thread Bangles",
        price: 199
    },
    {
        id: 2,
        name: "Blue Thread Bangles",
        category: "Thread Bangles",
        price: 249
    },
    {
        id: 3,
        name: "Resin Keychain",
        category: "Resin",
        price: 149
    },
    {
        id: 4,
        name: "Resin Photo Frame",
        category: "Photo Frame",
        price: 599
    }
];

// Root Route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to ColorSpun Charms Backend API"
    });
});

// GET All Products
app.get("/products", (req, res) => {
    res.json(products);
});

// GET Product By ID
app.get("/products/:id", (req, res) => {

    const id = Number(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product Not Found"
        });
    }

    res.json(product);

});

// POST Product
app.post("/products", (req, res) => {

    const { name, category, price } = req.body;

    if (!name || !category || !price) {

        return res.status(400).json({
            message: "All fields are required"
        });

    }

    const newProduct = {

        id: products.length + 1,
        name,
        category,
        price

    };

    products.push(newProduct);

    res.status(201).json({

        message: "Product Added Successfully",
        product: newProduct

    });

});

// PUT Product
app.put("/products/:id", (req, res) => {

    const id = Number(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {

        return res.status(404).json({
            message: "Product Not Found"
        });

    }

    product.name = req.body.name || product.name;
    product.category = req.body.category || product.category;
    product.price = req.body.price || product.price;

    res.json({

        message: "Product Updated Successfully",
        product

    });

});

// DELETE Product
app.delete("/products/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = products.findIndex(p => p.id === id);

    if (index === -1) {

        return res.status(404).json({

            message: "Product Not Found"

        });

    }

    const deletedProduct = products.splice(index, 1);

    res.json({

        message: "Product Deleted Successfully",
        product: deletedProduct

    });

});

// Search Product
app.get("/products/search/:name", (req, res) => {

    const name = req.params.name.toLowerCase();

    const result = products.filter(product =>
        product.name.toLowerCase().includes(name)
    );

    res.json(result);

});

// Filter By Category
app.get("/products/category/:category", (req, res) => {

    const category = req.params.category.toLowerCase();

    const result = products.filter(product =>
        product.category.toLowerCase() === category
    );

    res.json(result);

});

// Sort By Price
app.get("/products/sort/price", (req, res) => {

    const sorted = [...products].sort((a, b) => a.price - b.price);

    res.json(sorted);

});

// Invalid Route
app.use((req, res) => {

    res.status(404).json({

        message: "API Route Not Found"

    });

});

// Start Server
app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});