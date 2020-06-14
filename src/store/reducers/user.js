import localStorage from "src/utils/localStorage";

export const SET_USER = "SET_USER";
export const SET_CURRENT_DOMAIN = "SET_CURRENT_DOMAIN";

const initialState = {
  currentDomain: localStorage.get("domain", "")
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_USER:
      return {
        ...payload
      };

    case SET_CURRENT_DOMAIN:
      localStorage.set("domain", payload);
      return {
        ...state,
        currentDomain: payload
      };

    default:
      return {
        ...state,
      }
  }
}
