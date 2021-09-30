import Dashboard from '../../apps/Dashboard';
import Mentees from '../../apps/Mentees';

interface Route {
  path: string;
  routeName: string;
  name: string;
  exact: boolean;
  component: any;
  props?: any;
}

const routes: Route[] = [
  {
    path: '/',
    routeName: 'dashboard',
    name: 'Dashboard',
    component: Dashboard,
    exact: true,
  },
  {
    path: '/mentees',
    routeName: 'mentees',
    name: 'Mentees',
    component: Mentees,
    exact: true,
  },
];

export default routes;
