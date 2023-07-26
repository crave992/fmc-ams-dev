import React, { useState } from 'react';
import Image from 'next/image';
import Logout from '@/components/Logout';
import { getCurrentUserInfo } from '@/lib/userLib';
import { Menu, MenuItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import Link from 'next/link';
import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Sidebar from './Sidebar';

export default function Header() {
  const userInfo = getCurrentUserInfo();
  const [menuAnchor, setMenuAnchor] = useState<EventTarget & HTMLButtonElement | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);
  };

  return (
    <header role="banner">
      <div className="flex flex-wrap justify-between px-3 py-2 w-full container mx-auto">
        <div className="flex justify-start">
          <Image src="/img/FMC.webp" width={135} height={49} alt="FMC Logo" className="logo mr-5" />
          <IconButton className="toggleButton" onClick={toggleSidebar}>
            {isSidebarOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
        </div>
        <div className="accountInfo gap-4 flex items-center">
          {userInfo ? (
            <>
              <Button onClick={handleMenuOpen} aria-haspopup="true" aria-controls="menu">
                {userInfo.profileImageURL && (
                  <ListItemIcon>
                    <Image
                      src={userInfo.profileImageURL}
                      width={30}
                      height={30}
                      alt={`Profile Image of ${userInfo.displayName}`}
                      className="rounded-full"
                    />
                  </ListItemIcon>
                )}
                <ListItemText primary={userInfo.displayName} />
              </Button>
              <Menu
                id="menu"
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <Link href="/admin/dashboard" style={{ textDecoration: 'none' }}>
                  <MenuItem>Dashboard</MenuItem>
                </Link>
                <Link href="/admin/account-settings" style={{ textDecoration: 'none' }}>
                  <MenuItem>Account Settings</MenuItem>
                </Link>
                <Logout />
              </Menu>
            </>
          ) : (
            <p>No user info available</p>
          )}
        </div>
      </div>
      {/* Drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={isSidebarOpen}
        classes={{
          paper: 'sidebar',
        }}
      >
        <Sidebar />
      </Drawer>
    </header>
  );
}
