import axios, { AxiosPromise } from "axios";
import { getLocalStorageItem } from "./localStorage";
import { buildPath, ParamsAndQueriesInterface } from "../components/Link";

export const ORIGIN: string = window.location.origin;
const BASE_URL: string = ORIGIN.split(":").slice(0, 2).join(":");
const PORT: String = "5000";

export enum RequestType {
  POST = "POST",
  GET = "GET",
  PATCH = "PATCH"
}

export enum Endpoints {
  login = "users/login",
  myMentees = "users/me/mentees",
  me = "users/me",
  forgotPassword = "users/forgot-password",
  resetPassword = "users/reset-password",
  stats = "users/stats",

  venues = "sessions/getVenues",
  sessionGroups = "sessions/getSessionGroups",
  createSession = "sessions/createSessions/:session_group_id/:association_id",
  createNote = "sessions/createNotes/:session_id"
}

const getAuthHeaders = (): {} => {
  const token = getLocalStorageItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const sendRequest = (
  method: RequestType,
  url: {
    endpoint: Endpoints;
    params?: ParamsAndQueriesInterface[];
    queries?: ParamsAndQueriesInterface[];
  },
  data?: {}
): AxiosPromise<any> => {
  const { endpoint, params = [], queries = [] } = url;
  return axios({
    method,
    url: `${BASE_URL}:${PORT}/${buildPath(endpoint, params, queries)}`,
    data,
    headers: getAuthHeaders()
  });
};
