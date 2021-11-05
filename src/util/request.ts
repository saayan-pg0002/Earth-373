import axios, { AxiosPromise } from "axios";

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
}

export const sendRequest = (
  method: RequestType,
  endpoint: Endpoints,
  data: {}
): AxiosPromise<any> => {
  return axios({
    method,
    url: `${BASE_URL}:${PORT}/${endpoint}`,
    data,
  });
};
