import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./state/reducer";

export interface State {
  token: string;
}

export const initialState: State = {
  token: "",
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export const dispatch = store.dispatch;
export const subscribe = store.subscribe;
export const getState = store.getState;
export default store;
