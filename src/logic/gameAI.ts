import type { Marks } from "./types";

type cellsProp = Marks[] | null[];

// returns a score: +1, -1, or 0
export function minimax(cells: cellsProp, isMaximizing: boolean): number {
  return 1;
}

// returns the best cell index for the AI
export function getBestMove(cells: cellsProp): number {
  let bestCellIndex = -1;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === null) {
      bestCellIndex = i;
    }
  }
  return bestCellIndex;
}
