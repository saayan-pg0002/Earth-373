export enum ActionType {
  STORE_TOKEN,
  STORE_USER_STATUS,
}

interface StoreToken {
  type: ActionType.STORE_TOKEN;
  payload: string;
}

export type Action = StoreToken;
