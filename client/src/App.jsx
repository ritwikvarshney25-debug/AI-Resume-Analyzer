import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import History from "./pages/History";
import React, { useState, useEffect } from "react";

import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  return (
    <GoogleOAuthProvider clientId="ritwikvarshney25@gmail.com">
      <BrowserRouter>
        <Routes>
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
  path="/dashboard"
  element={
    <Dashboard
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />
  }
/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
        </Routes>
        
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}