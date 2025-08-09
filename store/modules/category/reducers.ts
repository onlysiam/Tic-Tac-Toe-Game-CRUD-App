import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "@resources/types/product";

export interface CategoriesState {
  data: Category[];
  current: Category | null;
  lastFetched: number;
  fetched: boolean;
  loading: boolean;
  updating: boolean;
  searching: boolean;
  error: string;
}

const initialState: CategoriesState = {
  data: [],
  current: null,
  lastFetched: 0,
  fetched: false,
  loading: false,
  updating: false,
  searching: false,
  error: "",
};

const slice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoriesRequested(state) {
      state.loading = true;
    },
    categoriesRequestFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
      state.updating = false;
      state.searching = false;
    },
    categoriesFetched(state, action: PayloadAction<Category[]>) {
      state.data = action.payload;
      state.loading = false;
      state.lastFetched = Date.now();
      state.fetched = true;
    },
    setCurrentCategory(state, action: PayloadAction<Category | null>) {
      state.current = action.payload;
    },
    resetCategoryCache(state) {
      state.lastFetched = 0;
    },
  },
});

export default slice;
