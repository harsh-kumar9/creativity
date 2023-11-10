import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Controls from './Controls';
import Absent from './AUT/Absent';
import Generate from './AUT/Generate';
import Refine from './AUT/Refine';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Controls />} />
          <Route path="/absent" element={<Absent />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/refine" element={<Refine />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
