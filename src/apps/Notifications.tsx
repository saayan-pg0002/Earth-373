import PageHelmet from "../util/PageHelmet";
import { NotificationItemProps } from "../components/NotificationItem";
import { NotificationList } from "../components/NotificationList";

const NotifcationList: NotificationItemProps[] = [
  {
    message: "Welcome new mentors to the BayTree Centre!",
    date: (() => {
      const date: Date = new Date();
      date.setUTCDate(5);
      return date;
    })(),
  },
  {
    message:
      "Coffee chat session #7 will be happening this Sunday at the Central Park (north entrance)!",
    date: (() => {
      const date: Date = new Date();
      date.setUTCDate(7);
      return date;
    })(),
  },
];

const Notifications: React.FC<{}> = () => {
  return (
    <main className="notifications">
      <PageHelmet title="Notifications" />

      <div className="container">
        <h1 className="page-title">Notifications</h1>
        <NotificationList notifications={NotifcationList} />
      </div>
    </main>
  );
};

export default Notifications;
