import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Box
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Brightness6Icon from '@mui/icons-material/Brightness6';

const Navbar = ({ toggleTheme }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (theme) => {
    toggleTheme(theme);
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="default" elevation={1} sx={{ padding: '10px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Breadcrumbs / Title */}
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Dashboard
        </Typography>

        {/* Right Section: Search Bar, Date Picker, Theme Toggle */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Search Bar */}
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: '250px' }}
          />

          {/* Date Picker */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Pick a Date"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </LocalizationProvider>

          {/* Theme Toggle */}
          <IconButton onClick={handleMenuClick} color="inherit">
            <Brightness6Icon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={() => handleMenuClose('light')}>Light Theme</MenuItem>
            <MenuItem onClick={() => handleMenuClose('dark')}>Dark Theme</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
