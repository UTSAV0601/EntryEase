// src/components/Sidebar.jsx
import React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.default,
  },
}));

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={true}
      sx={{
        display: { xs: 'none', md: 'block' },
      }}
    >
      {/* Top Menu Content with Navigation Links */}
      <Box sx={{ mt: 2, p: 2 }}>
        <MenuContent />
      </Box>

      <Divider />

      {/* User Info and Options Menu at the Bottom */}
      <Box
        sx={{
          overflow: 'auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <Stack
          direction="row"
          sx={{
            p: 2,
            gap: 1,
            alignItems: 'center',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Avatar
            alt={user?.name || 'Guest'}
            src="/static/images/avatar/7.jpg"
            sx={{ width: 36, height: 36 }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" fontWeight={500}>
              {user?.name || 'Guest User'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.email || 'Not logged in'}
            </Typography>
          </Box>
          <OptionsMenu />
        </Stack>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
