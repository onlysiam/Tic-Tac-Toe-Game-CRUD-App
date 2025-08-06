import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export type AxiosRequestPayload<T = any> = {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: T;
  formData?: FormData;
  headers?: Record<string, string>;
};

export async function axiosRequest<T = any>(payload: AxiosRequestPayload<T>): Promise<T> {
  const { url, method = "get", data, formData, headers } = payload;

  const config: AxiosRequestConfig = {
    url,
    method,
    headers,
    data: formData ?? data,
  };

  const response = await axiosClient.request<T>(config);
  return response.data;
}
