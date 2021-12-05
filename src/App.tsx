import { Router, Route, Switch, RouteComponentProps } from "react-router-dom";
import { routes, PublicPaths, Paths, AdminPaths } from "./util/routes";
import { history } from "./util/routes";
import Nav from "./components/Nav";
import "./stylesheets/index.scss";
import { Provider } from "react-redux";
import store from "./util/store";
import MessageToast from "./components/MessageToast";
import AdminNav from "./apps/AdminPortal/AdminNav";

const App: React.FC<{}> = () => {
  const isMentorPath = (path: string): boolean =>
    !PublicPaths.includes(path) && !AdminPaths.includes(path);
  const isAdminPath = (path: string): boolean => AdminPaths.includes(path);

  return (
    <Provider store={store}>
      <MessageToast />
      <Router history={history}>
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props: RouteComponentProps<any>) => {
                  let classes = "app-container";
                  if (isMentorPath(route.path) || isAdminPath(route.path)) {
                    classes += " private-path";
                  }

                  if (
                    route.path === Paths.login ||
                    route.path === Paths.forgotPassword ||
                    route.path === Paths.resetPassword
                  ) {
                    classes += " login";
                  }

                  return (
                    <div className={classes}>
                      {(isAdminPath(route.path) && <AdminNav />) ||
                        (isMentorPath(route.path) && <Nav />)}
                      <route.component {...props} {...route.props} />
                    </div>
                  );
                }}
              />
            );
          })}
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
