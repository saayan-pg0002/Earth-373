import {
  BrowserRouter,
  Route,
  Switch,
  RouteComponentProps,
} from 'react-router-dom';
import { routeList } from './util/routes';
import Nav from './components/Nav';
import './stylesheets/index.scss';

const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        {routeList.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={(props: RouteComponentProps<any>) => (
                <route.component {...props} {...route.props} />
              )}
            />
          );
        })}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
