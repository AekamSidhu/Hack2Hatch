import React from "react";
import { Container, Typography, Card, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const mentors = [
  { name: "John Doe", expertise: "Software Engineering", experience: "10+ years" },
  { name: "Jane Smith", expertise: "Data Science", experience: "8+ years" },
  { name: "Michael Lee", expertise: "Product Management", experience: "5+ years" },
];

const MentorResults = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Your Mentor Matches
      </Typography>

      {mentors.map((mentor, index) => (
        <Card key={index} sx={{ mb: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5">{mentor.name}</Typography>
            <Typography color="textSecondary">{mentor.expertise}</Typography>
            <Typography variant="body2">{mentor.experience}</Typography>
          </CardContent>
        </Card>
      ))}

      {/* Go Back Button */}
      <Button variant="contained" color="secondary" onClick={() => navigate("/find-mentor")} sx={{ mt: 3 }}>
        Retake Survey
      </Button>
    </Container>
  );
};

export default MentorResults;
