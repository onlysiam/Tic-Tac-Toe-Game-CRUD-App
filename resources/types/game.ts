export type PlayerId = string;

export interface RoundResult {
  round: number;
  winnerId: PlayerId | null;
  pointsAwarded: Record<PlayerId, number>;
}

export interface CurrentGame {
  isStarted: boolean;
  round: number;
  player: {
    first: { id: PlayerId; name: string };
    second: { id: PlayerId; name: string };
  };
  board: ("1" | "2" | null)[][];
  turn: "first" | "second";
  results: RoundResult[];
}

export interface GameState {
  data: RoundResult[][];
  pendingPlayerName: {
    first: string | null;
    second: string | null;
  };
  current: CurrentGame | null;
  loading: boolean;
}
