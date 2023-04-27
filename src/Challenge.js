import logo from './logo.svg';
import './App.css';
import Sidebar from "./Sidebar";

const champions = [
  "Mr. man",
  "Peepo",
  "Barack obama", 
  ]

function Challenge() {
  
  return (
    <div>
      <h1> This is the Challenge page </h1>
      {champions.map((text, index) => (
        <li>{champions[index]}</li>
      ))}
    </div>
  );
}

export default Challenge;
