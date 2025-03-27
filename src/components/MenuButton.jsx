import * as React from 'react';
import PropTypes from 'prop-types';
import Badge, { badgeClasses } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';

function MenuButton({ showBadge = false, ...props }) {
  return (
    <Badge
      color="error"  // This sets the badge color to red
      variant="dot"  // The badge is a small dot (you can change it to 'standard' for a number or text)
      invisible={!showBadge}  // The badge is invisible when showBadge is false
      sx={{ [`& .${badgeClasses.badge}`]: { right: 2, top: 2 } }}  // Customizes the position of the badge
    >
      <IconButton size="small" {...props} />  {/* Renders the IconButton and spreads the passed props */}
    </Badge>
  );
}

MenuButton.propTypes = {
  showBadge: PropTypes.bool,  // Defines that showBadge is an optional boolean prop
};

export default MenuButton;
