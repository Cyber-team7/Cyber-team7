import { useEffect } from "react";
import "./home.css";
import Aos from "aos";
import "aos/dist/aos.css";
import Challenge1 from "../Challenge1/Offer";
import Challenge2 from "../Challenge2/Discount";
// import AA from "../Challenge3/test";
import Challenge3 from "../Challenge3/DecrypGame";

const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <>
      <section className="home">
        <div className="secContainer container">
          <div className="homeText">
            <h1 data-aos="fade-up" data-aos-duration="2000" className="title">
            Welcome to the game
            </h1>
            <p data-aos="fade-up" data-aos-duration="2500" className="subTitle">
              Team 7 cookiecookie
            </p>
          </div>
        </div>
      </section>
      <Challenge1 />
      <Challenge2/>
      <Challenge3/>
    </>
  );
};

export default Home;
