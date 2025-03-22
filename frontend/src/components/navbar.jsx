// src/components/navbar.jsx

import React from "react";
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
import { Link, useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          MentorConnect
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button color="inherit" component={Link} to="/find-mentor">
            Find Mentors
          </Button>

          {isAuthenticated ? (
            <>
              <IconButton color="inherit">
                <Badge badgeContent={0} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Button color="inherit" component={Link} to="/profile">
                {currentUser?.name || 'Profile'}
              </Button>
              <Button color="inherit" onClick={() => {
                logout();
                navigate('/');
              }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}

          <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
            {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              color="default"
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;