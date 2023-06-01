import logo from './logo.svg';
import './App.css';
import Sidebar from "./Sidebar";
import ChallengeTest from './Challenge';
import Footer from './components/footer';

function App() {
  
  return (
    <div className="App">
      {Sidebar()}
      <Footer />
    </div>
    
  );
}

export default App;
