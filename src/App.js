import logo from './logo.svg';
import './App.css';
import Sidebar from "./Sidebar";
import ChallengeTest from './Challenge';

const localurl = 'http://localhost:3000';
const serverurl = 'http://localhost:3000';

function App() {
  
  return (
    <div className="App">
      {Sidebar()}
    </div>
    
  );
}

export default App;
