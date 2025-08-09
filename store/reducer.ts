import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import globalStatesReducer from "./modules/global/globalStateReducers";
import categoryStatesReducer from "./modules/category";
import productStatesReducer from "./modules/product";

const persistCategoriesConfig = {
  key: "categories",
  storage,
  blacklist: ["current", "loading", "lastFetched"],
};
const persistProductsConfig = {
  key: "products",
  storage,
  blacklist: ["data", "current", "pagination", "loading", "creating", "updating", "lastFetched"],
};
const appReducer = combineReducers({
  global: globalStatesReducer,
  categories: persistReducer(persistCategoriesConfig, categoryStatesReducer),
  products: persistReducer(persistProductsConfig, productStatesReducer),
});
const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: any) => {
  // if () {state = { ...initialState };}
  return appReducer(state, action);
};

export default rootReducer;
