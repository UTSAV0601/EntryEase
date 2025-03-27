import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { Link } from 'react-router-dom'; // Import Link from React Router

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, link: '/home' },
  { text: 'Employee', icon: <AnalyticsRoundedIcon />, link: '/employee' },
  { text: 'Documentation', icon: <PeopleRoundedIcon />, link: '/documentation' },
  { text: 'Add Employee', icon: <AssignmentRoundedIcon />, link: '/add-employee' },
  { text: 'Progress Tracker', icon: <AssignmentRoundedIcon />, link: '/progress-tracker' },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon />, link: '/settings' },
  { text: 'About', icon: <InfoRoundedIcon />, link: '/about' },
  { text: 'Feedback', icon: <HelpRoundedIcon />, link: '/feedback' },
];

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      {/* Main List Items */}
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton component={Link} to={item.link} selected={index === 0}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Secondary List Items */}
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
