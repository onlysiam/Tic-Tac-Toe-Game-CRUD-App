export type PlayerId = string;

export interface Leaderboard {
  winner: Player;
  points: number;
}
export interface RoundResult {
  round: number;
  winnerId: PlayerId | null;
  pointsAwarded: Record<PlayerId, number>;
}

export interface Player {
  id: PlayerId;
  name: string;
}

export interface CurrentGame {
  isStarted: boolean;
  isFinished: boolean;
  round: number;
  player: {
    first: Player;
    second: Player;
  };
  board: ("1" | "2" | null)[][];
  turn: "first" | "second";
  results: RoundResult[];
}

export interface GameState {
  data: Leaderboard[];
  pendingPlayerName: {
    first: string | null;
    second: string | null;
  };
  current: CurrentGame | null;
  loading: boolean;
}
