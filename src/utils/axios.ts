import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { BASE_URL } from "../config/api.ts";
import { toast } from "react-toastify";

export const fetchInstance = axios.create() as AxiosInstance;
fetchInstance.defaults.baseURL = BASE_URL;

const handleError = async (error: AxiosError<any>) => {
  const message = error?.response?.data?.message as string;
  if (message) {
    toast.error(message);
  }
  return Promise.reject(error);
};

fetchInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  handleError,
);
