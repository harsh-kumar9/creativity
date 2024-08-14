import React, { Component } from "react";
import Snake from "./Snake";
import Food from "./Food";
import Button from "./Button";
import Menu from "./Menu";
import "./Game.css";

const getRandomFood = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return [x, y];
  };
  
  const initialState = {
    food: getRandomFood(),
    direction: "RIGHT",
    speed: 100,
    route: "menu",
    snakeDots: [[0, 0], [0, 2]],
    timeRemaining: 60, // New timer state
  };
  
  class Game extends Component {
    constructor() {
      super();
      this.state = initialState;
    }
  
    componentDidMount() {
      setInterval(this.moveSnake, this.state.speed);
      document.onkeydown = this.onKeyDown;
      this.timerID = setInterval(() => this.updateTimer(), 1000); // Set up the timer
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID); // Clear the timer when the component is unmounted
    }
  
    updateTimer() {
      if (this.state.timeRemaining > 0) {
        this.setState({ timeRemaining: this.state.timeRemaining - 1 });
      } else {
        this.gameOver(); // End the game when the timer reaches 0
      }
    }
  
    componentDidUpdate() {
      this.onSnakeOutOfBounds();
      this.onSnakeCollapsed();
      this.onSnakeEats();
    }
  
    onKeyDown = e => {
      e = e || window.event;
      switch (e.keyCode) {
        case 37:
          this.setState({ direction: "LEFT" });
          break;
        case 38:
          this.setState({ direction: "UP" });
          break;
        case 39:
          this.setState({ direction: "RIGHT" });
          break;
        case 40:
          this.setState({ direction: "DOWN" });
          break;
      }
    };
  
    moveSnake = () => {
      let dots = [...this.state.snakeDots];
      let head = dots[dots.length - 1];
      if (this.state.route === "game") {
        switch (this.state.direction) {
          case "RIGHT":
            head = [head[0] + 2, head[1]];
            break;
          case "LEFT":
            head = [head[0] - 2, head[1]];
            break;
          case "DOWN":
            head = [head[0], head[1] + 2];
            break;
          case "UP":
            head = [head[0], head[1] - 2];
            break;
        }
        dots.push(head);
        dots.shift();
        this.setState({
          snakeDots: dots
        });
      }
    };
  
    onSnakeOutOfBounds() {
      let head = this.state.snakeDots[this.state.snakeDots.length - 1];
      if (this.state.route === "game") {
        if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
          this.gameOver();
        }
      }
    }
  
    onSnakeCollapsed() {
      let snake = [...this.state.snakeDots];
      let head = snake[snake.length - 1];
      snake.pop();
      snake.forEach(dot => {
        if (head[0] == dot[0] && head[1] == dot[1]) {
          this.gameOver();
        }
      });
    }
  
    onSnakeEats() {
      let head = this.state.snakeDots[this.state.snakeDots.length - 1];
      let food = this.state.food;
      if (head[0] == food[0] && head[1] == food[1]) {
        this.setState({
          food: getRandomFood()
        });
        this.increaseSnake();
        this.increaseSpeed();
      }
    }
  
    increaseSnake() {
      let newSnake = [...this.state.snakeDots];
      newSnake.unshift([]);
      this.setState({
        snakeDots: newSnake
      });
    }
  
    increaseSpeed() {
      if (this.state.speed > 10) {
        this.setState({
          speed: this.state.speed - 20
        });
      }
    }
  
    onRouteChange = () => {
      this.setState({
        route: "game"
      });
    };
  
    gameOver() {
      
      // Preserve the current timeRemaining instead of resetting to 60 seconds
      const currentTimeRemaining = this.state.timeRemaining;

      // Reset the game state, but keep the current time remaining
      this.setState({
        ...initialState,
        timeRemaining: currentTimeRemaining
      });
    }
  
    onDown = () => {
      let dots = [...this.state.snakeDots];
      let head = dots[dots.length - 1];
  
      head = [head[0], head[1] + 2];
      dots.push(head);
      dots.shift();
      this.setState({
        direction: "DOWN",
        snakeDots: dots
      });
    };
  
    onUp = () => {
      let dots = [...this.state.snakeDots];
      let head = dots[dots.length - 1];
  
      head = [head[0], head[1] - 2];
      dots.push(head);
      dots.shift();
      this.setState({
        direction: "UP",
        snakeDots: dots
      });
    };
  
    onRight = () => {
      let dots = [...this.state.snakeDots];
      let head = dots[dots.length - 1];
  
      head = [head[0] + 2, head[1]];
      dots.push(head);
      dots.shift();
      this.setState({
        direction: "RIGHT",
        snakeDots: dots
      });
    };
  
    onLeft = () => {
      let dots = [...this.state.snakeDots];
      let head = dots[dots.length - 1];
  
      head = [head[0] - 2, head[1]];
      dots.push(head);
      dots.shift();
      this.setState({
        direction: "LEFT",
        snakeDots: dots
      });
    };
  
    render() {
      const { route, snakeDots, food, timeRemaining } = this.state;
  
      return (
        <div className="bg-orange-900 text-white flex flex-col justify-center items-center w-screen h-screen p-32">
          <h1 className="text-3xl font-bold mb-2">Congratulations! You have completed the Practice round.</h1>
          <p className="text-2xl mb-4">To give yourself a break before moving onto the Test round, 
          you have {timeRemaining} seconds to play a game of Snake.</p>
          {route === "menu" ? (
            <div>
              <Menu onRouteChange={this.onRouteChange} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div id="game-area">
                <Snake snakeDots={snakeDots} />
                <Food dot={food} />
              </div>
            </div>
          )}
        </div>
      );
    }
  }
  
  export default Game;