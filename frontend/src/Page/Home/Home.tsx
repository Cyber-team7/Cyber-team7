import { useEffect } from "react";
import "./home.css";
import Aos from "aos";
import "aos/dist/aos.css";
import Challenge1 from "../Challenge1/Offer";
import Challenge2 from "../Challenge2/Discount";
import AA from "../aa";

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
              Team 7 Cookie Cookie
            </p>
          </div>
        </div>
      </section>
      <Challenge1 />
      <Challenge2/>
      <AA/>
    </>
  );
};

export default Home;
