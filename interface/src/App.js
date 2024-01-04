import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, createContext } from 'react';
import Controls from './Controls';
import Absent from './AUT/Absent';
import Generate from './AUT/Generate';
import Refine from './AUT/Refine';
import Introduction from "./Pages/Introduction";
import Consent from "./Pages/Consent";
import Feedback from "./Pages/Feedback";
import Game from "./Game/Game";

export const DataContext = createContext();

function App() {

  const [data, setData] = useState([]);

  const addData = (newData) => {
    setData((prevArray) => [...prevArray, newData]);
  }
  
  return (
    <div className="App">
      <DataContext.Provider value={{data, addData}}>
        <Router>
          <Routes>
            <Route path="/" element={<Introduction />} />
            <Route path="/consent" element={<Consent />} />
            <Route path="/controls" element={<Controls />} />
            <Route path="/absent" element={<Absent />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/refine" element={<Refine />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </Router>
      </DataContext.Provider>
    </div>
  );
}

export default App;
