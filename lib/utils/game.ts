export type RoundResult = {
  round: number;
  winnerId: string | null;
  pointsAwarded: Record<string, number>;
};

export type Players = {
  firstId: string;
  secondId: string;
};

export type CalculateResult = {
  totals: Record<string, number>; // totals[playerId] => points so far
  leaderId: string | null; // current leader by points, or null if tie
  remainingRounds: number; // how many rounds left
  guaranteedWinnerId?: string | null; // playerId if winner guaranteed early
  finished: boolean; // true if game definitely finished
  reason?: string;
};

//   Calculate current totals and determine whether a final outcome is guaranteed.

//   Rules:
//    - Win => 2 points
//    - Loss => 1 point
//    - Draw => 0 points

//  rounds results of completed rounds so far (length <= totalRounds)
//  players object containing firstId and secondId
//  totalRounds total number of rounds in the match (default 5)

export const calculateResultsAndWinner = (
  rounds: RoundResult[],
  players: Players,
  totalRounds = 5
): CalculateResult => {
  const { firstId, secondId } = players;

  const totals: Record<string, number> = {
    [firstId]: 0,
    [secondId]: 0,
  };

  // sum points from rounds
  for (const r of rounds) {
    totals[firstId] += Number(r.pointsAwarded[firstId] ?? 0);
    totals[secondId] += Number(r.pointsAwarded[secondId] ?? 0);
  }

  const played = rounds.length;
  const remainingRounds = Math.max(0, totalRounds - played);

  // determine current leader (or tie)
  let leaderId: string | null = null;
  if (totals[firstId] > totals[secondId]) leaderId = firstId;
  else if (totals[secondId] > totals[firstId]) leaderId = secondId;

  // If no rounds left, finished — decide winner/draw
  if (remainingRounds === 0) {
    const finished: CalculateResult = {
      totals,
      leaderId,
      remainingRounds,
      guaranteedWinnerId: leaderId ?? null, // null if draw
      finished: true,
      reason: "All rounds played",
    };
    return finished;
  }

  // Check if leader is guaranteed to win early.
  const firstMax = totals[firstId] + remainingRounds * 2;
  const secondMax = totals[secondId] + remainingRounds * 2;

  // current total already > secondMax => first guaranteed
  if (totals[firstId] > secondMax) {
    return {
      totals,
      leaderId: firstId,
      remainingRounds,
      guaranteedWinnerId: firstId,
      finished: true,
      reason: `Player ${firstId} cannot be caught (other's max ${secondMax}).`,
    };
  }

  // If second's current total already > firstMax => second guaranteed
  if (totals[secondId] > firstMax) {
    return {
      totals,
      leaderId: secondId,
      remainingRounds,
      guaranteedWinnerId: secondId,
      finished: true,
      reason: `Player ${secondId} cannot be caught (other's max ${firstMax}).`,
    };
  }

  return {
    totals,
    leaderId,
    remainingRounds,
    finished: false,
  };
};
