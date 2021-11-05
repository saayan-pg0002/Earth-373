import { FC } from "react";
import { Icon, IconName, IconColors } from "./Icon";
import { dispatch } from "../util/store";
import { ActionType } from "../util/state/actions";
import { connect } from "react-redux";
import { State } from "../util/store";

export enum MessageToastType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
}

export enum MessageToastDuration {
  SHORT = 1500,
  REGULAR = 3000,
  LONG = 6000,
}

export interface MessageToastProps {
  isShown: boolean;
  type: MessageToastType;
  message: string;
}

const MessageToast: FC<MessageToastProps> = ({ isShown, type, message }) => {
  return (
    <div className={`message-toast ${type} ${isShown ? "show" : ""}`}>
      {getMessageToastIcon(type)}
      <p>{message}</p>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  const { isShown, type, message } = state.messageToast;

  return {
    isShown,
    type,
    message,
  };
};

const getMessageToastIcon = (type: MessageToastType): JSX.Element => {
  switch (type) {
    case MessageToastType.SUCCESS:
      return <Icon name={IconName.circledCheckMark} color={IconColors.white} />;
    case MessageToastType.ERROR:
      return <Icon name={IconName.exclamation} color={IconColors.white} />;
    case MessageToastType.INFO:
      return <Icon name={IconName.info} color={IconColors.white} />;
    default:
      return <></>;
  }
};

export const showMessageToast = (
  type: MessageToastType,
  message: string,
  duration: MessageToastDuration = MessageToastDuration.REGULAR
) => {
  dispatch({
    type: ActionType.TOGGLE_MESSAGE_TOAST,
    payload: { isShown: true, type, message },
  });
  window.setTimeout(() => {
    dispatch({
      type: ActionType.TOGGLE_MESSAGE_TOAST,
      payload: { isShown: false, type, message },
    });
  }, duration);
};

export default connect(mapStateToProps)(MessageToast);
