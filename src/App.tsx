import { initGame, play, playAI, startGame } from "./logic/game";
import "./App.css";
import { useState } from "react";

function App() {
  const [game, setGame] = useState(initGame());
  const [mode, setMode] = useState<"human" | "ai">("human");
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {game.cells.map((cell, index) => (
          <div
            className="cell"
            key={index}
            data-mark={cell ?? ""}
            onClick={() => {
              if (mode === "human") {
                const next = play(game, index);
                if (game.state === "playing" && next === game) {
                  setError("Cell is occupied");
                  setTimeout(() => setError(null), 2000);
                } else {
                  setGame(next);
                  setError(null);
                }
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
      {error && <div className="toast">{error}</div>}
      {game.state === "init" && (
        <div className="actions">
          <button
            onClick={() => {
              setGame(startGame(game));
              setMode("human");
            }}
          >
            2 Players
          </button>
          <button
            onClick={() => {
              setGame(startGame(game));
              setMode("ai");
            }}
          >
            vs AI
          </button>
        </div>
      )}
      {game.state === "playing" && (
        <div className="status">
          <p>{game.turn}'s turn</p>
          <button onClick={() => setGame(initGame())}>Restart</button>
        </div>
      )}
      {game.state === "won" && (
        <div className="status">
          <p>{game.winner} wins!</p>
          <button onClick={() => setGame(initGame())}>Restart</button>
        </div>
      )}
      {game.state === "draw" && (
        <div className="status">
          <p>It's a draw!</p>
          <button onClick={() => setGame(initGame())}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default App;
