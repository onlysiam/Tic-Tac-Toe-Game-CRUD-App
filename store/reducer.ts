import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import globalStatesReducer from "./modules/global/globalStateReducers";

const appReducer = combineReducers({
  global: globalStatesReducer,
});
const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: any) => {
  // if () {state = { ...initialState };}
  return appReducer(state, action);
};

export default rootReducer;
