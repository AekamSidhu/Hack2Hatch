import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/navbar.jsx";
import HomePage from "./pages/homepage.jsx";
import MentorFinderPage from "./pages/mentorpage.jsx";
import ProfilePage from "./pages/profilepage.jsx";
import RegistrationPage from "./pages/registrationpage.jsx";
import LoginPage from "./pages/loginpage.jsx";
import SurveyPage from "./pages/SurveyPage.jsx";
import MentorMatchesPage from "./pages/MentorMatchesPage.jsx";
import Footer from "./components/footer.jsx";
import { AuthProvider } from "./context/AuthContext"; // Keep AuthProvider for authentication context
import "./App.css";

function App() {
  // Retrieve dark mode preference from localStorage or default to dark mode
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Retrieve login status from localStorage or default to false
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  // Save dark mode and login status to localStorage when they change
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [darkMode, isLoggedIn]);

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Create theme dynamically based on darkMode state
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#121212" : "#ffffff",
        paper: darkMode ? "#1e1e1e" : "#f5f5f5",
      },
      text: {
        primary: darkMode ? "#ffffff" : "#000000",
        secondary: darkMode ? "#b0b0b0" : "#333333",
      },
      primary: {
        main: darkMode ? "#bb86fc" : "#6200ea",
      },
      secondary: {
        main: darkMode ? "#03dac6" : "#018786",
      },
    },
  });

  return (
    <AuthProvider> {/* Ensure authentication context is available */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          {/* Navbar */}
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

          {/* Main Content */}
          <main className="main-content" style={{ width: "100vw", overflowX: "hidden" }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/find-mentor" element={<SurveyPage />} /> {/* Uses SurveyPage for mentor search */}
              <Route path="/mentor-matches" element={<MentorMatchesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
