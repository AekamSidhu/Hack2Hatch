// src/components/Footer.jsx
import React from 'react';
import { Box, Container, Typography, Grid, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 6, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Mentor Connect
            </Typography>
            <Typography variant="body2">
              Connecting mentors and mentees to foster growth and learning in the professional world.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Typography variant="body2" display="block" gutterBottom>
              <Link href="/" color="inherit" underline="hover">
                Home
              </Link>
            </Typography>
            
            <Typography variant="body2" display="block" gutterBottom>
              <Link href="/find-mentor" color="inherit" underline="hover">
                Find Mentors
              </Link>
            </Typography>
            <Typography variant="body2" display="block" gutterBottom>
              <Link href="/register" color="inherit" underline="hover">
                Join Now
              </Link>
            </Typography>
            <Typography variant="body2" display="block" gutterBottom>
              <Link href="#" color="inherit" underline="hover">
                About Us
              </Link>
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" gutterBottom>
              Have questions or feedback? Reach out to us at:
            </Typography>
            <Typography variant="body2" gutterBottom>
              support@mentorboat.com
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Mentor Connect
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;