import React, { useState } from 'react';
import Image from 'next/image';
import Logout from '@/components/Logout';
import { getCurrentUserInfo } from '@/lib/userLib'; // Import the getCurrentUserInfo function
import { Menu, MenuItem, ListItemIcon, ListItemText, IconButton, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';

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
              <Button onClick={handleMenuOpen}>          
                {userInfo.profileImageURL && (
                  <ListItemIcon>
                    <Image src={userInfo.profileImageURL} width={30} height={30} alt="Profile Image" className="rounded-full" />
                  </ListItemIcon>
                )}
                <ListItemText primary={userInfo.displayName} />
              </Button>
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <Link href='/admin/account-settings' style={{ textDecoration: 'none' }}>
                  <MenuItem>Account Settings</MenuItem>
                </Link>
                <Logout />
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
