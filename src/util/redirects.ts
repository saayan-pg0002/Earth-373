import { subscribe, getState } from "./store";

const redirects = () =>
  subscribe(() => {
    const state = getState();
    console.log(state);
  });

export default redirects;
