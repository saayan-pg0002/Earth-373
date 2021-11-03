export enum ActionType {
  STORE_TOKEN,
  UPDATE_CURRENT_PATH,
}

interface StoreToken {
  type: ActionType.STORE_TOKEN;
  payload: string;
}

interface UpdateCurrentPath {
  type: ActionType.UPDATE_CURRENT_PATH;
  payload: string;
}

export type Action = StoreToken | UpdateCurrentPath;
