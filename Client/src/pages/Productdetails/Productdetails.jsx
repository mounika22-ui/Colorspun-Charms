import "./Productdetails.css";
import product from "../../assets/images/bangle.jpg";

function Productdetails() {
  return (
    <div className="product-details">

      <div className="product-image">
        <img src={product} alt="Thread Bangles" />
      </div>

      <div className="product-info">

        <h1>Handmade Thread Bangles</h1>

        <h2>₹199</h2>

        <p>
          Beautiful handmade thread bangles crafted with premium silk thread.
          Lightweight, elegant and perfect for festivals, weddings and gifting.
        </p>

        <button>Add to Cart</button>

      </div>

    </div>
  );
}

export default Productdetails;