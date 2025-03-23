import React from 'react';
import { Box, Container, Typography, Grid, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        background: 'linear-gradient(45deg, #6a11cb 30%, #2575fc 90%)', // Gradient Background
        color: 'white', 
        py: 6, 
        mt: 'auto' 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Mentor Connect - About Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
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
          
          {/* Quick Links Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
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
              <Link href="/about" color="inherit" underline="hover">
                About Us
              </Link>
            </Typography>
          </Grid>
          
          {/* Contact Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Contact Us
            </Typography>
            <Typography variant="body2" gutterBottom>
              Have questions or feedback? Reach out to us at:
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Link href="mailto:support@mentorconnect.com" color="inherit" underline="hover">
                support@mentorconnect.com
              </Link>
            </Typography>
          </Grid>
        </Grid>

        {/* Footer Copyright */}
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
