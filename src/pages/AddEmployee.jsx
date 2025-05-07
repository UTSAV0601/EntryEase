import React, { useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import {
  Grid,
  OutlinedInput,
  FormLabel,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  Paper,
  Typography,
} from '@mui/material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: 'auto',
  maxWidth: 800,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const AddEmployeeForm = ({ onAddEmployee }) => {
  const [name, setName] = useState('');
  const [manager, setManager] = useState('GlobalLogic');
  const [managerName, setManagerName] = useState('');
  const [managerEmail, setManagerEmail] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = { name, manager, managerName, managerEmail, location, address, email, phone, progress };

    axios.post('http://localhost:5000/employees', newEmployee)
      .then((response) => {
        onAddEmployee(response.data);

        // Clear form after submit
        setName('');
        setManager('GlobalLogic');
        setManagerName('');
        setManagerEmail('');
        setLocation('');
        setAddress('');
        setEmail('');
        setPhone('');
      })
      .catch((err) => console.log(err));
  };

  return (
    <StyledPaper>
      <Typography variant="h6" gutterBottom>
        Add New Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="name" required>Employee Name</FormLabel>
            <OutlinedInput
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              size="small"
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="manager-label" required>
                Manager
              </InputLabel>
              <Select
                labelId="manager-label"
                id="manager"
                name="manager"
                value={manager}
                onChange={(e) => setManager(e.target.value)}
                label="Manager"
              >
                <MenuItem value="GlobalLogic">GlobalLogic</MenuItem>
                <MenuItem value="Client-side">Client-side</MenuItem>
              </Select>
            </FormControl>
          </FormGrid>

          {manager === 'Client-side' && (
            <>
              <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="managerName" required>Manager Name</FormLabel>
                <OutlinedInput
                  id="managerName"
                  value={managerName}
                  onChange={(e) => setManagerName(e.target.value)}
                  placeholder="Manager Name"
                  required
                  size="small"
                />
              </FormGrid>

              <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="managerEmail" required>Manager Email</FormLabel>
                <OutlinedInput
                  id="managerEmail"
                  type="email"
                  value={managerEmail}
                  onChange={(e) => setManagerEmail(e.target.value)}
                  placeholder="manager@example.com"
                  required
                  size="small"
                />
              </FormGrid>
            </>
          )}

          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="location" required>Base Location</FormLabel>
            <OutlinedInput
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Bangalore"
              required
              size="small"
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="email" required>Email ID</FormLabel>
            <OutlinedInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john.doe@example.com"
              required
              size="small"
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="phone" required>Phone Number</FormLabel>
            <OutlinedInput
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="9876543210"
              required
              size="small"
            />
          </FormGrid>

          <FormGrid item xs={12}>
            <FormLabel htmlFor="address" required>Address</FormLabel>
            <OutlinedInput
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main Street, City"
              required
              size="small"
              multiline
              rows={2}
            />
          </FormGrid>

          <FormGrid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Employee
            </Button>
          </FormGrid>
        </Grid>
      </form>
    </StyledPaper>
  );
};

export default AddEmployeeForm;
