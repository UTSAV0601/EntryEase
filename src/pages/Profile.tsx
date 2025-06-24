import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  Chip,
  Divider,
  Alert,
} from '@mui/material';
import { Person, Edit, Save, Cancel } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';

interface ProfileForm {
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileForm>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '+1 (555) 123-4567',
      department: user?.department || '',
      role: user?.role || '',
      address: '123 Main St, San Francisco, CA 94105',
      emergencyContact: 'Jane Doe',
      emergencyPhone: '+1 (555) 987-6543',
    }
  });

  const onSubmit = async (data: ProfileForm) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateUser({
      name: data.name,
      email: data.email,
      department: data.department,
      role: data.role,
    });

    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setSaveSuccess(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset();
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
              My Profile
            </Typography>
            {!isEditing && (
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={handleEdit}
                sx={{ borderRadius: 2 }}
              >
                Edit Profile
              </Button>
            )}
          </Box>
        </motion.div>

        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            variants={itemVariants}
          >
            <Alert severity="success" sx={{ mb: 3 }}>
              Profile updated successfully!
            </Alert>
          </motion.div>
        )}

        <Grid container spacing={4}>
          {/* Profile Picture & Basic Info */}
          <Grid item xs={12} md={4}>
            <motion.div variants={itemVariants}>
              <Card elevation={3} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      mx: 'auto',
                      mb: 3,
                      bgcolor: '#1976d2',
                      fontSize: '3rem'
                    }}
                  >
                    <Person sx={{ fontSize: 60 }} />
                  </Avatar>
                  
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    {user?.name}
                  </Typography>
                  
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    {user?.email}
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    <Chip 
                      label={user?.role} 
                      color="primary" 
                      sx={{ mb: 1, mr: 1 }}
                    />
                    <Chip 
                      label={user?.department} 
                      color="secondary" 
                      sx={{ mb: 1 }}
                    />
                  </Box>

                  <Divider sx={{ my: 3 }} />
                  
                  <Box textAlign="left">
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Start Date
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {user?.startDate ? new Date(user.startDate).toLocaleDateString() : 'January 15, 2024'}
                    </Typography>
                    
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
                      Employee ID
                    </Typography>
                    <Typography variant="body1">
                      GL-{user?.id || '12345'}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Profile Form */}
          <Grid item xs={12} md={8}>
            <motion.div variants={itemVariants}>
              <Card elevation={3} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Personal Information
                    </Typography>
                    
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          {...register('name', { required: 'Name is required' })}
                          fullWidth
                          label="Full Name"
                          disabled={!isEditing}
                          error={!!errors.name}
                          helperText={errors.name?.message}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address'
                            }
                          })}
                          fullWidth
                          label="Email Address"
                          disabled={!isEditing}
                          error={!!errors.email}
                          helperText={errors.email?.message}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          {...register('phone')}
                          fullWidth
                          label="Phone Number"
                          disabled={!isEditing}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          {...register('department')}
                          fullWidth
                          label="Department"
                          disabled={!isEditing}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          {...register('address')}
                          fullWidth
                          label="Address"
                          multiline
                          rows={2}
                          disabled={!isEditing}
                        />
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Emergency Contact
                    </Typography>
                    
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          {...register('emergencyContact')}
                          fullWidth
                          label="Emergency Contact Name"
                          disabled={!isEditing}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          {...register('emergencyPhone')}
                          fullWidth
                          label="Emergency Contact Phone"
                          disabled={!isEditing}
                        />
                      </Grid>
                    </Grid>

                    {isEditing && (
                      <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button
                          variant="outlined"
                          startIcon={<Cancel />}
                          onClick={handleCancel}
                          sx={{ borderRadius: 2 }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          startIcon={<Save />}
                          sx={{ borderRadius: 2 }}
                        >
                          Save Changes
                        </Button>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Profile;