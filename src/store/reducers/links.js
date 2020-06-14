import localStorage from "src/utils/localStorage";

export const SET_LINK_LIST_VIEW_MODE = "SET_LINK_LIST_VIEW_MODE";

const initialState = {
  viewMode: localStorage.get("link_view_mode", "list")
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_LINK_LIST_VIEW_MODE:
      localStorage.set("link_view_mode", payload);
      return {
        ...state,
        viewMode: payload
      };

    default:
      return {
        ...state,
      }
  }
}
