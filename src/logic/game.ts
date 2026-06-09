import type { Game } from "./types";

const WIN_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function initGame(): Game {
  const cells = new Array(9).fill(null);

  return {
    cells,
    state: "init",
  };
}

export function startGame(game: Game): Game {
  return {
    ...game,
    state: "playing",
    turn: "X",
  };
}

export function play(game: Game, cellIndex: number): Game {
  const newGame = { ...game };
  const { cells } = newGame;

  if (newGame.state === "playing") {
    if (newGame.turn === "X" && cells[cellIndex] === null) {
      cells[cellIndex] = "X";
      newGame.turn = "O";
    } else if (newGame.turn === "O" && cells[cellIndex] === null) {
      cells[cellIndex] = "O";
      newGame.turn = "X";
    }

    // check win condition
    for (const [a, b, c] of WIN_CONDITIONS) {
      if (cells[a] === cells[b] && cells[b] === cells[c] && cells[a] !== null) {
        newGame.state = "won";
        newGame.winner = cells[a];
        newGame.turn = undefined;
        break;
      }
    }

    if (newGame.state !== "won" && cells.every((cell) => cell !== null)) {
      newGame.state = "draw";
      newGame.winner = undefined;
      newGame.turn = undefined;
    }
  }
  return newGame;
}
