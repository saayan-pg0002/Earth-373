import Dashboard from '../apps/Dashboard';
import Mentees from '../apps/Mentees';
import Notifications from '../apps/Notifications';
import Settings from '../apps/Settings';

export const routes = {
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

export const routeList: Route[] = [
  {
    path: routes.dashboard,
    component: Dashboard,
    exact: true,
  },
  {
    path: routes.mentees,
    component: Mentees,
    exact: true,
  },
  {
    path: routes.notifications,
    component: Notifications,
    exact: true,
  },
  {
    path: routes.settings,
    component: Settings,
    exact: true,
  },
];
