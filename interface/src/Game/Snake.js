import React from "react";
import "./Game.css"

const Snake = props => {
  return (
    <div>
      {props.snakeDots.map((dot, i) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`
        };
        return <div id="snake" key={i} style={style} />;
      })}
    </div>
  );
};
export default Snake;
