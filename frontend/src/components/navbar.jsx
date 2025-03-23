import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Switch,
  Badge,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ darkMode, toggleDarkMode, isLoggedIn }) => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleFindMentorClick = () => {
    if (isLoggedIn) {
      navigate("/find-mentor"); // Redirect to survey page
    } else {
      navigate("/login"); // Redirect to login page
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "black", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo with Gradient Text */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            background: "linear-gradient(45deg, #6a11cb 30%, #2575fc 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          MentorConnect
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button sx={{ color: "white" }} component={Link} to="/">
            Home
          </Button>
          <Button sx={{ color: "white" }} onClick={handleFindMentorClick}>
            Find Mentor
          </Button>

          {isAuthenticated ? (
            <>
              <IconButton color="inherit">
                <Badge badgeContent={0} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Button sx={{ color: "white" }} component={Link} to="/profile">
                {currentUser?.name || "Profile"}
              </Button>
              <Button
                sx={{ color: "white", border: "1px solid white" }}
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button sx={{ color: "white" }} component={Link} to="/login">
                Login
              </Button>
              <Button sx={{ color: "white" }} component={Link} to="/register">
                Register
              </Button>
            </>
          )}

          {/* Light/Dark Mode Toggle */}
          <IconButton onClick={toggleDarkMode} sx={{ color: "white", mx: 1 }}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <Switch checked={darkMode} onChange={toggleDarkMode} color="default" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
