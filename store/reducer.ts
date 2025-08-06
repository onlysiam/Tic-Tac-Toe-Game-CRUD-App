import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const appReducer = combineReducers({});
const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: any) => {
  // if () {state = { ...initialState };}
  return appReducer(state, action);
};

export default rootReducer;
