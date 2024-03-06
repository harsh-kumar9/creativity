import React, { useEffect, useContext } from "react";
import { DataContext } from "../App";
import { useNavigate } from 'react-router-dom';
import background from "../assets/blur-background.svg";
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
    <div style={{ backgroundImage: `url(${background})` }} className="text-white h-screen w-screen items-center justify-center space-y-8 p-14 bg-cover">
    </div>
  );
}

export default Controls;