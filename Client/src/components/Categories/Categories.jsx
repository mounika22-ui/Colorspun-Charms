
import "./Categories.css";

import bangle from "../../assets/images/bangle.jpg";
import resin from "../../assets/images/resin.jpg";
import keychain from "../../assets/images/keychain.jpg";
import frame from "../../assets/images/frame.jpg";
import jewellery from "../../assets/images/jewellery.jpg";
import gifts from "../../assets/images/gifts.jpg";

function Categories() {
  const categories = [
    {
      name: "Thread Bangles",
      image: bangle,
    },
    {
      name: "Resin Keychains",
      image: keychain,
    },
    {
      name: "Photo Frames",
      image: frame,
    },
    {
      name: "Resin Jewellery",
      image: jewellery,
    },
    {
      name: "Customized Gifts",
      image: gifts,
    },
    {
      name: "Resin Art",
      image: resin,
    },
  ];

  return (
    <section className="categories">

      <h2>Shop By Category</h2>

      <div className="category-container">

        {categories.map((item, index) => (
          <div className="category-card" key={index}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
          </div>
        ))}

      </div>

    </section>
  );
}

export default Categories;