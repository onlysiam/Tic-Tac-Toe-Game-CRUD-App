// src/store/gameLogic.ts
import { CurrentGame, RoundResult, PlayerId } from "@resources/types/game";

// Create a board
export const makeEmptyBoard = (): ("1" | "2" | null)[][] => {
  return Array(3)
    .fill(null)
    .map(() => Array(3).fill(null));
};

// returns winner
export const computeWinner = (board: ("1" | "2" | null)[][]): "first" | "second" | null => {
  const lines = [
    // rows
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    // cols
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    // diags
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];
  for (const line of lines) {
    if (line.every((c) => c === "1")) return "first";
    if (line.every((c) => c === "2")) return "second";
  }
  return null;
};

export function isBoardFull(board: ("1" | "2" | null)[][]): boolean {
  return board.every((row) => row.every((c) => c !== null));
}

//  returns:
//  nextGame: the updated CurrentGame
//  finished: whether we have completed all 5 rounds

export function applyMove(
  game: CurrentGame,
  row: number,
  col: number
): { nextGame: CurrentGame; finished: boolean } {
  const mark = game.turn === "first" ? "1" : "2";
  const board = game.board.map((r) => [...r]);
  board[row][col] = mark;

  const winner = computeWinner(board);
  const draw = !winner && isBoardFull(board);
  if (!winner && !draw) {
    return {
      nextGame: { ...game, board, turn: game.turn === "first" ? "second" : "first" },
      finished: false,
    };
  }

  // record result
  const firstId = game.player.first.id;
  const secondId = game.player.second.id;
  let winnerId: PlayerId | null = null;
  const points: Record<PlayerId, number> = {
    [firstId]: 0,
    [secondId]: 0,
  };

  if (winner === "first") {
    winnerId = firstId;
    points[firstId] = 2;
    points[secondId] = 1;
  } else if (winner === "second") {
    winnerId = secondId;
    points[secondId] = 2;
    points[firstId] = 1;
  }

  const roundResult: RoundResult = {
    round: game.round,
    winnerId,
    pointsAwarded: points,
  };

  const nextRound = game.round + 1;
  if (nextRound <= 5) {
    // reset board
    return {
      nextGame: {
        ...game,
        board: makeEmptyBoard(),
        round: nextRound,
        turn:
          winner === "first"
            ? "first"
            : winner === "second"
            ? "second"
            : nextRound % 2 === 1
            ? "first"
            : "second",
        results: [...game.results, roundResult],
      },
      finished: false,
    };
  } else {
    // return final result after 5 rounds
    return {
      nextGame: { ...game, results: [...game.results, roundResult] },
      finished: true,
    };
  }
}
