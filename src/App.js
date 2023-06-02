import logo from './logo.svg';
import './App.css';
import Sidebar from "./Sidebar";
import React, { useState } from "react";
import ChallengeTest from './pages/Challenge';


function App() {
  
  return (
    <div className="App">
      {Sidebar()}
    </div>
    
  );
}

export default App;
