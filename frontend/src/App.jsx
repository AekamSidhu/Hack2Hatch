import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/navbar.jsx";
import HomePage from "./pages/homepage.jsx";
import MentorFinderPage from "./pages/mentorpage.jsx";
import ProfilePage from "./pages/profilepage.jsx";
import RegistrationPage from "./pages/registrationpage.jsx";
import LoginPage from "./pages/loginpage.jsx";
import Footer from "./components/footer.jsx";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
    <AuthProvider> {/* Wrap everything inside AuthProvider */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="main-content" style={{ width: "100vw", overflowX: "hidden" }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/find-mentor" element={<MentorFinderPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
