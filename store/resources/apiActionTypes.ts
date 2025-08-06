import { createAction } from "@reduxjs/toolkit";

export interface ApiCallPayload {
  url: string;
  headers?: Record<string, string>;
  data?: any;
  method?: string;
  onStart?: string;
  onSuccess?: string;
  onError?: string;
}

export const apiCallBegan = createAction<ApiCallPayload>("api/callBegan");
export const apiCallSuccess = createAction<any>("api/callSuccess");
export const apiCallFailed = createAction<any>("api/callFailed");
