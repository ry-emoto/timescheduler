import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'

const Footer = () => {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar variant="dense">
        <Typography sx={{m: "0 auto"}}><small>&copy; 2022 RyoEmo</small></Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Footer
