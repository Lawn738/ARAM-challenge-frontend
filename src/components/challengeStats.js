import React, { useState } from "react";
import axios from "axios";
import App from "./../App";

function ChallengeStats() {
  const [userInput, setUserInput] = useState("");
  const [userData, setUserData] = useState(null);
  const [userUrlData, setUserUrlData] = useState(null);

  const fetchUserData = async () => {
    try {
      await axios.get(App.serverurl+"/api/user/"+userInput)
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
      const response = await axios.get(App.serverurl+"/api/newchallenge/XDD"+userData.name);
      setUserUrlData(response.data);
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };

  return (
    <div>
      {userData ? (
        <div>¨
          <p>User found</p>
          <p>Username: {userData.name}</p>
          <p>Summoner Level: {userData.summonerLevel}</p>
          <button onClick={createNewChallenge}>Create new challenge for: {userData.name}</button>
          {userUrlData && (
            <div>
              <p>User URL Data: {JSON.stringify(userUrlData)}</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <label>
            Summoner name:
            <input type="text" value={userInput} onChange={userInputChange} />
          </label>
          <button onClick={fetchUserData}>Fetch Data</button>
        </div>
      )}
    </div>
  );
}

export default ChallengeStats;
