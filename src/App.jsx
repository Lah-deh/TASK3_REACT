import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Tickets from "./Pages/Tickets.jsx";
import Mine from "./Pages/Mine.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <Tickets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mine"
          element={
            <ProtectedRoute>
              <Mine />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
