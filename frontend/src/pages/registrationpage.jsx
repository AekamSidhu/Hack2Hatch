import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container, Paper, Alert, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isMentor: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'isMentor' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setError('');
    setLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        isMentor: formData.isMentor, // Role is handled inside authService.js
      });
      navigate('/profile');
    } catch (err) {
      setError(err.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        
        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox name="isMentor" checked={formData.isMentor} onChange={handleChange} color="primary" />}
            label="Register as a Mentor"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegistrationPage;
