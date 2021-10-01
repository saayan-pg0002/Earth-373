import Dashboard from '../apps/Dashboard';
import Mentees from '../apps/Mentees';
import Notifications from '../apps/Notifications';
import Settings from '../apps/Settings';

export const Paths = {
  dashboard: '/',
  mentees: '/mentees',
  notifications: '/notifications',
  settings: '/settings',
};

export interface Route {
  path: string;
  exact: boolean;
  component: any;
  props?: any;
}

export const routes: Route[] = [
  {
    path: Paths.dashboard,
    component: Dashboard,
    exact: true,
  },
  {
    path: Paths.mentees,
    component: Mentees,
    exact: true,
  },
  {
    path: Paths.notifications,
    component: Notifications,
    exact: true,
  },
  {
    path: Paths.settings,
    component: Settings,
    exact: true,
  },
];
