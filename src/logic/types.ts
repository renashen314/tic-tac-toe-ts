export interface Game {
  cells: Marks[] | null[];
  state: GameState;
  turn?: Marks;
  winner?: Marks;
}

type Marks = "X" | "O";
type GameState = "init" | "playing" | "won" | "draw";
