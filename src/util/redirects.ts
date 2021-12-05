import { subscribe, getState } from "./store";
import { State } from "./store";
import { Paths, PublicPaths } from "./routes";
import { routeTo } from "./routes";

const redirectActions = () => {
  const { token, currentPath }: State = getState();
  const isAuthenticated: boolean = !!token;
  var isOnPublicPath: boolean = false;
  PublicPaths.forEach((path) => {
    if (currentPath.includes(path)) {
      isOnPublicPath = true;
    }
  });

  if (isOnPublicPath && isAuthenticated) {
    routeTo(Paths.dashboard);
  }

  if (!isOnPublicPath && !isAuthenticated) {
    routeTo(Paths.login);
  }
};

const redirects = () => {
  redirectActions();

  return subscribe(redirectActions);
};

export default redirects;
