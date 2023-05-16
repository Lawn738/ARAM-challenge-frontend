import React, { useState } from "react";
import axios from "axios";

function NewChallenge() {
  const [userInput, setUserInput] = useState("");
  const [userData, setUserData] = useState(null);
  const [userUrlData, setUserUrlData] = useState(null);
  const [challengeId, setChallengeId] = useState(null);

  const fetchUserData = async () => {
    try {
      await axios.get("http://localhost:8080/api/user/"+userInput)
      .then(res => {
        const { name, summonerLevel} = res.data;
        console.log(res);
        setUserData({ name, summonerLevel});

      })

    } catch (error) {
      console.error(error);
      console.log("User not found")
    }
  };

  const userInputChange = (event) => {
    setUserInput(event.target.value);
  };

  // fix url when ready
  const createNewChallenge = async () => {
    try {
      await axios.get("http://localhost:8080/api/newchallenge/"+userData.name)
      .then(res => {
        const { name, summonerLevel} = res.data;
        console.log(res.data.challenge_id);
        setChallengeId(res.data.challenge_id);

      })
      
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };

  return (
    <div>
      {userData ? (
        <div>
          <div>
            <p>User found</p>
            <p>Username: {userData.name}</p>
            <p>Summoner Level: {userData.summonerLevel}</p>
            <button onClick={createNewChallenge}>Create new challenge for: {userData.name}</button>
            <p>Your challenge id is: {challengeId}</p>
          </div>
        </div>
      ) : (
        <div>
          <label>
            Summoner name:
            <input type="text" value={userInput} onChange={userInputChange} />
          </label>
          <button onClick={fetchUserData}>Fetch user</button>
        </div>
      )}
    </div>
  );
}

export default NewChallenge;
