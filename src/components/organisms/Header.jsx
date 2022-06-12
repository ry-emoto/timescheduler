import React from 'react'
import { AppBar, Box, Button, Toolbar, Typography, Stack } from '@mui/material'
import { auth } from '../../service/firebase';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" >
        <Toolbar variant="dense" component={Stack} direction="row" justifyContent="space-between">
          <Typography variant="h6" component="div" >
            Time Scheduler
          </Typography>
          <Button color="inherit" variant='outlined' size='small' onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    )
}

export default Header
