import "./Cart.css";

function Cart() {
  return (
    <div className="cart">

      <h1>Shopping Cart</h1>

      <div className="cart-item">

        <h3>Pink Thread Bangles</h3>

        <p>₹199</p>

        <button>Remove</button>

      </div>

      <h2>Total : ₹199</h2>

      <button className="checkout">
        Checkout
      </button>

    </div>
  );
}

export default Cart;