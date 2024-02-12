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
            <Route path="/creativity/" element={<Introduction />} />
            <Route path="/creativity/consent" element={<Consent />} />
            <Route path="/creativity/controls" element={<Controls />} />
            <Route path="/creativity/absent" element={<Absent />} />
            <Route path="/creativity/generate" element={<Generate />} />
            <Route path="/creativity/refine" element={<Refine />} />
            <Route path="/creativity/feedback" element={<Feedback />} />
            <Route path="/creativity/game" element={<Game />} />
          </Routes>
        </Router>
      </DataContext.Provider>
    </div>
  );
}

export default App;
