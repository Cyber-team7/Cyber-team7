import { useEffect, useState } from "react";
import {
  getAsymmetricData,
  checkDecryptedText,
  checkFinalAnswer,
} from "./../../services/index";
import Aos from "aos";
import { Input, Button, notification, Spin } from "antd";

const AA = () => {
  const [encryptionText, setEncryptionText] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string[]>([]);
  const [decryptedText, setDecryptedText] = useState<string>("");
  const [finalAnswerText, setFinalAnswerText] = useState<string>("");
  const [finalAnswer, setFinalAnswer] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCheckDecryptedText = async () => {
    setLoading(true);
    try {
      const decryptedData = await checkDecryptedText(decryptedText);
      if (decryptedData) {
        setDecryptedText(decryptedData);
        notification.success({
            message: "Success",
            description: "Passssss !!!!!",
          });
      } else {
        notification.error({
          message: "Error",
          description: "Failed to fetch decrypted data",
        });
      }
    } catch (error) {
      console.error("Error sending decrypted text:", error);
      notification.error({
        message: "Error",
        description: "An error occurred while sending decrypted text",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckFinalAnswer = async () => {
    setLoading(true);
    try {
      const finalAnswerData = await checkFinalAnswer(finalAnswerText);
      if (finalAnswerData) {
        setFinalAnswer(finalAnswerData);
        notification.success({
            message: "Success",
            description: "Passssss !!!!!",
          });
      } else {
        notification.error({
          message: "Error",
          description: "Failed to fetch final answer",
        });
      }
    } catch (error) {
      console.error("Error sending final answer:", error);
      notification.error({
        message: "Error",
        description: "An error occurred while sending final answer",
      });
    } finally {
      setLoading(false);
    }
  };

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

  const handleDecryptedTextChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDecryptedText(e.target.value);
  };

  const handleFinalAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFinalAnswerText(e.target.value);
  };

  return (
    <>
      <div>{encryptionText}</div>

      <div>
        {publicKey.map((key, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <Button type="link" onClick={() => setDecryptedText(key)}>
              Public Key {index + 1}: {key}
            </Button>
          </div>
        ))}
      </div>

      <div>
        <Input
          placeholder="Enter decrypted text"
          value={decryptedText}
          onChange={handleDecryptedTextChange}
        />
      </div>
      <Button
        type="primary"
        onClick={handleCheckDecryptedText}
        loading={loading}
      >
        Check Decrypted Text
      </Button>

      <div>
        <Input
          placeholder="Enter final answer text"
          value={finalAnswerText}
          onChange={handleFinalAnswerChange}
        />
      </div>
      <Button type="primary" onClick={handleCheckFinalAnswer} loading={loading}>
        Check Final Answer
      </Button>

      {/* <div>{decryptedText || "No decrypted text"}</div>
      <div>
        {finalAnswer
          ? typeof finalAnswer === "object"
            ? finalAnswer.message // Assuming the object has a "message" property, adjust if necessary
            : finalAnswer
          : "No final answer"}
      </div> */}

      {loading && <Spin size="large" />}
    </>
  );
};

export default AA;
