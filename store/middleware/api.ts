import { Middleware } from "@reduxjs/toolkit";
import * as actions from "@store/resources/apiActionTypes";
import { axiosRequest } from "@lib/api/axios";
import { dispatchErrorToasts } from "../utils/dispatchers/toast";
import type { AxiosRequestPayload } from "@lib/api/axios";

interface ApiCallPayload extends AxiosRequestPayload {
  onSuccess?: string;
  onError?: string;
  onStart?: string;
  [key: string]: any;
}

interface ApiCallAction {
  type: string;
  payload: ApiCallPayload;
}

const api: Middleware =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    const typedAction = action as ApiCallAction;

    if (typedAction.type !== actions.apiCallBegan.type) {
      return next(action);
    }

    const { onStart, onSuccess, onError } = typedAction.payload;

    if (onStart) {
      dispatch({ type: onStart, payload: typedAction.payload });
    }

    next(action);

    try {
      const response = await axiosRequest(typedAction.payload);
      dispatch(actions.apiCallSuccess(response.data));

      if (onSuccess) {
        dispatch({ type: onSuccess, payload: response.data });
      }
    } catch (error: any) {
      dispatchErrorToasts({ dispatch, payload: error });
      const errorPayload = {
        error: error?.message,
        systemError: error.response?.data,
        status: error.response?.status,
        message: error.response?.data?.error?.message,
      };
      dispatch(actions.apiCallFailed(errorPayload));
      if (onError) {
        dispatch({
          type: onError,
          payload: { ...errorPayload, errors: error.response?.data?.errors },
        });
      }
    }
  };

export default api;
