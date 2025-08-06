import {
  Action,
  configureStore,
  EnhancedStore,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore, PersistConfig, createMigrate } from "redux-persist";
import api from "./middleware/api";
import resetDataMiddleware from "./middleware/reset";
import reducer from "@store/reducer";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

export type RootState = ReturnType<typeof reducer>;

const migrations = {
  0: (state: any) => {
    return {
      ...state,
    };
  },
};

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  version: 0, //default or previous version -1
  storage,
  debug: true,
  stateReconciler: autoMergeLevel2,
  migrate: createMigrate(migrations, { debug: true }),
  blacklist: [],
};

interface ApiCallPayload {
  onSuccess?: string;
  onError?: string;
  onStart?: string;
  [key: string]: any;
}
interface ApiCallAction {
  type: string;
  payload: ApiCallPayload;
}

const persistedReducer = persistReducer<RootState>(persistConfig, reducer);

function configureModifiedStore(): EnhancedStore<RootState> {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(resetDataMiddleware, api),
  });
}

export default configureModifiedStore;
export const store = configureModifiedStore();
export const persistor = persistStore(store);

export type AppThunkDispatch = ThunkDispatch<RootState, any, ApiCallAction>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
