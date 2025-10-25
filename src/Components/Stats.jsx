import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Stats = () => {
  const [stats, setStats] = useState({ total: 0, open: 0, resolved: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserTickets = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        // Get current user's record (including tickets)
        const res = await axios.get(`http://localhost:5000/users/${user.id}`);
        const tickets = res.data.tickets || [];

        const total = tickets.length;
        const open = tickets.filter((t) => t.status === "Open").length;
        const resolved = tickets.filter((t) => t.status === "Resolved").length;

        setStats({ total, open, resolved });
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchUserTickets();
  }, []);

  return (
    <section className="stats-container">
      <div className="stats">
        <div className="stat-card">
          <h3>{stats.total}</h3>
          <p>Total Tickets</p>
        </div>
        <div className="stat-card">
          <h3>{stats.open}</h3>
          <p>Open Tickets</p>
        </div>
        <div className="stat-card">
          <h3>{stats.resolved}</h3>
          <p>Resolved Tickets</p>
        </div>
      </div>

      <div className="manage-btn-wrap">
        <button className="manage-btn" onClick={() => navigate("/tickets")}>
          Manage Tickets
        </button>
      </div>
    </section>
  );
};

export default Stats;
