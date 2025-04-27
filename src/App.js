import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import DataSensor from "./pages/DataSensor";
import ActionHistory from "./pages/ActionHistory";
import Login from "./pages/Login";
import useLimitedArray from "./config/useLimitedArray";
import {jwtDecode} from "jwt-decode";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    }
    setLoading(false);
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App flex">
      {isAuthenticated ? (
        <>
          <div className="w-[20%] h-screen sticky top-0">
            <Sidebar />
          </div>
          <div className="w-[80%] overflow-y-auto">
            <Routes>
              <Route
                path="/"
                element={
                    <Dashboard />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/datasensor"
                element={
                  <ProtectedRoute>
                    <DataSensor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/actionhistory"
                element={
                  <ProtectedRoute>
                    <ActionHistory />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </>
      ) : (
        <div className="w-[100%]">
          <Routes>
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
