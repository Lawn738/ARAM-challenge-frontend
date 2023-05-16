import logo from './logo.svg';
import './App.css';
import Sidebar from "./Sidebar";
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {Grid, TextField} from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import App from "./App";

function Home() {
  

  const [username,
    setUsername] = useState();
  const beginChallenge = () => {createChallenge()};
  
  const [champions,
    setChampions] = useState([]);
  const [championList,
    setChampionList] = useState([]);


function createChallenge() {
  //  const axios = require('axios');

  let path = App.serverurl+'/api/newchallenge/'
  let completePath = path + username;

  let config = {
      maxBodyLength: Infinity,
      url: completePath,
      headers: {}
  };

  console.log(config)

  axios
      .get(completePath)
      .then((response) => {
          console.log(JSON.stringify(response.data));
          setChampions(response.data.championlist.list);
          setChampionList(champions.map((champion) => (
              <div>
                  <p key={champion.id}>{champion.name}
                      --- {champion.wins}
                      --- {champion.losses}</p>
              </div>
          )));

      })
      .catch((error) => {
          console.log(error);
      });
}








  return (
    <div>
                  <Box container>
                <Box item>

                    <button onClick={beginChallenge}>Start a challenge</button>

                    <Grid item>
                        <TextField id="PlayerSearchField" label="Player Username" variant="standard" onChange={e => setUsername(e.target.value)}/>
                    </Grid>

                    <Grid item>
                        <Paper>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>id</TableCell>
                                        <TableCell>name</TableCell>
                                        <TableCell>wins</TableCell>
                                        <TableCell>losses</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {champions.map(champion => (
                                        <TableRow
                                            key={champion}
                                            sx={{
                                            '&:last-child td, &:last-child th': {
                                                border: 0
                                            }
                                        }}>
                                            <TableCell>{champion.id}</TableCell>
                                            <TableCell>{champion.name}</TableCell>
                                            <TableCell>{champion.wins}</TableCell>
                                            <TableCell>{champion.losses}</TableCell>
                                        </TableRow>
                                    ))
                                    }
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Box>
            </Box>
    </div>
  );
}

export default Home;
