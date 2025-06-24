import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Alert,
} from '@mui/material';
import {
  CloudUpload,
  Download,
  Delete,
  Visibility,
  Add,
  Description,
  CheckCircle,
  Warning,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface Document {
  id: number;
  name: string;
  type: string;
  status: 'pending' | 'uploaded' | 'approved' | 'rejected';
  uploadDate?: string;
  size?: string;
  category: string;
  required: boolean;
}

const Documents: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const documents: Document[] = [
    {
      id: 1,
      name: 'Government ID',
      type: 'ID Verification',
      status: 'approved',
      uploadDate: '2024-01-15',
      size: '2.1 MB',
      category: 'Identity',
      required: true,
    },
    {
      id: 2,
      name: 'Resume/CV',
      type: 'Professional Documents',
      status: 'approved',
      uploadDate: '2024-01-15',
      size: '1.8 MB',
      category: 'Professional',
      required: true,
    },
    {
      id: 3,
      name: 'Educational Certificates',
      type: 'Academic Documents',
      status: 'uploaded',
      uploadDate: '2024-01-16',
      size: '3.2 MB',
      category: 'Education',
      required: true,
    },
    {
      id: 4,
      name: 'Previous Employment Letter',
      type: 'Employment Verification',
      status: 'pending',
      category: 'Professional',
      required: false,
    },
    {
      id: 5,
      name: 'Bank Account Details',
      type: 'Financial Information',
      status: 'pending',
      category: 'Financial',
      required: true,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#4caf50';
      case 'uploaded': return '#ff9800';
      case 'rejected': return '#f44336';
      case 'pending': return '#9e9e9e';
      default: return '#9e9e9e';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle sx={{ color: '#4caf50' }} />;
      case 'uploaded': return <CloudUpload sx={{ color: '#ff9800' }} />;
      case 'rejected': return <Warning sx={{ color: '#f44336' }} />;
      case 'pending': return <Description sx={{ color: '#9e9e9e' }} />;
      default: return <Description />;
    }
  };

  const handleUpload = () => {
    setOpenDialog(false);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
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

  const requiredDocs = documents.filter(doc => doc.required);
  const optionalDocs = documents.filter(doc => !doc.required);
  const completionRate = Math.round((requiredDocs.filter(doc => doc.status === 'approved').length / requiredDocs.length) * 100);

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
              Document Management
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
              sx={{ borderRadius: 2 }}
            >
              Upload Document
            </Button>
          </Box>
        </motion.div>

        {uploadSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            variants={itemVariants}
          >
            <Alert severity="success" sx={{ mb: 3 }}>
              Document uploaded successfully!
            </Alert>
          </motion.div>
        )}

        {/* Progress Summary */}
        <motion.div variants={itemVariants}>
          <Card elevation={3} sx={{ mb: 4, borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Document Completion
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    {requiredDocs.filter(doc => doc.status === 'approved').length} of {requiredDocs.length} required documents approved
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box textAlign="center">
                    <Typography variant="h3" fontWeight={600} color="primary">
                      {completionRate}%
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

        {/* Required Documents */}
        <motion.div variants={itemVariants}>
          <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
            Required Documents
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {requiredDocs.map((doc) => (
              <Grid item xs={12} md={6} key={doc.id}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card elevation={2} sx={{ borderRadius: 3, height: '100%' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                        <Box display="flex" alignItems="center">
                          {getStatusIcon(doc.status)}
                          <Box ml={2}>
                            <Typography variant="h6" fontWeight={600}>
                              {doc.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {doc.type}
                            </Typography>
                          </Box>
                        </Box>
                        <Chip
                          label={doc.status}
                          size="small"
                          sx={{
                            bgcolor: getStatusColor(doc.status),
                            color: 'white',
                            fontWeight: 500,
                            textTransform: 'capitalize'
                          }}
                        />
                      </Box>

                      {doc.uploadDate && (
                        <Box mb={2}>
                          <Typography variant="body2" color="text.secondary">
                            Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                          </Typography>
                          {doc.size && (
                            <Typography variant="body2" color="text.secondary">
                              Size: {doc.size}
                            </Typography>
                          )}
                        </Box>
                      )}

                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Chip
                          label={doc.category}
                          variant="outlined"
                          size="small"
                        />
                        <Box>
                          {doc.status !== 'pending' && (
                            <>
                              <IconButton size="small" color="primary">
                                <Visibility fontSize="small" />
                              </IconButton>
                              <IconButton size="small" color="primary">
                                <Download fontSize="small" />
                              </IconButton>
                              <IconButton size="small" color="error">
                                <Delete fontSize="small" />
                              </IconButton>
                            </>
                          )}
                          {doc.status === 'pending' && (
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<CloudUpload />}
                              onClick={() => setOpenDialog(true)}
                              sx={{ borderRadius: 2 }}
                            >
                              Upload
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Optional Documents */}
        <motion.div variants={itemVariants}>
          <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
            Optional Documents
          </Typography>
          <Grid container spacing={3}>
            {optionalDocs.map((doc) => (
              <Grid item xs={12} md={6} key={doc.id}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card elevation={2} sx={{ borderRadius: 3, height: '100%', opacity: 0.8 }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                        <Box display="flex" alignItems="center">
                          {getStatusIcon(doc.status)}
                          <Box ml={2}>
                            <Typography variant="h6" fontWeight={600}>
                              {doc.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {doc.type}
                            </Typography>
                          </Box>
                        </Box>
                        <Chip
                          label="Optional"
                          variant="outlined"
                          size="small"
                        />
                      </Box>

                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Chip
                          label={doc.category}
                          variant="outlined"
                          size="small"
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<CloudUpload />}
                          onClick={() => setOpenDialog(true)}
                          sx={{ borderRadius: 2 }}
                        >
                          Upload
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Upload Dialog */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Upload Document</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
              <InputLabel>Document Type</InputLabel>
              <Select
                label="Document Type"
                defaultValue=""
              >
                <MenuItem value="id">Government ID</MenuItem>
                <MenuItem value="resume">Resume/CV</MenuItem>
                <MenuItem value="education">Educational Certificate</MenuItem>
                <MenuItem value="employment">Employment Letter</MenuItem>
                <MenuItem value="financial">Financial Document</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              margin="dense"
              label="Document Description"
              fullWidth
              multiline
              rows={2}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            
            <Box
              sx={{
                border: '2px dashed #ccc',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              <CloudUpload sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
              <Typography variant="body1" gutterBottom>
                Drag and drop your file here, or click to browse
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleUpload} variant="contained">
              Upload Document
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  );
};

export default Documents;