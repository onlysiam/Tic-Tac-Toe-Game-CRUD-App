import gameStates from "./reducers";

export const {
  playerJoin,
  startGame,
  playerBoardInput,
  playerReset,
  resetCurrentBoard,
  setLeaderboardData,
  resetAll,
  resetLeaderboard,
} = gameStates.actions;
export default gameStates.reducer;
