import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Grid, TextField } from '@mui/material';

function Challenge() {
    const [champions, setChampions] = useState([]);
    const [championList, setChampionList] = useState([]);
    const [url, setUrl] = useState("localhost:8080/api/challenge/");
    const [challengeId, setChallengeId] = useState("0e0027dc-27f5-4f9d-8343-e1cfeebb94fe");

    
    function fetchChallenge2(){
    //  const axios = require('axios');

      let path = 'http://localhost:8080/api/challenge/'
      let id = '0e0027dc-27f5-4f9d-8343-e1cfeebb94fe'
      let completePath = path + id;

      let config = {
        maxBodyLength: Infinity,
        url: completePath,
        headers: { }
      };

      console.log(config)

      axios.get(completePath)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setChampions(response.data.championlist.list);
        setChampionList(champions.map((champion) => (
            <div>
                <p key={champion.id}>{champion.name} --- {champion.wins} --- {champion.losses}</p>
            </div>
        )));
        
      })
      .catch((error) => {
        console.log(error);
      });
    }

    let test;
        if (champions.length === 0) {
            test = (
            <div>
                <h1>Enter challenge_id and press fetch</h1>
            </div>
            )
        } else {
            test = (
            <div>
                <h3>Champion --- Wins --- Losses</h3>
                {championList}
            </div>
            )
        }

        console.log(fetchChallenge2())

            return (
            
              

            <Box container>
                <Box item>

                <button onClick={fetchChallenge2}>testes</button>

                    <Grid item>
                        <TextField id="PlayerSearchField" label="Player Username" variant="standard" />
                    </Grid>

                    <Grid item>
                        <Paper style={{ alignContent:'flex-end', height: 1000 }}>
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
                              {
                                champions.map(champion => (
                                  <TableRow key={champion}
                                  sx={{'&:last-child td, &:last-child th': { border:0 } }}
                                  >
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
            );
        
}

export default Challenge;
