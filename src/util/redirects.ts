import { subscribe, getState } from "./store";
import { State } from "./store";
import { Paths, PublicPaths } from "./routes";
import { routeTo } from "./routes";

const redirects = () => {
  const { token, currentPath }: State = getState();
  if (!PublicPaths.includes(currentPath) && token === "") {
    routeTo(Paths.login);
  }

  return subscribe(() => {
    const { token, currentPath }: State = getState();
    const isAuthenticated = !!token;
    const isOnPublicPath = PublicPaths.includes(currentPath);

    if (isOnPublicPath && isAuthenticated) {
      routeTo(Paths.dashboard);
    }

    if (!isOnPublicPath && !isAuthenticated) {
      routeTo(Paths.login);
    }
  });
};

export default redirects;
