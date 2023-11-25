import React from "react";
import "./Game.css";

const Food = props => {
  const style = {
    left: `${props.dot[0]}%`,
    top: `${props.dot[1]}%`
  };
  return <div id="food" style={style} />;
};

export default Food;