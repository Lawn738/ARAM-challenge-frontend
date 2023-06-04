import React, { useState } from "react";
import axios from "axios";
import "../champion.css";

const Challenge = () => {
  const [champions, setChampions] = useState([]);
  const [rawChampionData, setRawChampionData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [fetchStatus, setFetchStatus] = useState();
  const [thisChallenge, setThisChallenge] = useState("");
  const [uniqueWins, setUniqueWins] = useState(0);
  const [challengeStats, setChallengeStats] = useState({
    challenge_id: "",
    username: "",
    totalGames: 0,
    totalWins: 0,
    totalLosses: 0,
    startDate: 0,
    lastRefresh: 0,
  });

  //Fetch Challenge
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://aramchallenge:8080/api/challenge/${inputText}`
      );
      setFetchStatus(true);
      const championList = Object.values(response.data.championlist.list);
      const championObjects = championList.map((champion) => ({
        id: champion.id,
        wins: champion.wins,
        losses: champion.losses,
        name: champion.name,
      }));

      // Update Challenge stats
      setChallengeStats(() => ({
        challenge_id: response.data.challenge_id,
        username: response.data.username,
        totalGames: response.data.totalGames,
        totalWins: response.data.totalWins,
        totalLosses: response.data.totalLosses,
        startDate: new Date(response.data.startDate).toDateString(),
        lastRefresh: new Date(response.data.startDate).toLocaleTimeString(),
      }));

      setChampions(championObjects);
      setRawChampionData(championObjects);
      setThisChallenge(response.data.challenge_id);

      // Filter out characters with at least 1 win
      const championsWithWins = championList.filter(
        (champion) => champion.wins > 0
      );
      setUniqueWins(championsWithWins.length);
    } catch (error) {
      setFetchStatus(false);
      console.error(error);
    }
  };

  // Refresh Challenge
  const refreshChallenge = async () => {
    let path = "http://aramchallenge:8080/api/refreshchallenge/";
    try {
      const response = await axios.get(path + thisChallenge);
      setFetchStatus(true);
      const championList = Object.values(response.data.championlist.list);
      const championObjects = championList.map((champion) => ({
        id: champion.id,
        wins: champion.wins,
        losses: champion.losses,
        name: champion.name,
      }));

      // Update Challenge stats
      setChallengeStats(() => ({
        challenge_id: response.data.challenge_id,
        username: response.data.username,
        totalGames: response.data.totalGames,
        totalWins: response.data.totalWins,
        totalLosses: response.data.totalLosses,
        startDate: new Date(response.data.startDate).toDateString(),
        lastRefresh: new Date(response.data.startDate).toLocaleTimeString(),
      }));

      setChampions(championObjects);
      setRawChampionData(championObjects);

      // Find out how many unique champions have at least 1 win
      const championsWithWins = championList.filter(
        (champion) => champion.wins > 0
      );
      setUniqueWins(championsWithWins.length);
    } catch (error) {
      setFetchStatus(false);
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  // Update filters
  const filterInputChanged = (event) => {
    setFilterInput(event.target.value);
    console.log(filterInput);
    const filteredChampions = champions.filter((champion) =>
      champion.name.toLowerCase().includes(filterInput.toLowerCase())
    );
    setChampions(filteredChampions);
  };


  const filterByWins = () => {
    const filteredChampions = champions.filter((champion) => champion.wins < 1);
    setChampions(filteredChampions);
  };

  // Reset list filters
  const resetFilter = () => {
    setFilterInput("");
    setChampions(rawChampionData);
  };

  return (
    <div>
      <h1>Challenge</h1>
      <div>
        {fetchStatus === false && (
          <p>Challenge not found. Check your challenge id.</p>
        )}
      </div>
      <input
        placeholder="Challenge id"
        className="input-field"
        type="text"
        value={inputText}
        onChange={handleInputChange}
      />
      <button className="button" onClick={() => fetchData()}>
        Fetch challenge
      </button>
      <div>
        {fetchStatus === true && (
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginRight: "20px",
                padding: "25px",
              }}
            >
              <div className="challenge-data-container">
                <h3>Challenge stats</h3>
                <div>Username: {challengeStats.username}</div>
                <div>Challenge started: {challengeStats.startDate}</div>
                <div>Total games played: {challengeStats.totalGames}</div>
                <div>Total wins: {challengeStats.totalWins}</div>
                <div>Total losses: {challengeStats.totalLosses}</div>
                <div>
                  Winrate:{" "}
                  {(challengeStats.totalWins / challengeStats.totalGames) * 100}
                  %
                </div>
                <div>
                  Challenge progress: {uniqueWins} / {rawChampionData.length}
                </div>
              </div>
              <div className="challenge-data-container">
                <p>Refresh challenge</p>
                <button className="refresh-button"onClick={() => refreshChallenge()}>Refresh</button>
                <p>Last refresh: {challengeStats.lastRefresh}</p>
              </div>
            </div>
            <div style={{ margin: "20px", border: "2px solid" }}>
              <h4>Filter champions</h4>
              <h4>{filterInput}</h4>
              <input
                placeholder="Champion"
                type="text"
                defaultValue={filterInput}
                onChange={filterInputChanged}
              />
              <button className="button" onClick={() => resetFilter()}>
                Reset
              </button>
              <button className="button" onClick={() => filterByWins()}>
                Filter out completed
              </button>
            </div>
            <div className="champion-grid">
              {champions.map((champion) => (
                <div
                  key={champion.id}
                  className={
                    champion.wins > 0 ? "champion-item2" : "champion-item1"
                  }
                >
                  <div>
                    {champion.wins > 0 ? (
                      <img
                        className="champion-image"
                        src={require("../images/" + champion.name + ".png")}
                        alt={champion.name}
                      />
                    ) : (
                      <img
                        src={require("../images/" + champion.name + ".png")}
                        alt={champion.name}
                      />
                    )}
                  </div>
                  <p>{champion.name}</p>
                  <div>Wins: {champion.wins}</div>
                  <div>Losses: {champion.losses}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Challenge;
