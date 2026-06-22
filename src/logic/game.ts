import { getBestMove } from "./gameAI";
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

function checkWin(game: Game): void {
  const { cells } = game;
  for (const [a, b, c] of WIN_CONDITIONS) {
    if (cells[a] === cells[b] && cells[b] === cells[c] && cells[a] !== null) {
      game.state = "won";
      game.winner = cells[a];
      game.turn = undefined;
      return;
    }
  }
  if (cells.every((cell) => cell !== null)) {
    game.state = "draw";
    game.winner = undefined;
    game.turn = undefined;
  }
}

export function play(game: Game, cellIndex: number): Game {
  if (game.state !== "playing" || game.cells[cellIndex] !== null) {
    return game;
  }

  const newGame = { ...game };
  const { cells } = newGame;

  if (newGame.turn === "X") {
    cells[cellIndex] = "X";
    newGame.turn = "O";
    } else if (newGame.turn === "O") {
    cells[cellIndex] = "O";
    newGame.turn = "X";
  }
  checkWin(newGame);
  return newGame;
}

export function playAI(game: Game): Game {
  const newGame = { ...game };
  const { cells } = newGame;

  if (newGame.state !== "playing" || newGame.turn !== "O") {
    return newGame;
  }

  const aiMove = getBestMove(cells);
  cells[aiMove] = "O";
  newGame.turn = "X";
  checkWin(newGame);

  return newGame;
}
