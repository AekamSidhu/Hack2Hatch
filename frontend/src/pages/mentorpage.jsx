import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Chip,
  Rating,
} from "@mui/material";

// Import default profile image
import defaultProfileImage from "../assets/no-profile.png";

// Mock data for mentors
const mockMentors = [
  {
    id: 1,
    name: "Jane Doe",
    title: "Senior Software Engineer",
    company: "Tech Giant Inc.",
    skills: ["React", "Node.js", "Cloud Architecture"],
    rating: 4.8,
    image: defaultProfileImage, // Use imported image for local file
    description: "Experienced engineer with 10+ years in web development and cloud solutions.",
  },
  {
    id: 2,
    name: "John Smith",
    title: "Product Manager",
    company: "Startup Revolution",
    skills: ["Product Strategy", "UX Design", "Agile"],
    rating: 4.5,
    image: "https://source.unsplash.com/random/300x300/?man", // Online image
    description: "Passionate about building products that solve real problems for users.",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    title: "Data Scientist",
    company: "Analytics Pro",
    skills: ["Machine Learning", "Python", "Data Visualization"],
    rating: 4.9,
    image: "https://source.unsplash.com/random/300x300/?person", // Online image
    description: "Helping companies make data-driven decisions through advanced analytics.",
  },
];

const MentorFinderPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [filteredMentors, setFilteredMentors] = useState(mockMentors);

  // List of all unique skills from mentors
  const allSkills = [...new Set(mockMentors.flatMap((mentor) => mentor.skills))];

  const handleSearch = () => {
    let results = mockMentors;

    if (searchTerm) {
      results = results.filter(
        (mentor) =>
          mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mentor.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSkill) {
      results = results.filter((mentor) => mentor.skills.includes(selectedSkill));
    }

    setFilteredMentors(results);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Find Your Mentor
      </Typography>

      {/* Search & Filter Section */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Search mentors"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Name, title, or company"
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Filter by skill</InputLabel>
              <Select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                label="Filter by skill"
              >
                <MenuItem value="">
                  <em>All Skills</em>
                </MenuItem>
                {allSkills.map((skill, index) => (
                  <MenuItem key={index} value={skill}>
                    {skill}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button fullWidth variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Mentor List */}
      <Grid container spacing={3}>
        {filteredMentors.map((mentor) => (
          <Grid item key={mentor.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                height="200"
                image={mentor.image ? mentor.image : defaultProfileImage} // Handle missing images
                alt={mentor.name}
                onError={(e) => (e.target.src = defaultProfileImage)} // Fallback if image fails to load
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {mentor.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {mentor.title} at {mentor.company}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Rating value={mentor.rating} precision={0.1} readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {mentor.rating}/5
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  {mentor.description}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  {mentor.skills.map((skill, index) => (
                    <Chip key={index} label={skill} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View Profile
                </Button>
                <Button size="small" variant="contained" color="primary">
                  Request Mentorship
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MentorFinderPage;
