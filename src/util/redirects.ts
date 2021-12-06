import { subscribe, getState } from "./store";
import { State } from "./store";
import { AdminPaths, Paths, PublicPaths } from "./routes";
import { routeTo } from "./routes";

const redirectActions = () => {
  const { token, role, currentPath }: State = getState();
  const isAuthenticated: boolean = !!token;
  let isOnAdminPath: boolean = false;
  const isAdmin : boolean = role === "Admin";
  AdminPaths.forEach((path) => {
    if(currentPath.includes(path)){
      isOnAdminPath = true;
    }
  });

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
  if (isAuthenticated && isAdmin && !isOnAdminPath) {
    routeTo(Paths.mentors);
  }
  if(isAuthenticated && !isAdmin && isOnAdminPath){
    routeTo(Paths.dashboard);
  }
};

const redirects = () => {
  redirectActions();

  return subscribe(redirectActions);
};

export default redirects;
