import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, TextField, Button,
  Paper, Divider, Grid, Alert
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/profile');
    } catch (err) {
      <Link to="/profile" style={{ textDecoration: 'none' }}>;
      </Link>;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Log in to Mentor Connect
        </Typography>

        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}

        <Box sx={{ mt: 4, mb: 3 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </Box>

        <Typography align="center">
          <Link to="#" style={{ textDecoration: 'none' }}>
            Forgot password?
          </Link>
        </Typography>

        <Divider sx={{ my: 3 }}>
          <Typography color="textSecondary" variant="body2">OR</Typography>
        </Divider>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} sx={{ py: 1 }}>
              Google
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth variant="outlined" startIcon={<LinkedInIcon />} sx={{ py: 1 }}>
              LinkedIn
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth variant="outlined" startIcon={<GitHubIcon />} sx={{ py: 1 }}>
              GitHub
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link to="/register" style={{ textDecoration: 'none' }}>
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;