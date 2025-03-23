import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Rating,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import MessageIcon from "@mui/icons-material/Message";

// Sample Mentor Data
const mentors = [
  {
    id: 1,
    name: "Alex Johnson",
    title: "Senior Full Stack Developer",
    company: "Google",
    skills: ["React", "Node.js", "Python", "AWS"],
    experience: 8,
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Helping developers navigate web technologies and cloud architecture.",
  },
  {
    id: 2,
    name: "Samantha Lee",
    title: "Data Scientist",
    company: "Netflix",
    skills: ["Python", "TensorFlow", "Data Visualization"],
    experience: 6,
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Making complex data concepts simple and accessible.",
  },
  {
    id: 3,
    name: "Marcus Williams",
    title: "Mobile Developer",
    company: "Spotify",
    skills: ["React Native", "Swift", "Kotlin", "Firebase"],
    experience: 5,
    rating: 4.7,
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    bio: "Creating seamless mobile experiences and guiding app developers.",
  },
  {
    id: 4,
    name: "Priya Patel",
    title: "DevOps Engineer",
    company: "Amazon",
    skills: ["Docker", "Kubernetes", "CI/CD", "Terraform"],
    experience: 7,
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    bio: "Helping teams implement best DevOps practices for scalability.",
  },
];

const MentorMatchesPage = () => {
  const navigate = useNavigate();
  const [matchedMentors, setMatchedMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentorMatches = async () => {
      try {
        // Check if user completed the survey
        const userPoints = JSON.parse(localStorage.getItem("userSurveyPoints")) || [];
        console.log("User Points:", userPoints); // Debugging log

        if (userPoints.length === 0) {
          navigate("/find-mentor");
          return;
        }

        // Simulate neural network processing
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Randomize mentor list (in real app, this should be AI-matched data)
        const sortedMentors = [...mentors].sort(() => 0.5 - Math.random());
        console.log("Matched Mentors:", sortedMentors); // Debugging log

        setMatchedMentors(sortedMentors);
        console.log("Matched Mentors State:", matchedMentors); // Log state after setting
      } catch (error) {
        console.error("Error fetching mentor matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorMatches();
  }, [navigate]);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Page Title */}
      <div style={{ opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.6s, transform 0.6s' }}>
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontWeight: "bold",
            mb: 1,
          }}
        >
          Your Mentor Matches
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Based on your preferences, we've found these perfect mentors for you
        </Typography>
      </div>

      {/* Loading State */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
          <Typography variant="h6">Matching you with the perfect mentors...</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Our AI is analyzing compatibility
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {matchedMentors.map((mentor) => (
            <Grid item xs={12} md={6} key={mentor.id}>
              <div
                style={{
                  transform: 'translateY(0)',
                  opacity: 1,
                  transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
                }}
              >
                <Card
                  sx={{
                    display: "flex",
                    height: "100%",
                    borderRadius: 4,
                    overflow: "hidden",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  {/* Mentor Info */}
                  <Box sx={{ display: "flex", flexDirection: "column", width: "60%", p: 3 }}>
                    <CardContent sx={{ flex: "1 0 auto", p: 0 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Typography component="div" variant="h5" sx={{ fontWeight: "bold" }}>
                          {mentor.name}
                        </Typography>
                        {mentor.rating > 4.8 && <VerifiedUserIcon sx={{ ml: 1, color: "#4caf50" }} />}
                      </Box>
                      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        {mentor.title} at {mentor.company}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Rating value={mentor.rating} readOnly precision={0.1} emptyIcon={<StarIcon fontSize="inherit" />} size="small" />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {mentor.rating}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {mentor.bio}
                      </Typography>

                      {/* Mentor Skills */}
                      <Box sx={{ mb: 2 }}>
                        {mentor.skills.map((skill) => (
                          <Chip key={skill} label={skill} size="small" sx={{ mr: 0.5, mb: 0.5, background: "#e0f7fa", color: "#FE6B8B" }} />
                        ))}
                      </Box>
                    </CardContent>

                    {/* Connect Button */}
                    <Button
                      variant="contained"
                      startIcon={<MessageIcon />}
                      sx={{
                        borderRadius: 2,
                        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                        boxShadow: "0 3px 5px 2px rgba(33, 150, 243, .3)",
                        "&:hover": { transform: "scale(1.05)" },
                      }}
                    >
                      Connect
                    </Button>
                  </Box>

                  {/* Mentor Image */}
                  <CardMedia component="img" sx={{ width: "40%", objectFit: "cover" }} image={mentor.image} alt={mentor.name} />
                </Card>
              </div>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MentorMatchesPage;