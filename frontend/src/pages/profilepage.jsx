import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login'); // Redirect to login if not authenticated
    } else {
      // Fetch user data if needed
      setUserData({
        name: currentUser.name,
        email: currentUser.email,
        // Add other user details as necessary
      });
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Profile
        </Typography>
        {userData ? (
          <div>
            <Typography variant="h6">Name: {userData.name}</Typography>
            <Typography variant="h6">Email: {userData.email}</Typography>
            {/* Display other user details here */}
            <Button variant="contained" color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <Typography variant="body1">Loading user data...</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ProfilePage;
