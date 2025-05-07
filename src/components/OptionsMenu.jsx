// src/components/OptionsMenu.jsx
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import { paperClasses } from '@mui/material/Paper';
import { listClasses } from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon, { listItemIconClasses } from '@mui/material/ListItemIcon';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LoginIcon from '@mui/icons-material/Login';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import MenuButton from './MenuButton';
import { useAuth } from '../context/AuthContext';

const MenuItem = styled(MuiMenuItem)({
  margin: '2px 0',
});

export default function OptionsMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    handleClose();
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  return (
    <>
      <MenuButton onClick={handleClick} sx={{ borderColor: 'transparent' }}>
        <MoreVertRoundedIcon />
      </MenuButton>
      <Menu
        anchorEl={anchorEl}
        id="options-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          [`& .${listClasses.root}`]: { padding: '4px' },
          [`& .${paperClasses.root}`]: { padding: 0 },
          [`& .${Divider.root}`]: { margin: '4px -4px' },
        }}
      >
        {user ? (
          <>
            <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
            <MenuItem onClick={() => navigate('/settings')}>Settings</MenuItem>
            <Divider />
            <MenuItem
              onClick={handleLogout}
              sx={{ [`& .${listItemIconClasses.root}`]: { ml: 'auto', minWidth: 0 } }}
            >
              <ListItemText>Logout</ListItemText>
              <ListItemIcon>
                <LogoutRoundedIcon fontSize="small" />
              </ListItemIcon>
            </MenuItem>
          </>
        ) : (
          <MenuItem
            onClick={handleLogin}
            sx={{ [`& .${listItemIconClasses.root}`]: { ml: 'auto', minWidth: 0 } }}
          >
            <ListItemText>Login</ListItemText>
            <ListItemIcon>
              <LoginIcon fontSize="small" />
            </ListItemIcon>
          </MenuItem>
        )}
      </Menu>
    </>
  );
}

