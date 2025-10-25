import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaTicketAlt, FaChartBar } from "react-icons/fa";


const Foot= () => {
  return (
    <footer className="footer-nav">
      <NavLink to="/dashboard" className="nav-item">
        <FaHome className="icon" />
        <span>Home</span>
      </NavLink>

      <NavLink to="/tickets" className="nav-item">
        <FaTicketAlt className="icon" />
        <span>New Ticket</span>
      </NavLink>

      <NavLink to="/mine" className="nav-item">
        <FaChartBar className="icon" />
        <span>My Tickets</span>
      </NavLink>
    </footer>
  );
};

export default Foot;
