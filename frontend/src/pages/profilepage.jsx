import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Box, Avatar, Button, TextField, Grid, Tabs, Tab, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { updateUserProfile } from '../services/userService';
import { getUserSessions } from '../services/sessionService';
import { getConversations } from '../services/messageService';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
  });
  const [sessions, setSessions] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser) {
      setProfileData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        bio: currentUser.bio || '',
      });

      fetchUserData();
    }
  }, [currentUser]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      console.log("Fetching user sessions...");
      const sessionsResponse = await getUserSessions(currentUser?._id);
      console.log("Sessions response:", sessionsResponse);
      setSessions(sessionsResponse?.data || []); // Ensure an array

      console.log("Fetching user conversations...");
      const conversationsResponse = await getConversations(currentUser?._id);
      console.log("Conversations response:", conversationsResponse);
      setConversations(conversationsResponse?.data || []); // Ensure an array
    } catch (err) {
      setError('Failed to load user data');
      console.error("Error fetching data:", err);
      setSessions([]); 
      setConversations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleProfileUpdate = async () => {
    try {
      await updateUserProfile(profileData);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            sx={{ width: 100, height: 100, mr: 3 }}
            src={currentUser?.profilePicture}
          />
          <Box sx={{ flexGrow: 1 }}>
            {isEditing ? (
              <TextField
                fullWidth
                margin="normal"
                name="name"
                label="Name"
                value={profileData.name}
                onChange={handleInputChange}
              />
            ) : (
              <Typography variant="h4">{profileData.name}</Typography>
            )}
            <Typography variant="body1" color="text.secondary">
              {profileData.email}
            </Typography>
          </Box>
          <Box>
            {isEditing ? (
              <Button 
                variant="contained" 
                onClick={handleProfileUpdate}
                sx={{ mr: 1 }}
              >
                Save
              </Button>
            ) : (
              <Button 
                variant="outlined" 
                onClick={() => setIsEditing(true)}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
            )}
            <Button variant="outlined" color="error" onClick={logout}>
              Logout
            </Button>
          </Box>
        </Box>

        {isEditing && (
          <TextField
            fullWidth
            margin="normal"
            name="bio"
            label="Bio"
            multiline
            rows={4}
            value={profileData.bio}
            onChange={handleInputChange}
          />
        )}

        {!isEditing && profileData.bio && (
          <Typography variant="body1" paragraph>
            {profileData.bio}
          </Typography>
        )}

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 4 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Sessions" />
            <Tab label="Messages" />
            {currentUser?.isMentor && <Tab label="Mentor Profile" />}
          </Tabs>
        </Box>

        {/* Sessions Tab */}
        {activeTab === 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Your Sessions</Typography>
            {(sessions || []).length === 0 ? (
              <Typography>No sessions found.</Typography>
            ) : (
              <Grid container spacing={2}>
                {(sessions || []).map((session) => (
                  <Grid item xs={12} key={session._id}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="h6">{session.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(session.date).toLocaleString()}
                      </Typography>
                      <Typography variant="body2">Status: {session.status}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {/* Messages Tab */}
        {activeTab === 1 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Your Conversations</Typography>
            {(conversations || []).length === 0 ? (
              <Typography>No conversations found.</Typography>
            ) : (
              <Grid container spacing={2}>
                {(conversations || []).map((conversation) => {
                  const otherParticipant = conversation.participants?.[0] || {};
                  return (
                    <Grid item xs={12} key={conversation._id}>
                      <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                        <Avatar src={otherParticipant?.profilePicture} sx={{ mr: 2 }} />
                        <Box>
                          <Typography variant="subtitle1">
                            {otherParticipant?.name || "Unknown"}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {conversation.lastMessage?.text || "No messages yet"}
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ProfilePage;
