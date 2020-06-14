import { combineReducers } from "redux";
import theme from "./themeStore";
import user from "./user";
import tags from "./tags";
import links from "./links";
import creatives from "./creatives";
import dashboard from "./dashboard";
import reports from "./reports";

const appReducer = combineReducers({
  creatives,
  dashboard,
  links,
  reports,
  tags,
  theme,
  user,
});

export default (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action)
};
