import { Action, ActionType } from "./actions";
import { initialState, State } from "../store";

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.STORE_TOKEN:
      return { ...state, token: action.payload };
    case ActionType.UPDATE_CURRENT_PATH:
      return { ...state, currentPath: action.payload };
    case ActionType.TOGGLE_MESSAGE_TOAST:
      return { ...state, messageToast: action.payload };
    default:
      return state;
  }
};

export default reducer;
