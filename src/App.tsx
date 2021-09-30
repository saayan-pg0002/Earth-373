import {
  BrowserRouter,
  Route,
  Switch,
  RouteComponentProps,
} from 'react-router-dom';
import routes from './util/routes/routes';
import Nav from './components/Nav';

const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        {routes.map((route, index) => {
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
