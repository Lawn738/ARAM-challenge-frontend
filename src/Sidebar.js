import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InfoIcon from '@mui/icons-material/Info';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar, Grid } from '@mui/material';
import fingerguns from "./fingerguns640.png";
import ChecklistIcon from '@mui/icons-material/Checklist';
import AddHomeIcon from '@mui/icons-material/AddHome';
import Home from './Home';
import Challenge from './Challenge';
import ChallengeTest from './Challenge';
import About from './About';

const drawerWidth = 240;
const drawerContentIcons = [
  <AddHomeIcon />,
  <ChecklistIcon />,
  <InfoIcon />,
];

const pages = [
  <Home />,
  <Challenge />,
  <About />,
];



export default function PermanentDrawerLeft() {

    const [activePage, setActivePage] = useState([Home()]);

  


  return (
    <div>
    <Grid>
      <Box item>
        <Box sx={{ display: 'flex'}}>
          <AppBar
            position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
          >
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar><Avatar variant="square" src={fingerguns} /></Toolbar>
            <Divider />
            <List>
              {['Home', 'Challenge', 'About'].map((text, index) => (
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
        </Box>
        </Box>
        <Box item>
        <Box>
          {activePage}
        </Box>
        </Box>
    </Grid>
    </div>
  );
}