import { SessionList } from '../components/Session-List';
import { SessionItemProps } from '../components/Session-Item';

const sessionList: SessionItemProps[] = [
  {
    menteeName: 'Melissa Nguyen',
    clockInTime: (() => {
      const date = new Date();
      date.setHours(19, 0);
      return date;
    })(),
    clockOutTime: (() => {
      const date = new Date();
      date.setHours(20, 0);
      return date;
    })(),
  },
  {
    menteeName: 'Melissa Nguyen',
    clockInTime: (() => {
      const date = new Date();
      date.setHours(20, 0);
      return date;
    })(),
    clockOutTime: (() => {
      const date = new Date();
      date.setHours(21, 0);
      return date;
    })(),
  },
  {
    menteeName: 'Melissa Nguyen',
    clockInTime: (() => {
      const date = new Date();
      date.setHours(21, 0);
      return date;
    })(),
    clockOutTime: (() => {
      const date = new Date();
      date.setHours(22, 0);
      return date;
    })(),
  },
];

const Dashboard: React.FC = () => {
  return (
    <main className='container'>
      <h1 className='page-title'>Hi, Wendy!</h1>
      <SessionList sessions={sessionList} />
    </main>
  );
};

export default Dashboard;
