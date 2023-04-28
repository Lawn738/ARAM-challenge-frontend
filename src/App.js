import logo from './logo.svg';
import './App.css';
import Sidebar from "./Sidebar";
import ChallengeTest from './ChallengeTest';

function App() {
  
  return (
    <div className="App">
      {Sidebar()}
      <ChallengeTest />
    </div>
    
  );
}

export default App;
