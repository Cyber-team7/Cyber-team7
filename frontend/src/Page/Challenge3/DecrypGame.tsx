import React, { useEffect, useState } from "react";
import { Card, Input, Button, Modal, notification, message } from "antd";
import gray from "../../assets/gray.png";
import hat from "../../assets/hat.jpg";
import hack from "../../assets/hack.jpg";
import Aos from "aos";
import { getAsymmetricData, checkDecryptedText, checkFinalAnswer } from "../../services";

const gridStyle: React.CSSProperties = {
  width: '30%',
  textAlign: 'center',
  padding: '20px',
  cursor: 'pointer',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  margin: '10px',
  backgroundColor: '#f9f9f9',
};


const CipherGame: React.FC = () => {
  const [encryptionText, setEncryptionText] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string[]>([]);
  const [decryptedText, setDecryptedText] = useState<string>("");
  const [finalAnswerText, setFinalAnswerText] = useState<string>("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    Aos.init({ duration: 2000 });

    const fetchData = async () => {
      try {
        const data = await getAsymmetricData();
        if (data) {
          setEncryptionText(data.encryptedText);
          setPublicKey(data.publicKey);
        }
      } catch (error) {
        console.error("Error fetching asymmetric data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCheckDecryptedText = async () => {
    setLoading(true);
    try {
      const decryptedData = await checkDecryptedText(decryptedText);
      if (decryptedData) {
        notification.success({
          message: "Success",
          description: "Decrypted text is correct!",
        });
        setIsModalVisible(true);
      } else {
        setFeedback("Incorrect. Try again! ❌");
      }
    } catch (error) {
      console.error("Error verifying decrypted text:", error);
      notification.error({
        message: "Error",
        description: "An error occurred while verifying decrypted text.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckFinalAnswer = async () => {
    setLoading(true); // เริ่มโหลด
    try {
      const finalAnswerData = await checkFinalAnswer(finalAnswerText); // เรียกฟังก์ชันตรวจสอบคำตอบ
      if (finalAnswerData) {
        notification.success({
          message: "Success 🎉",
          description: "Final answer is correct!🎉",
        });
        setIsModalVisible(false); // ปิด Modal
      } else {
        notification.error({
          message: "Error",
          description: "Final answer is incorrect.",
        });
      }
    } catch (error) {
      console.error("Error verifying final answer:", error);
      notification.error({
        message: "Error",
        description: "An error occurred while verifying the final answer. Please try again.",
      });
    } finally {
      setLoading(false); // จบการโหลด
    }
  };
  

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCopyText = () => {
    if (decryptedText) {
      navigator.clipboard.writeText(decryptedText);
      notification.success({
        message: "Copied!",
        description: "The text has been copied to the clipboard.",
      });
    } else {
      notification.warning({
        message: "No Text",
        description: "Please enter some text to copy.",
      });
    }
  };

  const handleHint = () => {
    message.info("https://www.devglan.com/online-tools/rsa-encryption-decryption");
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <center>
        <h1 style={{ color: "#3ab3a7", marginBottom: "20px" }}>This is the last game!</h1>
        <h3 style={{ color: "#7a7a7a", marginBottom: "40px" }}>
          Choose the correct Public key to Decrypt the Text
        </h3>
      </center>

      <Card
        style={{
          margin: '0 auto',
          maxWidth: '900px',
          backgroundColor: '#f4faff',
          borderRadius: '12px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        }}
      >
        <center>
          <h2 style={{ color: '#3ab3a7' }}>Decrypt the Text</h2>
          <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.8' }}>
            u5a0V3VcOuaTfIiNXuVcCBP4cXHKuENuNEPIyJqzVk+7WovxbGxkI2YFEf0rgms6GmEb3O+OOCTyaOdLZhnmlY
            qJiPtorf9THELRL8rDBt/LBIrb9q2BniXbazTGY+Z94gDOvot+r4ca7Dkz5Vsv9LmYpDcv9K7aLHdrUcvy9x9dW77D7o
            6hB0+qfgwZLuioq/t/ooUNPdCr4KkBTqVHA5Va2M7TukdahkNhl/mHvNIDU5XcpVMwDPx6gVTLzgMtaOkrTJhEzD
            uWnrjwtu2a24OG3OcHPIUlPLiNYn7np9yk8B0T+pcJNpKPxXbyvZyS/N0XREL6PixduppISDlfjQ==
          </p>
        </center>
      </Card>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        {publicKey.map((key, index) => (
          <Card.Grid
            key={index}
            style={gridStyle}
            onClick={() => setDecryptedText(key)}
          >
            Public Key {index + 1}
          </Card.Grid>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "40px" }}>
    
        
      
        <h3 style={{ color: "#3ab3a7" }}>Submit Your Answer to get next hint</h3>

          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <button
              className="btn flex"
                onClick={handleHint} // Call the function directly
              >
               Hint
            </button>
          </div>
        <Input
          placeholder="Enter Your Answer"
          value={decryptedText}
          onChange={(e) => setDecryptedText(e.target.value)}
          style={{
            width: "60%",
            margin: "20px auto",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
          }}
        />

      <Button
        type="primary"
        style={{
          marginLeft: "10px",
          backgroundColor: "#3ab3a7",
          border: "none",
          fontSize: "16px",
          padding: "10px 20px",
          borderRadius: "8px",
        }}
        onClick={handleCopyText}
      >
        Copy
      </Button>

        <Button
          type="primary"
          style={{
            marginLeft: "10px",
            backgroundColor: "#3ab3a7",
            border: "none",
            fontSize: "16px",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
          onClick={handleCheckDecryptedText}
          loading={loading}
        >
          Submit
        </Button>
          <Button
            type="primary"
            style={{
              marginLeft: "10px",
              backgroundColor: "#f44336",
              border: "none",
              fontSize: "16px",
              padding: "10px 20px",
              borderRadius: "8px",
            }}
            onClick={() => setDecryptedText("")}
          >
            Clear
        </Button>
        {feedback && (
          <p
            style={{
              marginTop: "20px",
              fontSize: "18px",
              color: "red",
            }}
          >
            {feedback}
          </p>
        )}
      </div>

      {/* Modal Pop-up */}
      <Modal
        title="We want this in"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
        width="800px"
        bodyStyle={{ padding: "30px" }} 
      >
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", gap: "20px" }}>
          <div style={{ textAlign: "center" }}>
            <img
              src={gray}
              alt="Image 1"
              style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
            />
            <p>Xxxx</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <img
              src={hat}
              alt="Image 2"
              style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
            />
            <p>xxx</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <img
              src={hack}
              alt="Image 3"
              style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
            />
            <p>xxxxxxx</p>
          </div>
        </div>

        <h3 style={{ color: "#7a7a7a", marginBottom: "10px", marginTop:"40px" }}>Hint: คุณสามารถหาสิ่งนี้ได้จากคำตอบที่เป็น Link ก่อนหน้านี้</h3>
        <Input
          placeholder="Enter Your Final Answer"
          value={finalAnswerText}
          onChange={(e) => setFinalAnswerText(e.target.value)}
          style={{
            width: "60%",
            margin: "20px auto",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
          }}
        />
        <Button
          type="primary"
          style={{
            backgroundColor: "#3ab3a7",
            border: "none",
            fontSize: "16px",
            padding: "20px 30px",
            borderRadius: "8px",
          }}
          onClick={handleCheckFinalAnswer}
          loading={loading}
        >
          Submit
        </Button>
      </Modal>
    </div>
  );
};

export default CipherGame;
