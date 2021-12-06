import { MessageToastProps } from "../../components/MessageToast";

export enum ActionType {
  STORE_TOKEN,
  UPDATE_CURRENT_PATH,
  TOGGLE_MESSAGE_TOAST,
  STORE_ROLE,
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

interface StoreRole {
  type: ActionType.STORE_ROLE;
  payload: string;
}


export type Action = StoreToken | UpdateCurrentPath | ToggleMessageToast | StoreRole;
