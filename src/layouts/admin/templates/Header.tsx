import React, { useState } from 'react';
import Image from 'next/image';
import Logout from '@/components/Logout';
import { getCurrentUserInfo } from '@/lib/userLib'; // Import the getCurrentUserInfo function
import { Menu, MenuItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

export default function Header() {
  const userInfo = getCurrentUserInfo(); // Get the user information
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMenuOpen = (event: any) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <header>
      <div className="flex flex-wrap justify-between px-3 py-2 w-full">
        <Image src="/img/FMC.webp" width={135} height={49} alt="FMC" className="logo" />
        <div className="accountInfo gap-4 flex items-center">
          {userInfo ? (
            <>
              <IconButton onClick={handleMenuOpen}>
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={handleMenuClose}>
                  {userInfo.profileImageURL && (
                    <ListItemIcon>
                      <Image src={userInfo.profileImageURL} width={30} height={30} alt="Profile Image" className="rounded-full" />
                    </ListItemIcon>
                  )}
                  <ListItemText primary={userInfo.displayName} />
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Logout />
                  <ListItemIcon>
                    <PowerSettingsNewIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </Menu>
            </>
          ) : (
            <p>No info available</p>
          )}
        </div>
      </div>
    </header>
  );
}
