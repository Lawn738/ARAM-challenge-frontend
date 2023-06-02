import React, { useState } from "react";
import axios from "axios";
import "../champion.css";
import "../App.css";

function NewChallenge() {
  const [userInput, setUserInput] = useState("");
  const [userData, setUserData] = useState(null);
  const [userUrlData, setUserUrlData] = useState(null);
  const [challengeId, setChallengeId] = useState(null);

  const fetchUserData = async () => {
    try {
      await axios
        .get("http://localhost:8080/api/user/" + userInput)
        .then((res) => {
          const { name, summonerLevel } = res.data;
          setUserData({ name, summonerLevel });
        });
    } catch (error) {
      console.error(error);
    }
  };

  const userInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const createNewChallenge = async () => {
    try {
      await axios
        .get("http://localhost:8080/api/newchallenge/" + userData.name)
        .then((res) => {
          setChallengeId(res.data.challenge_id);
        });
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };

  return (
    <div>
      <h1>New Challenge</h1>
      {userData ? (
        <div>
          <div>
            <p>User found</p>
            <p>Username: {userData.name}</p>
            <p>Summoner Level: {userData.summonerLevel}</p>
            <button className="button" onClick={createNewChallenge}>
              Create new challenge for: {userData.name}
            </button>
            <p>Your challenge id is: <b>{challengeId}</b></p>
          </div>
          <div className="text-block-container">
        <div className="text-block">
          <h3>Creating a new challenge</h3>
          <p>If your summoner name was correct, start your ARAM Challenge from the button above </p>
          <p><b>Be sure to save your ARAM Challenge ID and not lose it.</b></p>
          <p>Recovering lost challenges is currently not possible.</p>
          <p>Be sure to come back and refresh your challenge from "Challenge" page regularly. This service can only fetch and track your 25 latest ARAM games at a time.</p>
        </div>
      </div>
        </div>
      ) : (
        <div>
            <input
              placeholder="Summoner name"
              type="text"
              value={userInput}
              onChange={userInputChange}
              className="input-field2"
            />
          <button className="button" onClick={fetchUserData}>Fetch user</button>
          <div className="text-block-container">
        <div className="text-block">
          <h3>Creating a new challenge</h3>
          <p>Enter your League of Legends username (ingame name) to the field above to get started. </p>
          <p>ARAM Challenge currently only tracks games played on <b>EUNE</b> server. </p>
          <p>If you play on other servers, wait till ARAM Challenge gets implemented to your server.</p>
        </div>
      </div>
        </div>
      )}
    </div>
  );
}

export default NewChallenge;
