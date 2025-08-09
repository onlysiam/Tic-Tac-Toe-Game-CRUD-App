import categorieStates from "./reducers";
import * as urls from "../../configs/urls";
import { apiCallBegan } from "@store/resources/apiActionTypes";

const { categoriesRequested, categoriesRequestFailed, categoriesFetched } = categorieStates.actions;
export const { setCurrentCategory, resetCategoryCache } = categorieStates.actions;

export default categorieStates.reducer;

export const getProductCategories = () =>
  apiCallBegan({
    url: `${urls.categories}`,
    onStart: categoriesRequested.type,
    onSuccess: categoriesFetched.type,
    onError: categoriesRequestFailed.type,
  });
