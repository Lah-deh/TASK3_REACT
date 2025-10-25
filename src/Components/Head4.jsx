import React from "react";
import { useNavigate } from "react-router-dom";

const Head4 = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    navigate("/login");
  };

  return (
    <header className="dashboard-header">
      <h3 className="dashboard-title">TechWave </h3>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Head4;
