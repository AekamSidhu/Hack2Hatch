import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, TextField, Button,
  Paper, Stepper, Step, StepLabel, Grid,
  FormControlLabel, Checkbox, Divider, FormControl, FormLabel, Radio, RadioGroup, Alert
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useAuth } from '../context/AuthContext';

const steps = ['Account Setup', 'Personal Information', 'Preferences'];

const RegistrationPage = () => { // Ensure proper function declaration

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    title: '',
    company: '',
    location: '',
    userType: 'mentee',
    skills: '',
    bio: '',
    agreeTerms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => { // Ensure proper function declaration

    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleNext = () => { // Ensure proper function declaration

    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => { // Ensure proper function declaration

    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => { // Ensure proper function declaration

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (activeStep === steps.length - 1 && !formData.agreeTerms) {
      return setError('You must agree to the terms and conditions.');
    }


    setError('');
    setLoading(true);

    try {
      console.log("📩 Registration Data:", {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        isMentor: formData.userType !== 'mentee',
        title: formData.title,
        company: formData.company,
        location: formData.location,
        skills: formData.skills,
        bio: formData.bio
      }); // Debug registration data

      await register({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        isMentor: formData.userType !== 'mentee',
        title: formData.title,
        company: formData.company,
        location: formData.location,
        skills: formData.skills,
        bio: formData.bio
      });

      navigate('/profile'); // Navigate to profile page after successful registration





    } catch (err) {
      console.error("❌ Registration Error:", err); // Debug error
      setError(err.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = (step) => { // Ensure proper function declaration

    switch (step) {
      case 0:
        return (
          <Box>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
          </Box>
        );
      case 1:
        return (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <TextField
              margin="normal"
              fullWidth
              id="title"
              label="Professional Title"
              name="title"
              placeholder="e.g. Software Developer, Product Manager"
              value={formData.title}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="company"
              label="Company/Organization"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="location"
              label="Location"
              name="location"
              placeholder="City, Country"
              value={formData.location}
              onChange={handleChange}
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">I want to join as a:</FormLabel>
              <RadioGroup name="userType" value={formData.userType} onChange={handleChange}>
                <FormControlLabel value="mentee" control={<Radio />} label="Mentee (I'm looking for guidance)" />
                <FormControlLabel value="mentor" control={<Radio />} label="Mentor (I want to help others)" />
                <FormControlLabel value="both" control={<Radio />} label="Both (I want to mentor and be mentored)" />
              </RadioGroup>
            </FormControl>
            
            <TextField
              margin="normal"
              fullWidth
              id="skills"
              label="Your Skills (comma-separated)"
              name="skills"
              placeholder="e.g. JavaScript, Product Management, Data Analysis"
              value={formData.skills}
              onChange={handleChange}
            />
            
            <TextField
              margin="normal"
              fullWidth
              multiline
              rows={4}
              id="bio"
              label="Short Bio"
              name="bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={handleChange}
            />
            
            <FormControlLabel
              control={<Checkbox name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} color="primary" />}
              label="I agree to the Terms of Service and Privacy Policy"
              sx={{ mt: 2 }}
            />
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Join Mentor Connect
        </Typography>

        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {getStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
            {activeStep === steps.length - 1 ? 'Create Account' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegistrationPage;
