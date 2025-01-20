import React, { useState } from 'react';
import { Card, Input, Button, Modal } from 'antd';
import gray from "../../assets/gray.png"
import hat from "../../assets/hat.jpg"
import hack from "../../assets/hack.jpg"

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
  const [plainText, setPlainText] = useState('cookie'); // ตัวอย่าง Plain Text ที่ถูกต้อง
  const [inputValue, setInputValue] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = () => {
    if (inputValue === "cookie") {
      setFeedback(null); // ล้างข้อความแจ้งเตือน
      setIsModalVisible(true); // แสดง Pop-up
    } else {
      setFeedback('Incorrect. Try again! ❌');
    }
  };

  const handleSubmit2 = () => {
    if (inputValue === "cookie") {
      setFeedback(null); // ล้างข้อความแจ้งเตือน
      setIsModalVisible(true); // แสดง Pop-up
    } else {
      setFeedback('Incorrect. Try again! ❌');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false); // ปิด Pop-up
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <center>
        <h1 style={{ color: '#3ab3a7', marginBottom: '20px' }}>This is the last game!</h1>
        <h3 style={{ color: '#7a7a7a', marginBottom: '40px' }}>
          Chose the correct Public key for Decrypt the Text
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
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: '40px',
        }}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <Card.Grid
            key={index}
            style={gridStyle}
            onClick={() => setInputValue(`PublicKey${index + 1}`)}
          >
            Public Key
          </Card.Grid>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <h3 style={{ color: '#3ab3a7' }}>Submit Your Answer to get next hint</h3>
        <Input
          placeholder="Enter Your Answer"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            width: '60%',
            margin: '20px auto',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '8px',
          }}
        />
      </div>
      <center>
        <Button
            type="primary"
            style={{
              backgroundColor: '#3ab3a7',
              border: 'none',
              fontSize: '16px',
              padding: '20px 30px',
              borderRadius: '8px',
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </center>
        {feedback && (
          <p
            style={{
              marginTop: '20px',
              fontSize: '18px',
              color: 'red',
            }}
          >
            {feedback}
          </p>
        )}

      {/* Modal Pop-up */}
      <Modal
        title="We want this in "
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <img
              src={gray}
              alt="Image 1"
              style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <img
              src={hat}
              alt="Image 2"
              style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <img
              src={hack}
              alt="Image 3"
              style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
            />
          </div>
          
        </div>
        <h3 style={{ color: '#7a7a7a', marginBottom: '40px' }}>
            Hint : 3 words
        </h3>
        <h1 style={{ color: '#3ab3a7', marginBottom: '20px' }}>What's you found?</h1>
        <Input
          placeholder="Enter Your Answer"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            width: '60%',
            margin: '20px auto',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '8px',
          }}
        />
        <Button
            type="primary"
            style={{
              backgroundColor: '#3ab3a7',
              border: 'none',
              fontSize: '16px',
              padding: '20px 30px',
              borderRadius: '8px',
              marginLeft:"5px"
            }}
            onClick={handleSubmit2}
          >
            Submit
        </Button>

      </Modal>
    </div>
  );
};

export default CipherGame;
