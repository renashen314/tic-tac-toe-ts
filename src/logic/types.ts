export interface Game {
  cells: Marks[] | null[];
  state: GameState;
  turn?: Marks;
  winner?: Marks;
}

export type Marks = "X" | "O";
export type GameState = "init" | "playing" | "won" | "draw";
