import { NotificationItem, NotificationItemProps } from "./NotificationItem";
import { ReactComponent as BaytreeTreeGrey } from "../assets/images/baytree-tree-grey.svg";

interface NotificationListProps {
  notifications: NotificationItemProps[];
}

export const notificationList: React.FC<NotificationListProps> = ({
  notifications,
}) => {
  const isEmpty: boolean = notifications.length === 0;
  return (
    <div className={`notification-list ${isEmpty ? "empty" : ""}`}>
      {isEmpty ? (
        <div className="empty-state">
          <BaytreeTreeGrey />
          <h1 className="widget-title"></h1>
          <p>There is no notification at the moment.</p>
        </div>
      ) : (
        notifications.map(
          ({ message, date }: NotificationItemProps, index: number) => (
            <NotificationItem key={index} message={message} date={date} />
          )
        )
      )}
    </div>
  );
  return <div></div>;
};
