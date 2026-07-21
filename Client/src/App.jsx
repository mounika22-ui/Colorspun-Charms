import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Cart from "./pages/Cart/Cart";
import Productdetails from "./pages/Productdetails/Productdetails";
import Contact from "./pages/Contact/Contact";
import Profile from "./pages/Profile/Profile";
import Orders from "./pages/Orders/Orders";
import Checkout from "./pages/Checkout/Checkout";

import "./App.css";

// Track last visited page
function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    sessionStorage.setItem("lastPage", location.pathname);
  }, [location]);

  return null;
}

function App() {
  return (
    <BrowserRouter>

      <RouteTracker />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<Productdetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;