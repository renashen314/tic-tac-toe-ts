import { initGame, play, startGame } from "./logic/game";
import "./App.css";
import { useState } from "react";

function App() {
  const [game, setGame] = useState(initGame());

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {game.cells.map((cell, index) => (
          <div
            className="cell"
            key={index}
            onClick={() => setGame(play(game, index))}
          >
            {cell}
          </div>
        ))}
      </div>
      {game.state === "init" && (
        <button onClick={() => setGame(startGame(game))}>Start Game</button>
      )}
      {game.state === "playing" && (
        <div>
          <p>{game.turn}'s turn</p>
          <button onClick={() => setGame(initGame())}>Restart</button>
        </div>
      )}
      {game.state === "won" && (
        <div>
          <p>{game.winner} wins!</p>
          <button onClick={() => setGame(initGame())}>Restart</button>
        </div>
      )}
      {game.state === "draw" && (
        <div>
          <p>It's a draw!</p>
          <button onClick={() => setGame(initGame())}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default App;
