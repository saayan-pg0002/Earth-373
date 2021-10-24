import {
  BrowserRouter,
  Route,
  Switch,
  RouteComponentProps,
} from "react-router-dom";
import { routes, PublicPaths, Paths } from "./util/routes";
import Nav from "./components/Nav";
import "./stylesheets/index.scss";

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
              render={(props: RouteComponentProps<any>) => {
                let classes = "app-container";
                if (isPrivatePath(route.path)) {
                  classes += " private-path";
                }

                if (route.path === Paths.login) {
                  classes += " login";
                }

                return (
                  <div className={classes}>
                    {isPrivatePath(route.path) && <Nav />}
                    <route.component {...props} {...route.props} />
                  </div>
                );
              }}
            />
          );
        })}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
