import gameStates from "./reducers";

export const { playerJoin, startGame, playerBoardInput, resetAll } = gameStates.actions;
export default gameStates.reducer;
