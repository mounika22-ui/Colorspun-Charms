import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <h1>
          Handmade Thread Bangles <br />
          & Resin Creations
        </h1>

        <p>
          Welcome to <strong>ColorSpun Charms</strong> ✨
          <br />
          We create beautiful handmade thread bangles,
          resin keychains, name boards, photo frames,
          jewellery, rakhis and customized gifts
          crafted with love.
        </p>

        <Link to="/shop">
          <button>Shop Now</button>
        </Link>

      </div>

    </section>
  );
}

export default Hero;