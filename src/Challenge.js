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
import { TableVirtuoso } from 'react-virtuoso';

function Challenge() {
    const [champions, setChampions] = useState([]);
    const [championList, setChampionList] = useState([]);
    const [url, setUrl] = useState("lawn.ddns.net:8080/api/challengelists");
    const [challengeId, setChallengeId] = useState("f03ab23a-0284-48e6-a6fd-2b4715bc90f5");

    function fetchChallenge(){
        axios.get(url + challengeId)
        .then(res => {
            setChampions(res.data.championlist.list);
            setChampionList(champions.map((champion) => (
                <div>
                    <p key={champion}>{champion.name} --- {champion.wins} --- {champion.losses}</p>
                </div>
            )));
          
        })
        .catch(error => console.err(error))
      };

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

        const sample = [
            ['Frozen yoghurt', 159, 6.0, 24, 4.0],
            ['Ice cream sandwich', 237, 9.0, 37, 4.3],
            ['Eclair', 262, 16.0, 24, 6.0],
            ['Cupcake', 305, 3.7, 67, 4.3],
            ['Gingerbread', 356, 16.0, 49, 3.9],
          ];
          
          function createData(id, dessert, calories, fat, carbs, protein) {
            return { id, dessert, calories, fat, carbs, protein };
          }
          
          const columns = [
            {
              width: 200,
              label: 'Dessert',
              dataKey: 'dessert',
            },
            {
              width: 120,
              label: 'Calories\u00A0(g)',
              dataKey: 'calories',
              numeric: true,
            },
            {
              width: 120,
              label: 'Fat\u00A0(g)',
              dataKey: 'fat',
              numeric: true,
            },
            {
              width: 120,
              label: 'Carbs\u00A0(g)',
              dataKey: 'carbs',
              numeric: true,
            },
            {
              width: 120,
              label: 'Protein\u00A0(g)',
              dataKey: 'protein',
              numeric: true,
            },
          ];
          
          const rows = Array.from({ length: 200 }, (_, index) => {
            const randomSelection = sample[Math.floor(Math.random() * sample.length)];
            return createData(index, ...randomSelection);
          });
          
          const VirtuosoTableComponents = {
            Scroller: React.forwardRef((props, ref) => (
              <TableContainer component={Paper} {...props} ref={ref} />
            )),
            Table: (props) => (
              <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
            ),
            TableHead,
            TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
            TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
          };
          
          function fixedHeaderContent() {
            return (
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.dataKey}
                    variant="head"
                    align={column.numeric || false ? 'right' : 'left'}
                    style={{ width: column.width }}
                    sx={{
                      backgroundColor: 'background.paper',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            );
          }
          
          function rowContent(_index, row) {
            return (
              <React.Fragment>
                {columns.map((column) => (
                  <TableCell
                    key={column.dataKey}
                    align={column.numeric || false ? 'right' : 'left'}
                  >
                    {row[column.dataKey]}
                  </TableCell>
                ))}
              </React.Fragment>
            );
          }

            return (
                <Box>
              <Paper style={{ height: 1000, width: '100%' }}>
                <TableVirtuoso
                  data={rows}
                  components={VirtuosoTableComponents}
                  fixedHeaderContent={fixedHeaderContent}
                  itemContent={rowContent}
                />
              </Paper>
              </Box>
            );
        
}

export default Challenge;
