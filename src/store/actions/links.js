import { SET_LINK_LIST_VIEW_MODE } from "../reducers/links";

export const setLinkListViewMode = viewMode => dispatch => dispatch({
  type: SET_LINK_LIST_VIEW_MODE,
  payload: viewMode
});
