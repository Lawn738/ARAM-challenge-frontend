import React, { useState } from "react";
import axios from "axios";

function NewChallenge() {
  const [userInput, setUserInput] = useState("");
  const [userData, setUserData] = useState(null);
  const [userUrlData, setUserUrlData] = useState(null);

  const handleButtonClick = async () => {
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

  const handleUserInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleUrlButtonClick = async () => {
    try {
      const response = await axios.get("http://example.com/api/"+userData.name);
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
          <button onClick={handleUrlButtonClick}>Create new challenge for: {userData.name}</button>
          {userUrlData && (
            <div>
              <p>User URL Data: {JSON.stringify(userUrlData)}</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <label>
            Input:
            <input type="text" value={userInput} onChange={handleUserInputChange} />
          </label>
          <button onClick={handleButtonClick}>Fetch Data</button>
        </div>
      )}
    </div>
  );
}

export default NewChallenge;
