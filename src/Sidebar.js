import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
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
import About from './About';

import AddIcon from '@mui/icons-material/Add';
import NewChallenge from './components/NewChallenge';

const drawerWidth = 240;
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



export default function PermanentDrawerLeft() {

    const [activePage, setActivePage] = useState([Home()]);

  


  return (
    <div>
      <Grid>
        <Grid>
          <SwipeableDrawer variant="permanent" anchor="left">
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
          </SwipeableDrawer>
            </Grid>
            <Grid>
            {activePage}
            </Grid>
          </Grid>
    </div>
  );
}