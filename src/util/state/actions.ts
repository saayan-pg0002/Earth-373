import { MessageToastProps } from "../../components/MessageToast";

export enum ActionType {
  STORE_TOKEN,
  UPDATE_CURRENT_PATH,
  TOGGLE_MESSAGE_TOAST,
}

interface StoreToken {
  type: ActionType.STORE_TOKEN;
  payload: string;
}

interface UpdateCurrentPath {
  type: ActionType.UPDATE_CURRENT_PATH;
  payload: string;
}

interface ToggleMessageToast {
  type: ActionType.TOGGLE_MESSAGE_TOAST;
  payload: MessageToastProps;
}

export type Action = StoreToken | UpdateCurrentPath | ToggleMessageToast;
