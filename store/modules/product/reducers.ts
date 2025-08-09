import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchLimits } from "@configs/app";
import { Product } from "@resources/types/product";

export interface ProductsState {
  data: Product[];
  searched: Product[];
  current: Product | null;
  pagination: {
    page: number;
    skip: number;
    limit: number;
  };
  lastFetched: number;
  fetched: boolean;
  loading: boolean;
  creating: boolean;
  updating: boolean;
  searching: boolean;
  created: Product | null;
  updated: Product | null;
  deleted: number | null;
  error: string;
}

const initialState: ProductsState = {
  data: [],
  searched: [],
  current: null,
  pagination: {
    page: 1,
    skip: 0,
    limit: fetchLimits.default,
  },
  lastFetched: 0,
  fetched: false,
  loading: false,
  creating: false,
  updating: false,
  created: null,
  updated: null,
  deleted: null,
  searching: false,
  error: "",
};

const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsRequested(state) {
      state.loading = true;
    },
    productCreationRequested(state) {
      state.creating = true;
    },
    productUpdateRequested(state, action) {
      state.updating = true;
      if (action.payload.method === "DELETE") {
        state.deleted = action.payload.url.split("/").pop();
      }
    },
    productsSearchRequested(state) {
      state.searching = true;
    },
    productsRequestFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
      state.updating = false;
      state.searching = false;
    },
    productFetchRequestFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    productCreateRequestFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.creating = false;
    },
    productUpdateRequestFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.updating = false;
    },
    productDeleteRequestFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.deleted = null;
    },
    productsFetched(state, action: PayloadAction<Product[]>) {
      state.data = action.payload;
      state.pagination.skip = state.pagination.skip + state.pagination.limit;
      state.loading = false;
      state.lastFetched = Date.now();
      state.fetched = true;
    },
    productSearched(state, action: PayloadAction<Product[]>) {
      state.searched = action.payload;
      state.searching = false;
    },
    resetSearchedProducts(state) {
      state.searched = [];
      state.searching = false;
    },

    productCreated(state, action: PayloadAction<Product>) {
      state.data = state.data.concat(action.payload);
      state.created = action.payload;
      state.creating = false;
    },
    productUpdated(state, action: PayloadAction<Product>) {
      state.data = state.data.filter((product) => {
        if (product.id === action.payload.id) return action.payload;
        else return product;
      });
      state.updated = action.payload;
      state.updating = false;
    },

    productDeleted(state, action: PayloadAction<{ id: number }>) {
      state.data = state.data.filter((product) => product.id !== Number(state.deleted));
      state.deleted = null;
      state.updating = false;
    },

    setCurrentProductPagination(state, action: PayloadAction<number>) {
      state.pagination.page = action.payload;
      if ((action.payload = 1)) {
        state.pagination.skip = 0;
        state.pagination.limit = fetchLimits.default;
      }
    },
    setProductsData(state, action: PayloadAction<Product[]>) {
      state.data = action.payload;
    },

    setCurrentProduct(state, action: PayloadAction<Product>) {
      state.current = action.payload;
    },
    resetProductCache(state) {
      state.lastFetched = 0;
    },

    resetProductCRUDState(state) {
      state.lastFetched = 0;
      state.created = null;
      state.updated = null;
      state.deleted = null;
    },
  },
});

export default slice;
