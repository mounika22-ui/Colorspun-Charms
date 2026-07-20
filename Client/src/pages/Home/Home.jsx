import "./Home.css";
import Hero from "../../components/Hero/Hero";
import Categories from "../../components/Categories/Categories";

function Home() {
  return (
    <div className="home">
      <Hero />
      <Categories />
    </div>
  );
}

export default Home;