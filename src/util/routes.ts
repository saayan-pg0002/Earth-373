import { ActionType } from "./state/actions";
import { dispatch } from "./store";
import { createBrowserHistory } from "history";

import Login from "../apps/Login";
import CurrentSession from "../apps/CurrentSession";
import Dashboard from "../apps/Dashboard";
import Mentees from "../apps/Mentees";
import NewSession from "../apps/NewSession";
import Notifications from "../apps/Notifications";
import Settings from "../apps/Settings";
import Resources from "../apps/Resources";
import Profile from "../apps/Profile";
import EditMentee from "../apps/EditMentee";
import ViewSession from "../apps/ViewSession";
import ForgotPassword from "../apps/ForgotPassword";
import ResetPassword from "../apps/ResetPassword";
import MenteeProfile from "../apps/MenteeProfile";

export const history = createBrowserHistory();

export const routeTo = (path: string) => {
  dispatch({ type: ActionType.UPDATE_CURRENT_PATH, payload: path });
  history.push(path);
};

export const Paths = {
  login: "/login",
  dashboard: "/",
  mentees: "/mentees",
  notifications: "/notifications",
  settings: "/settings",
  newSession: "/new-session",
  currentSession: "/current-session",
  viewSession: "/view-session",
  profile: "/profile",
  resources: "/resources",
  editMentee: "/edit-mentee",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  menteeProfile: "/mentee/:association_id/*",
  menteeProfileGoals: "/mentee/:association_id/goals",
  menteeProfileSessions: "/mentee/:association_id/sessions",
  menteeProfileQuestionnaires: "/mentee/:association_id/questionnaires",
};

export const PublicPaths: string[] = [
  Paths.login,
  Paths.forgotPassword,
  Paths.resetPassword,
];

export interface Route {
  path: string;
  exact: boolean;
  component: any;
  props?: any;
}

export const routes: Route[] = [
  {
    path: Paths.login,
    component: Login,
    exact: true,
  },
  {
    path: Paths.dashboard,
    component: Dashboard,
    exact: true,
  },
  {
    path: Paths.mentees,
    component: Mentees,
    exact: true,
  },
  {
    path: Paths.notifications,
    component: Notifications,
    exact: true,
  },
  {
    path: Paths.settings,
    component: Settings,
    exact: true,
  },
  {
    path: Paths.newSession,
    component: NewSession,
    exact: true,
  },
  {
    path: Paths.currentSession,
    component: CurrentSession,
    exact: true,
  },
  {
    path: Paths.viewSession,
    component: ViewSession,
    exact: true,
  },
  {
    path: Paths.profile,
    component: Profile,
    exact: true,
  },
  {
    path: Paths.resources,
    component: Resources,
    exact: true,
  },
  {
    path: Paths.editMentee,
    component: EditMentee,
    exact: true,
  },
  {
    path: Paths.menteeProfile,
    component: MenteeProfile,
    exact: false,
  },
  {
    path: Paths.forgotPassword,
    component: ForgotPassword,
    exact: true,
  },
  {
    path: Paths.resetPassword,
    component: ResetPassword,
    exact: true,
  },
];
