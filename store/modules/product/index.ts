import productStates from "./reducers";
import * as urls from "../../configs/urls";
import { apiCallBegan } from "@store/resources/apiActionTypes";

const {
  productsRequested,
  productsSearchRequested,
  productCreationRequested,
  productCreated,
  productUpdateRequested,
  productsRequestFailed,
  productFetchRequestFailed,
  productCreateRequestFailed,
  productUpdateRequestFailed,
  productDeleteRequestFailed,
  productsFetched,
  productSearched,
  productUpdated,
  productDeleted,
} = productStates.actions;
export const {
  setCurrentProductPagination,
  setProductsData,
  setCurrentProduct,
  resetSearchedProducts,
  resetProductCache,
  resetProductCRUDState,
} = productStates.actions;

export default productStates.reducer;

export const getProducts = (params: { categoryId?: number; skip: number; limit: number }) =>
  apiCallBegan({
    url: `${urls.products}?offset=${params.skip}&limit=${params.limit}${
      params?.categoryId ? `&categoryId=${params.categoryId}` : ""
    }`,
    onStart: productsRequested.type,
    onSuccess: productsFetched.type,
    onError: productFetchRequestFailed.type,
  });

export const searchProducts = (productName: string) =>
  apiCallBegan({
    url: `${urls.products}?title=${encodeURIComponent(productName)}`,
    onStart: productsSearchRequested.type,
    onSuccess: productSearched.type,
    onError: productFetchRequestFailed.type,
  });
export const createProduct = (payload: {
  title: string;
  price: number;
  description: string;
  categoryId: number;
}) =>
  apiCallBegan({
    url: `${urls.products}`,
    method: "POST",
    data: {
      title: payload.title,
      price: payload.price,
      description: payload?.description,
      categoryId: payload.categoryId,
      images: ["https://placehold.co/600x400"],
    },
    onStart: productCreationRequested.type,
    onSuccess: productCreated.type,
    onError: productCreateRequestFailed.type,
  });
export const updateProduct = (payload: {
  productId: number;
  title: string;
  price: number;
  description: string;
  categoryId: number;
}) =>
  apiCallBegan({
    url: `${urls.products}/${payload.productId}`,
    method: "PUT",
    data: {
      title: payload.title,
      price: payload.price,
      description: payload.description,
      categoryId: payload.categoryId,
    },
    onStart: productUpdateRequested.type,
    onSuccess: productUpdated.type,
    onError: productUpdateRequestFailed.type,
  });

export const deleteProduct = (productId: number) =>
  apiCallBegan({
    url: `${urls.products}/${productId}`,
    method: "DELETE",
    onStart: productUpdateRequested.type,
    onSuccess: productDeleted.type,
    onError: productDeleteRequestFailed.type,
  });
