import '../App.css';
import React, {useEffect, useState} from 'react';


function Home() {
  

  return (
    <div class='.flex-container'>
      <div className=".flexbox-item1">
        <h1>ARAM-Challenge</h1>
      </div>
      <div className='text-block-container'>
        <div className='text-block'>
        <h2>ARAM Challenge</h2>
        <p>This service tracks your played ARAM games and saves wins and losses data</p>
        <p>Be sure to check back and refresh your challenge time to time to get new data added</p>
        <p>Navigate to New Challenge to get your challenge started</p>
        <p>To check your current progress check Challenge section from the navigation</p>
        </div>
        <div className='text-block'>
        <h2>Challenge rules:</h2>
        <p>To complete the challenge win at least one ARAM game with each available champion</p>
        <p>Champions released after you started the challenge wont be counted</p>
        </div>
      </div>
    </div>
  )
  
}

export default Home;
