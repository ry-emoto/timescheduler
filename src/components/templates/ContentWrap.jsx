import React from 'react'
import { List, Checkbox, Box, Button, Card, Divider, FormControl, IconButton,   ListItem,  ListItemIcon, ListItemText, MenuItem, Select, Stack, TextField, Typography, InputLabel } from '@mui/material';

const ContentWrap = (props) => {
  return (
    <Stack spacing={1} sx={{ width: "400px", m: "0 auto" }}>
      <Typography variant="h5" textAlign="center">
        {props.title}
      </Typography>
      {props.chldren}
    </Stack>
  )
}

export default ContentWrap
