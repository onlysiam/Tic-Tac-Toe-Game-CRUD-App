import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { makeEmptyBoard, applyMove } from "@store/utils/game";
import type { GameState } from "@resources/types/game";

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
    playerJoin: (state, action: PayloadAction<{ firstName: string; secondName: string }>) => {
      const first = { id: uuidv4(), name: action.payload?.firstName };
      const second = { id: uuidv4(), name: action.payload?.secondName };
      state.current = {
        isStarted: false,
        round: 1,
        player: {
          first: state.current?.player?.first?.name ? state.current?.player?.first : first,
          second: state.current?.player?.second?.name ? state.current?.player?.second : second,
        },
        board: makeEmptyBoard(),
        turn: "first",
        results: [],
      };
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
      state.current = finished ? null : nextGame;
      if (finished) {
        state.data.push(nextGame.results);
      }
    },

    resetAll: (state) => {
      state.data = [];
      state.current = null;
    },
  },
});

export default slice;
