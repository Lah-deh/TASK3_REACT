import React, { useEffect, useState } from "react";
import axios from "axios";
import Toast from "../Components/Toast.jsx";

// API instance
const api = axios.create({
  baseURL: "https://mockdata-93rw.onrender.com",
});

const Card = () => {
  const [tickets, setTickets] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedTicket, setEditedTicket] = useState({});
  const [toast, setToast] = useState({ message: "", type: "" });

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch user's tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.get(`/users/${user.id}`);
        setTickets(res.data.tickets || []);
      } catch (error) {
        console.error(error);
        setToast({ message: "Failed to load tickets.", type: "error" });
      }
    };
    fetchTickets();
  }, [user.id]);

  // Delete ticket
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;

    try {
      const res = await api.get(`/users/${user.id}`);
      const updatedTickets = res.data.tickets.filter((t) => t.id !== id);

      await api.put(`/users/${user.id}`, {
        ...res.data,
        tickets: updatedTickets,
      });

      setTickets(updatedTickets);
      setToast({ message: "Ticket deleted successfully!", type: "success" });
    } catch (error) {
      console.error(error);
      setToast({ message: "Error deleting ticket.", type: "error" });
    }
  };

  // Edit ticket
  const handleEdit = (ticket) => {
    setEditingId(ticket.id);
    setEditedTicket(ticket);
  };

  // Save edited ticket
  const handleSave = async (id) => {
    try {
      const res = await api.get(`/users/${user.id}`);
      const updatedTickets = res.data.tickets.map((t) =>
        t.id === id ? editedTicket : t
      );

      await api.put(`/users/${user.id}`, {
        ...res.data,
        tickets: updatedTickets,
      });

      setTickets(updatedTickets);
      setEditingId(null);
      setToast({ message: "Ticket updated successfully!", type: "success" });
    } catch (error) {
      console.error(error);
      setToast({ message: "Error saving ticket.", type: "error" });
    }
  };

  return (
    <div className="ticket-container">
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "" })}
        />
      )}

      <h2>My Tickets</h2>

      <div className="ticket-grid">
        {tickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          tickets.map((ticket) => (
            <div key={ticket.id} className="ticket-card">
              {editingId === ticket.id ? (
                <>
                  <input
                    type="text"
                    value={editedTicket.title}
                    onChange={(e) =>
                      setEditedTicket({ ...editedTicket, title: e.target.value })
                    }
                    className="edit-input"
                  />
                  <textarea
                    rows="3"
                    value={editedTicket.description}
                    onChange={(e) =>
                      setEditedTicket({
                        ...editedTicket,
                        description: e.target.value,
                      })
                    }
                    className="edit-input"
                  />
                  <select
                    value={editedTicket.priority}
                    onChange={(e) =>
                      setEditedTicket({
                        ...editedTicket,
                        priority: e.target.value,
                      })
                    }
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  <select
                    value={editedTicket.status}
                    onChange={(e) =>
                      setEditedTicket({
                        ...editedTicket,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>

                  <div className="card-actions">
                    <button onClick={() => handleSave(ticket.id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <h3>{ticket.title}</h3>
                  <p>{ticket.description}</p>
                  <p>
                    <strong>Priority:</strong> {ticket.priority}
                  </p>
                  <p>
                    <strong>Status:</strong> {ticket.status}
                  </p>
                  <p className="timestamp">
                    {new Date(ticket.createdAt).toLocaleString()}
                  </p>

                  <div className="card-actions">
                    <button onClick={() => handleEdit(ticket)}>Edit</button>
                    <button onClick={() => handleDelete(ticket.id)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Card;
