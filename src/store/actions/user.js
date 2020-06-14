import { SET_CURRENT_DOMAIN } from "../reducers/user";

export const setCurrentDomain = (currentDomain) => dispatch => dispatch({
  type: SET_CURRENT_DOMAIN,
  payload: currentDomain
});
