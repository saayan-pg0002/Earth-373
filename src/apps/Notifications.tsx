import {
  NotificationItem,
  NotificationItemProps,
} from "../components/NotificationItem";

const Notifications: React.FC<{}> = () => {
  return (
    <main className="container">
      <h1 className="page-title">Notifications</h1>
      <NotificationItem
        message="Welcome new mentors to the BayTree Centre! "
        date={(() => {
          const date: Date = new Date();
          date.setUTCDate(5);
          return date;
        })()}
      />
    </main>
  );
};

export default Notifications;
