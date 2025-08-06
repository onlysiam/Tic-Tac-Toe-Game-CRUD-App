import { combineReducers } from "redux";
import toast from "./toast";

const rootReducer = combineReducers({
  toast,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
