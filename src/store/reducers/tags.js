export const GET_TAG = "GET_TAG";
export const GET_TAG_SUCCESS = "GET_TAG_SUCCESS";
export const GET_TAG_FAILURE = "GET_TAG_FAILURE";

export const SAVE_TAG = "SAVE_TAG";
export const SAVE_TAG_SUCCESS = "SAVE_TAG_SUCCESS";
export const SAVE_TAG_FAILURE = "SAVE_TAG_FAILURE";
export const SAVE_TAG_RESET = "SAVE_TAG_RESET";

export const GET_TAG_DETAIL = "GET_TAG_DETAIL";
export const GET_TAG_DETAIL_SUCCESS = "GET_TAG_DETAIL_SUCCESS";
export const GET_TAG_DETAIL_FAILURE = "GET_TAG_DETAIL_FAILURE";

const initialState = {
  getting: false,
  collections: [],
  getError: null,
  saving: false,
  saveSuccess: null,
  saveError: null,
  getTagDetailLoading: false,
  getTagDetailError: null,
  detail: {}
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_TAG:
      return {
        ...state,
        getting: true,
        getError: null
      };
    case GET_TAG_SUCCESS:
      return {
        ...state,
        getting: false,
        collections: payload,
      };
    case GET_TAG_FAILURE:
      return {
        ...state,
        getting: false,
        getError: payload
      };


    case SAVE_TAG:
      return {
        ...state,
        saving: true,
        saveError: null,
        saveSuccess: null,
      };
    case SAVE_TAG_SUCCESS:
      return {
        ...state,
        saving: false,
        saveSuccess: true,
      };
    case SAVE_TAG_FAILURE:
      return {
        ...state,
        saving: false,
        saveError: payload
      };
    case SAVE_TAG_RESET:
      return {
        ...state,
        saving: false,
        saveSuccess: null,
        saveError: null
      };


    case GET_TAG_DETAIL:
      return {
        ...state,
        getTagDetailLoading: true,
        getTagDetailError: null,
        detail: {}
      };
    case GET_TAG_DETAIL_SUCCESS:
      return {
        ...state,
        getTagDetailLoading: false,
        detail: payload
      };
    case GET_TAG_DETAIL_FAILURE:
      return {
        ...state,
        getTagDetailLoading: false,
        getTagDetailError: payload,
      };


    default:
      return {
        ...state
      }
  }
}
