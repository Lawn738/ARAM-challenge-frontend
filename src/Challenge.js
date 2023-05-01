import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Challenge() {
    const [champions, setChampions] = useState([]);
    const [championList, setChampionList] = useState([]);
    const [url, setUrl] = useState("localhost:8080/api/challengelists");
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


  return (
    <div>
      <h2>ChallengeTest.js</h2>
      {test}
      <button onClick={fetchChallenge}>
        Fetch challenge
      </button>
      </div>
  );
}

export default Challenge;
