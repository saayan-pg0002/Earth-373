import { createStore, applyMiddleware } from "redux";
import { getLocalStorageItem } from "./localStorage";
import thunk from "redux-thunk";
import reducer from "./state/reducer";
import {
  MessageToastProps,
  MessageToastType,
} from "../components/MessageToast";

export interface State {
  token: string;
  role: string;
  currentPath: string;
  messageToast: MessageToastProps;
}

export const initialState: State = {
  token: getLocalStorageItem("token") ?? "",
  role: getLocalStorageItem("role") ?? "",
  currentPath: window.location.pathname ?? "",
  messageToast: { isShown: false, type: MessageToastType.INFO, message: "" },
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export const dispatch = store.dispatch;
export const subscribe = store.subscribe;
export const getState = store.getState;
export default store;
