import { useEffect, useState } from "react";
import api from "../../api/api";
import "./Orders.css";

import bangle from "../../assets/images/bangle.jpg";
import keychain from "../../assets/images/keychain.jpg";
import frame from "../../assets/images/frame.jpg";

function Orders() {
  const imageMap = {
    bangle,
    keychain,
    frame,
  };

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
      alert("Unable to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const getStatus = (status) => {
    switch (status) {
      case "Pending":
        return (
          <span className="status pending">
            🟡 Pending
          </span>
        );

      case "Processing":
        return (
          <span className="status processing">
            🔵 Processing
          </span>
        );

      case "Shipped":
        return (
          <span className="status shipped">
            🚚 Shipped
          </span>
        );

      case "Delivered":
        return (
          <span className="status delivered">
            ✅ Delivered
          </span>
        );

      case "Cancelled":
        return (
          <span className="status cancelled">
            ❌ Cancelled
          </span>
        );

      default:
        return <span>{status}</span>;
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Orders...</h2>;
  }

  return (
    <div className="orders">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <h3>Order ID : {order._id}</h3>

            <p>
              <strong>Order Status : </strong>
              {getStatus(order.status)}
            </p>

            <p>
              <strong>Total Amount : </strong>
              ₹{order.totalAmount}
            </p>

            <h4>Products</h4>

            {order.products.map((item) => (
              <div
                className="order-product"
                key={item._id || item.productId?._id}
              >
                <img
                  src={imageMap[item.productId?.image] || bangle}
                  alt={item.productId?.name}
                  width="120"
                />

                <div>
                  <h3>{item.productId?.name}</h3>

                  <p>{item.productId?.category}</p>

                  <p>Price : ₹{item.productId?.price}</p>

                  <p>Quantity : {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;