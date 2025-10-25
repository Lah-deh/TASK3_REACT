import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Head3 = () => {
  const navigate = useNavigate();

  return (
    <div className="head2">
      <button
        className="back"
        onClick={() => navigate(-1)}  
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center"
        }}
      >
        <IoIosArrowBack />
      </button>
      <h3>Login</h3>
    </div>
  );
};

export default Head3;
