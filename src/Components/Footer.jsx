import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { BsLinkedin } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa6";
import { Link } from 'react-router-dom';




const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h2>TechWave</h2>
        </div>
        <div className="footer-links">
          <a href="/">Home</a>
          <Link to={"/Register"} >Register</Link>
          <Link to={"/Login"}>Login</Link>
        </div>
        <div className="footer-socials">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><BsLinkedin /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>
      </div>
      <p className="footer-copy">© 2025 TechWave. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
