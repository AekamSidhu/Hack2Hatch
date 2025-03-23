import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Box,
  Container,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { keyframes } from '@mui/system';
import effortImage from "../assets/effort_10462965.png";
import managementImage from "../assets/management_6039142.png";
import leadershipImage from "../assets/leadership_8840695.png";

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Typing effect component
const TypingText = ({ text }) => (
  <Box
    sx={{
      display: 'inline-block',
      backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      fontWeight: 800
    }}
  >
    {text}
  </Box>
);

// Simple particle background
const ParticleBackground = () => {
  const [dots, setDots] = useState([]);
  
  useEffect(() => {
    const particleCount = 500;
    const newDots = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 1,
      opacity: Math.random() * 0.5 + 0.1
    }));
    
    setDots(newDots);
  }, []);
  
  return (
    <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', zIndex: 0 }}>
      {dots.map(dot => (
        <Box
          key={dot.id}
          sx={{
            position: 'absolute',
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            opacity: dot.opacity,
            borderRadius: '50%',
            animation: `${float} ${Math.random() * 5 + 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </Box>
  );
};

const HomePage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      title: "Effort & Hard Work",
      description: "Success comes with continuous effort and perseverance.",
      image: effortImage,
    },
    {
      title: "Effective Management",
      description: "Learn how to manage your time and projects effectively.",
      image: managementImage,
    },
    {
      title: "Leadership Skills",
      description: "Develop the skills needed to become a great leader.",
      image: leadershipImage,
    },
  ];

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "background.default", color: "text.primary", overflow: "hidden", position: "relative" }}>
      <ParticleBackground />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <Box sx={{ py: 12, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <Typography variant="h2" component="h1" sx={{ mb: 3, fontWeight: 800 }}>
            <TypingText text="Find Your Perfect Mentor" />
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph sx={{ maxWidth: "800px", mb: 4, animation: `${slideIn} 1s ease-out` }}>
            Connect with experienced professionals who can guide your career and help you achieve your goals.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/find-mentor"
            sx={{
              borderRadius: "30px",
              padding: "12px 30px",
              fontSize: "1.1rem",
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              color: 'white',
              fontWeight: 'bold',
              '&:hover': { background: '#FF8E53' }
            }}
          >
            Find a Mentor
          </Button>
        </Box>

        {/* Features Section */}
        <Box sx={{ py: 8 }}>
          <Typography variant="h4" component="h2" align="center" sx={{ mb: 6, fontWeight: "700", backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            How MentorBoat Helps You
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{ animation: `${slideIn} 0.8s ease-out forwards`, animationDelay: `${index * 0.2}s`, opacity: 0 }}>
                <Card sx={{ height: "100%", borderRadius: "16px", boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)' } }}>
                  <CardMedia component="img" image={feature.image} alt={feature.title} sx={{ height: 180, objectFit: "contain", padding: "20px" }} />
                  <CardContent sx={{ pb: 3 }}>
                    <Typography gutterBottom variant="h5" sx={{ fontWeight: "600", backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1">{feature.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
