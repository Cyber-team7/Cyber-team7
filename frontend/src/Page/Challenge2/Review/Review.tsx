import { useEffect, useState } from "react";
import "./Review.css";

// Imported Images
import user1 from "../../../assets/user (1).jpg";
import user2 from "../../../assets/user (2).png";
import user3 from "../../../assets/user (3).png";
import cookie from "../../../assets/cookiecookie.jpg";

import Aos from "aos";
import "aos/dist/aos.css";

// Import Services
import { getSymmetricData } from "../../../services";
import { message } from "antd";

const Review = () => {
  const [symmetricData, setSymmetricData] = useState<{
    plainText: string;
    encryptedText: string;
    secretKey: string;
  } | null>(null);

  useEffect(() => {
    Aos.init({ duration: 2000 });

    // Fetch Symmetric Data
    const fetchSymmetricData = async () => {
      const data = await getSymmetricData();
      if (data) {
        setSymmetricData(data); // เก็บข้อมูลใน state
      } else {
        console.error("Failed to fetch symmetric data");
      }
    };

    fetchSymmetricData();
  }, []);

  const handleHint = () => {
    message.info("https://www.devglan.com/online-tools/text-encryption-decryption?fbclid=IwY2xjawH7WDxleHRuA2FlbQIxMAABHRcRTuslkqP__bX69WMMu5-iU-fBQ7jZEcXFWbKsql1zXX_uNC8pfgWmYQ_aem__rOdWcKo1ayMcMObRgTgyw#google_vignette");
  };

  return (
    <div className="review section">
      <div className="secContainer">
        <center className="secTitle" style={{ marginBottom: "50px" }}>
          Game Two : What People Say
          <p style={{ color: "gray", fontSize: "16px" }}>
            Symmetric cryptography Example Game!
          </p>
        </center>

        <div className="reviewContainer container grid">
          <div
            data-aos="fade-up"
            data-aos-duration="3000"
            className="singleReview"
          >
            <div className="imgDiv">
              <img src={user1} alt="User 1" />
            </div>

            <p>
              สวัสดีทุกคน ฉันต้องการให้ช่วยหาสถานที่ในมหาลัยหน่อยได้ไหม?
            </p>

            <div className="name">Bob</div>
          </div>

          <div
            data-aos="fade-up"
            data-aos-duration="3500"
            className="singleReview"
          >
            <div className="imgDiv">
              <img src={user2} alt="User 2" />
            </div>

            <p>
              ฉันพอมีข้อมูลอยู่บางส่วน หวังว่าจะช่วยได้นะ
              <p>
                <strong>
                  {symmetricData ? symmetricData.encryptedText : "Loading..."}
                </strong>
              </p>
              <button
                className="btn flex"
                onClick={handleHint} // Call the function directly
              >
                Hint
              </button>
            </p>

            <div className="name">Eve</div>
          </div>

          <div
            data-aos="fade-up"
            data-aos-duration="4000"
            className="singleReview"
          >
            <div className="imgDiv">
              <img src={user3} alt="User 3" />
            </div>

            <p>
              ฉันเผลอทำกุญแจหาย มีใครเห็นกุญแจฉันไหม{" "}
              <img src={cookie} alt="cookiecookie" />
            </p>

            <div className="name">Alice</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
