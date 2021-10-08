import {
  BrowserRouter,
  Route,
  Switch,
  RouteComponentProps,
} from 'react-router-dom';
import { routes, PublicPaths } from './util/routes';
import Nav from './components/Nav';
import './stylesheets/index.scss';

const App: React.FC<{}> = () => {
  const isPrivatePath = (path: string): boolean => !PublicPaths.includes(path);

  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={(props: RouteComponentProps<any>) => (
                <>
                  {isPrivatePath(route.path) && <Nav />}
                  <route.component {...props} {...route.props} />
                </>
              )}
            />
          );
        })}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
