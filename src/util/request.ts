import axios, { AxiosPromise, AxiosResponse } from "axios";
import { getLocalStorageItem } from "./localStorage";

export const ORIGIN: string = window.location.origin;
const BASE_URL: string = ORIGIN.split(":").slice(0, 2).join(":");
const PORT: String = "8000";

export enum RequestType {
  POST = "POST",
  GET = "GET",
  PATCH = "PATCH",
}

export enum Endpoints {
  login = "users/login",
  me = "users/me",
}

const getAuthHeader = (): {} => {
  const token = getLocalStorageItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const sendRequest = (
  method: RequestType,
  endpoint: Endpoints,
  data?: {}
): AxiosPromise => {
  return axios({
    method,
    url: `${BASE_URL}:${PORT}/${endpoint}`,
    data,
    headers: getAuthHeader(),
  });
};
