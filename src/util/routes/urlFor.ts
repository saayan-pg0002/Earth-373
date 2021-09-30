import routes from './routes';

const urlFor = (routeName: string): string =>
  routes.find((route) => route.routeName === routeName)?.path || '/';

export default urlFor;
