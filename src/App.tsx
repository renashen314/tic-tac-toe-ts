import { initGame, play, playAI, startGame } from "./logic/game";
import "./App.css";
import { useState } from "react";

function App() {
  const [game, setGame] = useState(initGame());
  const [mode, setMode] = useState<"human" | "ai">("human");

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {game.cells.map((cell, index) => (
          <div
            className="cell"
            key={index}
            onClick={() => {
              if (mode === "human") {
                setGame(play(game, index));
              }
              if (mode === "ai") {
                const afterHuman = play(game, index);
                setGame(afterHuman);
                if (afterHuman.state === "playing") {
                  setTimeout(() => setGame(playAI(afterHuman)), 500);
                }
              }
            }}
          >
            {cell}
          </div>
        ))}
      </div>
      {game.state === "init" && (
        <div>
          <button
            onClick={() => {
              setGame(startGame(game));
              setMode("human");
            }}
          >
            Start Game
          </button>
          <button
            onClick={() => {
              setGame(startGame(game));
              setMode("ai");
            }}
          >
            Play with AI
          </button>
        </div>
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
