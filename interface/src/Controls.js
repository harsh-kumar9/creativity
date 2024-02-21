import React, { useEffect, useContext } from "react";
import { DataContext } from "./App";
import { useNavigate } from 'react-router-dom';
import "./Controls.css";

const Controls = () => {

  const navigate = useNavigate();

  const experimentTypes = ["absent", "generate", "coach"]

  const {data, addData} = useContext(DataContext);

  useEffect(() => {
    const randomType = experimentTypes[Math.floor(Math.random() * 3)];
    navigate(`/creativity/instruct${randomType}`);
    addData(randomType);
  }, [])

  return (
  <div className="h-screen items-center justify-center flex text-3xl font-semibold space-y-8 bg-amber-400">
    <div className="flex flex-col items-center justify-center rounded-2xl p-24 bg-amber-500">
      <h1 className="mb-8">ALTERNATIVE USES TASK</h1>
      <div className="flex flex-row flex-wrap space-x-4 items-center justify-center">
        {/* <button onClick={handleAbsentClick} className="outline outline-4 w-48 h-16 rounded-lg hover:bg-orange-500">ABSENT</button>
        <button onClick={handleGenerateClick} className="outline outline-4 w-48 h-16 rounded-lg hover:bg-orange-500">GENERATE</button>
        <button onClick={handleRefineClick} className="outline outline-4 w-48 h-16 rounded-lg hover:bg-orange-500">REFINE</button> */}
      </div>
    </div>
  </div>
  );
}

export default Controls;