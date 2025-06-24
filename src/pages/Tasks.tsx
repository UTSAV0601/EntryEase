import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  Tabs,
  Tab,
} from '@mui/material';
import {
  CheckCircle,
  Schedule,
  Assignment,
  Add,
  FilterList,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  category: string;
  progress: number;
}

const Tasks: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  const tasks: Task[] = [
    {
      id: 1,
      title: 'Complete Personal Information Form',
      description: 'Fill out all required personal details including contact information and emergency contacts.',
      status: 'completed',
      priority: 'high',
      dueDate: '2024-01-15',
      category: 'Documentation',
      progress: 100,
    },
    {
      id: 2,
      title: 'Upload Profile Photo',
      description: 'Upload a professional headshot for your employee profile.',
      status: 'completed',
      priority: 'medium',
      dueDate: '2024-01-16',
      category: 'Profile',
      progress: 100,
    },
    {
      id: 3,
      title: 'IT Equipment Setup',
      description: 'Collect laptop, phone, and other IT equipment from the IT department.',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2024-01-18',
      category: 'Equipment',
      progress: 60,
    },
    {
      id: 4,
      title: 'Security Training Module',
      description: 'Complete the mandatory cybersecurity training course.',
      status: 'pending',
      priority: 'high',
      dueDate: '2024-01-20',
      category: 'Training',
      progress: 0,
    },
    {
      id: 5,
      title: 'Benefits Enrollment',
      description: 'Choose your health insurance and other benefit options.',
      status: 'pending',
      priority: 'medium',
      dueDate: '2024-01-22',
      category: 'Benefits',
      progress: 0,
    },
    {
      id: 6,
      title: 'Team Introduction Meeting',
      description: 'Schedule and attend introductory meetings with your team members.',
      status: 'pending',
      priority: 'low',
      dueDate: '2024-01-25',
      category: 'Social',
      progress: 0,
    },
  ];

  const getFilteredTasks = () => {
    switch (activeTab) {
      case 1: return tasks.filter(task => task.status === 'pending');
      case 2: return tasks.filter(task => task.status === 'in-progress');
      case 3: return tasks.filter(task => task.status === 'completed');
      default: return tasks;
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Typography variant="h4" fontWeight={600}>
              Onboarding Tasks
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
              sx={{ borderRadius: 2 }}
            >
              Add Task
            </Button>
          </Box>
        </motion.div>

        {/* Progress Summary */}
        <motion.div variants={itemVariants}>
          <Card elevation={3} sx={{ mb: 4, borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Overall Progress
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={66}
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
                    4 of 6 tasks completed
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box textAlign="center">
                    <Typography variant="h3" fontWeight={600} color="primary">
                      66%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Complete
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </motion.div>

        {/* Task Filters */}
        <motion.div variants={itemVariants}>
          <Card elevation={2} sx={{ mb: 4, borderRadius: 3 }}>
            <CardContent sx={{ p: 0 }}>
              <Tabs
                value={activeTab}
                onChange={(_, newValue) => setActiveTab(newValue)}
                variant="fullWidth"
                sx={{
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '1rem',
                  }
                }}
              >
                <Tab label="All Tasks" />
                <Tab label="Pending" />
                <Tab label="In Progress" />
                <Tab label="Completed" />
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Task List */}
        <motion.div variants={itemVariants}>
          <Grid container spacing={3}>
            {getFilteredTasks().map((task) => (
              <Grid item xs={12} md={6} key={task.id}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card elevation={2} sx={{ borderRadius: 3, height: '100%' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                        <Box display="flex" alignItems="center">
                          {getStatusIcon(task.status)}
                          <Typography variant="h6" fontWeight={600} sx={{ ml: 1 }}>
                            {task.title}
                          </Typography>
                        </Box>
                        <Chip
                          label={task.priority}
                          size="small"
                          sx={{
                            bgcolor: getPriorityColor(task.priority),
                            color: 'white',
                            fontWeight: 500,
                            textTransform: 'capitalize'
                          }}
                        />
                      </Box>

                      <Typography variant="body2" color="text.secondary" paragraph>
                        {task.description}
                      </Typography>

                      <Box mb={2}>
                        <Box display="flex" justifyContent="space-between" mb={1}>
                          <Typography variant="body2" color="text.secondary">
                            Progress
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {task.progress}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={task.progress}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: '#e0e0e0',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 3,
                              backgroundColor: getStatusColor(task.status)
                            }
                          }}
                        />
                      </Box>

                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Chip
                          label={task.category}
                          variant="outlined"
                          size="small"
                        />
                        <Typography variant="body2" color="text.secondary">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Add Task Dialog */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add New Task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Task Title"
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Due Date"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="High Priority"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={() => setOpenDialog(false)} variant="contained">
              Add Task
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  );
};

export default Tasks;