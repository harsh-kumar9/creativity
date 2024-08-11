import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, createContext, useEffect } from 'react';
import Controls from './Pages/Controls';
import Absent from './AUT/Absent';
import Generate from './AUT/Generate';
import Coach from './AUT/Coach';
import Refine from './AUT/Refine';
import Introduction from "./Pages/Captcha";
import InstructAbsent from './Pages/InstructAbsent';
import InstructGenerate from './Pages/InstructGenerate';
import InstructCoach from './Pages/InstructCoach';
import Thanks from './Pages/Thanks';
import Captcha from "./Pages/Captcha";
import Consent from "./Pages/Consent";
import Feedback from "./Pages/Feedback";
import Game from "./Game/Game";

export const DataContext = createContext();
export const mTurkContext = createContext();

function App() {

  const [data, setData] = useState([]);

  const addData = (newData) => {
    setData((prevArray) => [...prevArray, newData]);
  }

  const [mTurk, setMTurk] = useState({});

  const addMTurk = (key, value) => {
    setMTurk((prevData) => ({
      ...prevData,
      [key]: value 
    }));
  }

  const [acceptedHIT, setAcceptedHIT] = useState(false);

  useEffect(() => {  
		const urlParams = new URLSearchParams(window.location.search);  
		const assignmentId = urlParams.get("assignmentId") || "test";
		setAcceptedHIT(assignmentId !== "ASSIGNMENT_ID_NOT_AVAILABLE");  
		const hitId = urlParams.get("hitId") || "test";  
		const turkSubmitTo = urlParams.get("turkSubmitTo") || "test";  
		const workerId = urlParams.get("workerId") || "test" + Math.floor(Math.random() * 10000);  

    addMTurk("assignmentId", assignmentId);
    addMTurk("hitId", hitId);
    addMTurk("turkSubmitTo", turkSubmitTo);
    addMTurk("workerId", workerId);

	  }, []); 
  
    return (
      <div className="App">
        {!acceptedHIT ? (
          <div>
            In this study, you will be asked to provide alternative uses for commonly found items. 
            We estimate this task will take around 10 minutes. You must accept this task to continue.
          </div>
        ) : (
          <DataContext.Provider value={{data, addData}}>
            <mTurkContext.Provider value={{mTurk, addMTurk}}>
              <Router>
                <Routes>
                  <Route path="/creativity/" element={<Captcha />} />
                  <Route path="/creativity/instructabsent" element={<InstructAbsent />} />
                  <Route path="/creativity/instructgenerate" element={<InstructGenerate />} />
                  <Route path="/creativity/instructcoach" element={<InstructCoach />} />
                  <Route path="/creativity/thanks" element={<Thanks />} />
                  <Route path="/creativity/consent" element={<Consent />} />
                  <Route path="/creativity/controls" element={<Controls />} />
                  <Route path="/creativity/absent" element={<Absent />} />
                  <Route path="/creativity/generate" element={<Generate />} />
                  <Route path="/creativity/coach" element={<Coach />} />
                  <Route path="/creativity/refine" element={<Refine />} />
                  <Route path="/creativity/feedback" element={<Feedback />} />
                  <Route path="/creativity/game" element={<Game />} />
                </Routes>
              </Router>
            </mTurkContext.Provider>
          </DataContext.Provider>
        )}
      </div>
    );
    
}

export default App;
