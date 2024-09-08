import { Button } from "@nextui-org/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleButton = () => {
    setTimeout(() => {
      navigate("/auth/login");
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-100">
      <div className="w-[300px] space-y-4">
        <p
          className="text-3xl mb-4 text-center font-bold"
          style={{ textShadow: "2px 2px 4px #000" }}
        >
          ENIGMA LAUNDRY
        </p>
        <Button
          className="bg-gray-100 border-2 border-black hover:bg-black hover:text-white text-lg"
          size="lg"
          fullWidth
          style={{
            textShadow: "2px 2px 4px #000",
            borderStyle: "hidden",
          }}
          onPress={handleButton}
        >
          LOGIN
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
