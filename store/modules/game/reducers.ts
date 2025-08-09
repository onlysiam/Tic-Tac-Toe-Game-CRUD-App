import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { makeEmptyBoard, applyMove } from "@store/utils/game";
import type { GameState, Leaderboard } from "@resources/types/game";

const initialState: GameState = {
  data: [],
  current: null,
  pendingPlayerName: {
    first: null,
    second: null,
  },
  loading: false,
};

const slice = createSlice({
  name: "game",
  initialState,
  reducers: {
    playerJoin: (state, action: PayloadAction<{ firstName?: string; secondName?: string }>) => {
      state.pendingPlayerName.first = action.payload?.firstName ?? state.pendingPlayerName.first;
      state.pendingPlayerName.second = action.payload?.secondName ?? state.pendingPlayerName.second;
      if (state.pendingPlayerName.first && state.pendingPlayerName.second) {
        const first = { id: uuidv4(), name: state.pendingPlayerName.first };
        const second = { id: uuidv4(), name: state.pendingPlayerName.second };
        state.current = {
          isStarted: false,
          isFinished: false,
          round: 1,
          player: {
            first: first,
            second: second,
          },
          board: makeEmptyBoard(),
          turn: "first",
          results: [],
        };
      }
    },
    playerReset: (
      state,
      action: PayloadAction<{ firstName?: string | null; secondName?: string | null }>
    ) => {
      state.pendingPlayerName.first =
        action.payload?.firstName === undefined
          ? state.pendingPlayerName.first
          : action.payload?.firstName;
      state.pendingPlayerName.second =
        action.payload?.secondName === undefined
          ? state.pendingPlayerName.second
          : action.payload?.secondName;
      state.current = null;
    },

    startGame: (state) => {
      if (state.current) state.current.isStarted = true;
    },

    playerBoardInput: (state, action: PayloadAction<{ row: number; col: number }>) => {
      if (!state.current || !state.current.isStarted) return;
      const { nextGame, finished } = applyMove(
        state.current,
        action.payload.row,
        action.payload.col
      );
      state.current = nextGame;
      if (finished) {
        state.current.isFinished = true;
      }
    },
    setLeaderboardData: (state, action: PayloadAction<Leaderboard>) => {
      state.data = state.data.concat(action.payload);
    },
    resetCurrentBoard: (state) => {
      if (state.pendingPlayerName.first && state.pendingPlayerName.second) {
        const first = { id: uuidv4(), name: state.pendingPlayerName.first };
        const second = { id: uuidv4(), name: state.pendingPlayerName.second };
        state.current = {
          isStarted: true,
          isFinished: false,
          round: 1,
          player: {
            first: first,
            second: second,
          },
          board: makeEmptyBoard(),
          turn: "first",
          results: [],
        };
      }
    },
    resetAll: (state) => {
      state.current = null;
      state.pendingPlayerName.first = null;
      state.pendingPlayerName.second = null;
    },
  },
});

export default slice;
