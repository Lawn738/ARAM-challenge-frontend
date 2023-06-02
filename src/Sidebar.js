import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InfoIcon from '@mui/icons-material/Info';
import { Avatar, Grid } from '@mui/material';
import fingerguns from "./fingerguns640.png";
import ChecklistIcon from '@mui/icons-material/Checklist';
import AddHomeIcon from '@mui/icons-material/AddHome';

import Home from './pages/Home.js';
import Challenge from './pages/Challenge';
import About from './pages/About';
import Footer from './components/footer';
import AddIcon from '@mui/icons-material/Add';
import NewChallenge from './pages/NewChallenge.js';

export default function PermanentDrawerLeft() {
  
  const [activePage, setActivePage] = useState([Home()]);
  
  const drawerContentIcons = [
    <AddHomeIcon />,
    <AddIcon />,
    <ChecklistIcon />,
    <InfoIcon />,
  ];
  
  const pages = [
    <Home />,
    <NewChallenge />,
    <Challenge />,
    <About />,
  ];
  


  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={1}>
        <Drawer open={true} 
        sx={{
          '& .MuiDrawer-paper': {
            zIndex:'0'
          },
        }}
        variant="persistent"
        anchor="left"
      >
            <Toolbar><Avatar variant="square" src={fingerguns} /></Toolbar>
            <Divider />
            <List>
              {['Home', 'New Challenge', 'Challenge', 'About'].map((text, index) => (
                <ListItem key={index} disablePadding onClick={() => setActivePage(pages[index])}>
                  <ListItemButton>
                    <ListItemIcon>
                    {drawerContentIcons[index]}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Drawer>
            </Grid>
            <Grid item xs={11}>
            {activePage}
            </Grid>
          </Grid>
          <Footer />
    </Box>
  );
}