import './App.css';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {Grid, TextField} from '@mui/material';

import Dialog from '@mui/material/Dialog';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';


function Challenge() {
    const [thisChallenge, setThisChallenge] = useState("");
    const [totalWins, setTotalWins] = useState(0);
    const [totalGames, setGames] = useState(0);
    const [totalLosses, setTotalLosses] = useState(0);
    const [challengeStartDate, setChallengeStartDate] = useState(0);
    const [lastRefresh, setLastRefresh] = useState(0);

    const [challenges,
        setChallenges] = useState([]);
    const [challengeList,
        setChallengeList] = useState([]);
    const [champions,
        setChampions] = useState([]);
    const [championList,
        setChampionList] = useState([]);
    const [url,
        setUrl] = useState("87.92.14.245:8080/api/challenge/");
    const [selectedChallengeId,
        setChallengeId] = useState("");
    const [open,
        setOpen] = useState(false);
        const [textFieldContent,
          setFieldContent] = useState("")

    const handleClickOpen = () => {
        lookForChallenges()
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    function lookForChallenges() {
        let path = 'http://87.92.14.245:8080/api/challengelists'
        let completePath = path;

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
                setChallenges(response.data);
                setChallengeList(challenges.map((challenge) => (
                    <div>
                        <p key={challenge.challenge_id}>{challenge.username},{challenge.startDate}</p>
                    </div>
                )));

            })
            .catch((error) => {
                console.log(error);
            });

        console.log(challenges.map((challenge) => (challenge.challenge_id + " " + challenge.username + " " + challenge.startDate)))
    }

    function fetchChallenge() {
        //  const axios = require('axios');

        let path = 'http://87.92.14.245:8080/api/challenge/'
        let id2 = '2935f016-1a0c-4480-a65d-df1fa4052bc4'
        let id = selectedChallengeId
        let completePath = path + id;

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
                setThisChallenge(response.data.challenge_id);
                
                // Set stats
                setGames(response.data.totalGames);
                setTotalWins(response.data.totalWins);
                setTotalLosses(response.data.totalLosses);
                setChallengeStartDate(new Date(response.data.startDate).toDateString());
                setLastRefresh(new Date(response.data.lastRefresh).toDateString());

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

        console.log(fetchChallenge)
    }

    // Refresh challenge
    function refreshChallenge() {
        let path = 'http://87.92.14.245:8080/api/refreshchallenge/'
        axios
            .get(path+thisChallenge)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setChampions(response.data.championlist.list);
                
                // Set stats
                setGames(response.data.totalGames);
                setTotalWins(response.data.totalWins);
                setTotalLosses(response.data.totalLosses);
                setChallengeStartDate(new Date(response.data.startDate).toDateString());
                setLastRefresh(new Date(response.data.lastRefresh).toDateString());

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
            <h1>Challenge</h1>
            <h3>Enter your challenge id to view your challenge</h3>
                <Dialog onClose={handleClose} open={open}>
                    <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>id</TableCell>
                                <TableCell>name</TableCell>
                                <TableCell>startdate</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {challenges.map(challenge => (
                                <TableRow
                                    key={challenge}
                                    sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    
                                    },
                                    
                                }}>
                                    <TableCell>{challenge.challenge_id}</TableCell>
                                    <TableCell>{challenge.username}</TableCell>
                                    <TableCell>{challenge.startDate}</TableCell>
                                </TableRow>
                            ))
}
                        </TableBody>
                    </Table>
                    <button onClick={handleClose}></button>
                    </Paper>
                </Dialog>


            <Box container>
                <Box item>


                    <Grid item>
                        <TextField id="PlayerSearchField" label="Challenge id" variant="standard" onChange={e => setChallengeId(e.target.value)}>{textFieldContent}</TextField>
                    </Grid>
                    <button onClick={fetchChallenge}>Fetch challenge</button>

                    <Grid item>  
                            <Table>
                                <TableHead>
                                <div style={{textAlign: 'right'}}>
                                    <h3>Challenge stats</h3>
                                    <div>Start date: {challengeStartDate}</div>
                                    <div>Total games: {totalGames}</div>
                                    <div>Wins: {totalWins}</div>
                                    <div>Losses: {totalLosses}</div>
                                    <div>Last refresh: {lastRefresh}</div>
                                    <button onClick={refreshChallenge}>Refresh challenge</button>
                                </div>
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
                                            <TableCell>{champion.name}
                                            <Avatar variant="square" height="200%" wdith="200%" src={require('./images/'+champion.name+'.png')}/>
                                            </TableCell>
                                            <TableCell>{champion.wins}{champion.wins > 0 ? <Checkbox disabled checked /> : <Checkbox disabled /> }</TableCell>
                                            <TableCell>{champion.losses}</TableCell>
                                        </TableRow>
                                    ))
                                    }
                                </TableBody>
                            </Table>
                     
                    </Grid>
                </Box>
            </Box>

        </div>
    );

}

export default Challenge;
//<Avatar variant="square" height="200%" wdith="200%" src={'http://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/'+champion.id.replace(/\W|_/g, '')+'.png'}/>
//<Avatar variant="square" src={require('./images/'+champion.name.replace(/\W|_/g, '')+'.png')} />
//{champion.wins > 0 ? <Avatar position="static" variant="square" src={checkmark}/> : <Avatar variant="square" src={blank}/> }