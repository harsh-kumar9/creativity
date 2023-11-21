import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Controls from './Controls';
import Absent from './AUT/Absent';
import Generate from './AUT/Generate';
import Refine from './AUT/Refine';
import Introduction from "./Pages/Introduction";
import Consent from "./Pages/Consent";
import Feedback from "./Pages/Feedback";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Introduction />} />
          <Route path="/consent" element={<Consent />} />
          <Route path="/controls" element={<Controls />} />
          <Route path="/absent" element={<Absent />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/refine" element={<Refine />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
