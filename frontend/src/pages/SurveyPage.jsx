import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Stepper, 
  Step, 
  StepLabel,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Container,
  useTheme,
  Fade,
  Grow,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: "What's your experience level in coding?",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"]
  },
  {
    question: "What field are you most interested in?",
    options: ["Web Development", "Mobile Development", "Data Science", "Machine Learning", "DevOps", "Cybersecurity"]
  },
  {
    question: "How much time can you dedicate to learning per week?",
    options: ["Less than 5 hours", "5-10 hours", "10-20 hours", "20+ hours"]
  },
  {
    question: "What's your preferred learning style?",
    options: ["Self-paced learning", "Structured curriculum", "Project-based learning", "Pair programming"]
  },
  {
    question: "What's your primary goal with mentorship?",
    options: ["Career transition", "Skill improvement", "Project guidance", "Networking", "Industry insights"]
  },
  {
    question: "How do you prefer to communicate with your mentor?",
    options: ["Video calls", "Text chat", "Email", "In-person meetings", "Combination"]
  }
];

const SurveyPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);

  const handleNext = () => {
    setFadeIn(false);
    setTimeout(() => {
      if (activeStep < questions.length - 1) {
        setActiveStep((prevStep) => prevStep + 1);
      } else {
        handleSubmit();
      }
      setFadeIn(true);
    }, 300);
  };

  const handleBack = () => {
    setFadeIn(false);
    setTimeout(() => {
      setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
      setFadeIn(true);
    }, 300);
  };

  const handleChange = (event) => {
    const newAnswers = [...answers];
    newAnswers[activeStep] = event.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setLoading(true);
    
    // Simulate a processing delay
    setTimeout(() => {
      // Convert answers to numerical values
      const points = answers.map((answer, index) => {
        const questionOptions = questions[index].options;
        return questionOptions.indexOf(answer) + 1;
      });
      
      // Store points in localStorage to pass to mentor page
      localStorage.setItem('userSurveyPoints', JSON.stringify(points));
      
      // Navigate to mentor matches page
      navigate('/mentor-matches');
    }, 2000);
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <div>
        <Typography variant="h3" align="center" gutterBottom sx={{ 
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          mb: 4
        }}>
          Find Your Perfect Mentor
        </Typography>
        
        <Paper 
          elevation={10} 
          sx={{ 
            p: 4, 
            borderRadius: 4,
            border: '2px solid #FE6B8B',
            background: 'transparent',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)'
          }}
        >
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {questions.map((_, index) => (
              <Step key={index}>
                <StepLabel />
              </Step>
            ))}
          </Stepper>

          {loading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
              <CircularProgress size={60} thickness={4} />
              <Typography variant="h6" sx={{ mt: 3 }}>
                Finding your perfect mentor match...
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                Our AI is analyzing your preferences
              </Typography>
            </Box>
          ) : (
            <Fade in={fadeIn} timeout={500}>
              <Box>
                <FormControl component="fieldset" sx={{ width: '100%', mb: 4 }}>
                  <FormLabel component="legend" sx={{ 
                    fontSize: '1.5rem',
                    color: theme.palette.primary.main,
                    mb: 2,
                    fontWeight: 'medium'
                  }}>
                    {questions[activeStep].question}
                  </FormLabel>
                  <RadioGroup
                    value={answers[activeStep]}
                    onChange={handleChange}
                  >
                    {questions[activeStep].options.map((option, index) => (
                      <Grow
                        in={fadeIn}
                        style={{ transformOrigin: '0 0 0' }}
                        timeout={500 + index * 100}
                        key={option}
                      >
                        <FormControlLabel
                          value={option}
                          control={<Radio color="primary" />}
                          label={option}
                          sx={{ 
                            mb: 1.5,
                            p: 1, 
                            borderRadius: 2,
                            fontSize: '1.5rem',
                            transition: 'all 0.3s',
                            '&:hover': {
                              backgroundColor: 'rgba(25, 118, 210, 0.08)',
                              transform: 'translateX(5px)'
                            }
                          }}
                        />
                      </Grow>
                    ))}
                  </RadioGroup>
                </FormControl>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                  <Button
                    variant="outlined"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ 
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      fontWeight: 'bold',
                      transition: 'all 0.3s',
                      color: theme.palette.text.primary
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={!answers[activeStep]}
                    sx={{ 
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      fontWeight: 'bold',
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      transition: 'all 0.3s'
                    }}
                  >
                    {activeStep === questions.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                </Box>
              </Box>
            </Fade>
          )}
        </Paper>
      </div>
    </Container>
  );
};

export default SurveyPage;
