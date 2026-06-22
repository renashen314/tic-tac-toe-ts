import type { Marks } from "./types";

type cellsProp = (Marks | null)[];

const WIN_CONDITIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function checkWinner(cells: cellsProp): Marks | "draw" | null {
  for (const [a, b, c] of WIN_CONDITIONS) {
    if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) {
      return cells[a] as Marks;
    }
  }
  if (cells.every((cell) => cell !== null)) return "draw";
  return null;
}

// isMaximizing: true = AI's turn (O), false = human's turn (X)
// O wins: +1, X wins: -1, draw: 0
export function minimax(cells: cellsProp, isMaximizing: boolean): number {
  const winner = checkWinner(cells);
  if (winner === "O") return 1;
  if (winner === "X") return -1;
  if (winner === "draw") return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < cells.length; i++) {
      if (cells[i] === null) {
        cells[i] = "O";
        best = Math.max(best, minimax(cells, false));
        cells[i] = null;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < cells.length; i++) {
      if (cells[i] === null) {
        cells[i] = "X";
        best = Math.min(best, minimax(cells, true));
        cells[i] = null;
      }
    }
    return best;
  }
}

export function getBestMove(cells: cellsProp): number {
  let bestScore = -Infinity;
  let bestMove = -1;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === null) {
      cells[i] = "O";
      const score = minimax(cells, false);
      cells[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
}