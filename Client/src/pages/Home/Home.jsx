import "./Home.css";
import Hero from "../../components/Hero/Hero";
import Categories from "../../components/Categories/Categories";
import bg from "../../assets/images/bg.jpg";

function Home() {
  return (
    <div
      className="home"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <Hero />
      <Categories />
    </div>
  );
}

export default Home;