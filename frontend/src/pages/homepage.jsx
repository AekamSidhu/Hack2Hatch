import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Grid, Card, CardContent, CardMedia, Box } from "@mui/material";
import effortImage from "../assets/effort_10462965.png";
import managementImage from "../assets/management_6039142.png";
import leadershipImage from "../assets/leadership_8840695.png";

const HomePage = () => {
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
    <Box
      sx={{
        width: "100vw", // Full screen width
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 4,
      }}
    >
      {/* Main Title */}
      <Typography variant="h2" component="h1" gutterBottom>
        Find Your Perfect Mentor
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph sx={{ maxWidth: "800px", mb: 4 }}>
        Connect with experienced professionals who can guide your career and help you achieve your goals.
      </Typography>
      <Button variant="contained" color="primary" size="large" component={Link} to="/find-mentor">
        Find a Mentor
      </Button>

      {/* Features Section */}
      <Box sx={{ py: 6, width: "90vw" }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
          How MentorBoat Helps You
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: "100%", bgcolor: "background.paper", color: "text.primary" }}>
                <CardMedia
                  component="img"
                  image={feature.image}
                  alt={feature.title}
                  sx={{
                    height: 200,
                    objectFit: "contain",
                    width: "100%",
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Ready to accelerate your career?
        </Typography>
        <Button variant="contained" color="secondary" size="large" component={Link} to="/register">
          Get Started Now
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
