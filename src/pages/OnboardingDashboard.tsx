import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Avatar,
  Button,
  Paper,
} from '@mui/material';
import {
  CheckCircle,
  Schedule,
  Assignment,
  Person,
  Description,
  TrendingUp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const OnboardingDashboard: React.FC = () => {
  const { user } = useAuth();

  const onboardingProgress = 75;
  const completedTasks = 6;
  const totalTasks = 8;

  const quickStats = [
    { label: 'Tasks Completed', value: `${completedTasks}/${totalTasks}`, icon: CheckCircle, color: '#4caf50' },
    { label: 'Profile Completion', value: '75%', icon: Person, color: '#2196f3' },
    { label: 'Documents Uploaded', value: '4/5', icon: Description, color: '#ff9800' },
    { label: 'Days Remaining', value: '5', icon: Schedule, color: '#f44336' },
  ];

  const recentTasks = [
    { id: 1, title: 'Complete Personal Information', status: 'completed', dueDate: '2024-01-15' },
    { id: 2, title: 'Upload Profile Photo', status: 'completed', dueDate: '2024-01-16' },
    { id: 3, title: 'IT Equipment Setup', status: 'in-progress', dueDate: '2024-01-18' },
    { id: 4, title: 'Security Training', status: 'pending', dueDate: '2024-01-20' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#4caf50';
      case 'in-progress': return '#ff9800';
      case 'pending': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle sx={{ color: '#4caf50' }} />;
      case 'in-progress': return <Schedule sx={{ color: '#ff9800' }} />;
      case 'pending': return <Assignment sx={{ color: '#f44336' }} />;
      default: return <Assignment />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants}>
          <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <Box display="flex" alignItems="center" color="white">
              <Avatar sx={{ width: 80, height: 80, mr: 3, bgcolor: 'rgba(255,255,255,0.2)' }}>
                <Person sx={{ fontSize: 40 }} />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight={600} gutterBottom>
                  Welcome, {user?.name}!
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  {user?.role} • {user?.department}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, opacity: 0.8 }}>
                  Let's complete your onboarding journey
                </Typography>
              </Box>
            </Box>
          </Paper>
        </motion.div>

        {/* Progress Overview */}
        <motion.div variants={itemVariants}>
          <Card elevation={3} sx={{ mb: 4, borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight={600}>
                  Onboarding Progress
                </Typography>
                <Chip 
                  label={`${onboardingProgress}% Complete`} 
                  color="primary" 
                  size="medium"
                  sx={{ fontWeight: 600 }}
                />
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={onboardingProgress} 
                sx={{ 
                  height: 12, 
                  borderRadius: 6,
                  backgroundColor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 6,
                    background: 'linear-gradient(90deg, #4caf50, #8bc34a)'
                  }
                }} 
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Great progress! You're almost there.
              </Typography>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={itemVariants}>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {quickStats.map((stat, index) => (
              <Grid xs={12} sm={6} md={3} key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card elevation={2} sx={{ borderRadius: 3, height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Avatar sx={{ 
                        width: 60, 
                        height: 60, 
                        mx: 'auto', 
                        mb: 2, 
                        bgcolor: stat.color,
                        boxShadow: `0 4px 20px ${stat.color}40`
                      }}>
                        <stat.icon sx={{ fontSize: 30 }} />
                      </Avatar>
                      <Typography variant="h4" fontWeight={600} gutterBottom>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Recent Tasks */}
        <motion.div variants={itemVariants}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight={600}>
                  Recent Tasks
                </Typography>
                <Button 
                  variant="outlined" 
                  startIcon={<TrendingUp />}
                  sx={{ borderRadius: 2 }}
                >
                  View All Tasks
                </Button>
              </Box>
              
              <Box>
                {recentTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    whileHover={{ backgroundColor: '#f5f5f5' }}
                    transition={{ duration: 0.2 }}
                  >
                    <Box 
                      display="flex" 
                      alignItems="center" 
                      justifyContent="space-between"
                      p={2}
                      borderRadius={2}
                      mb={1}
                    >
                      <Box display="flex" alignItems="center">
                        {getStatusIcon(task.status)}
                        <Box ml={2}>
                          <Typography variant="body1" fontWeight={500}>
                            {task.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip 
                        label={task.status.replace('-', ' ')} 
                        size="small"
                        sx={{ 
                          bgcolor: getStatusColor(task.status),
                          color: 'white',
                          fontWeight: 500,
                          textTransform: 'capitalize'
                        }}
                      />
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default OnboardingDashboard;