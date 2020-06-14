export const GET_CREATIVES = "GET_CREATIVES";
export const GET_CREATIVES_SUCCESS = "GET_CREATIVES_SUCCESS";
export const GET_CREATIVES_FAILURE = "GET_CREATIVES_FAILURE";

const initialState = {
  loading: false,
  collections: [],
  error: null
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_CREATIVES:
      return {
        ...state,
        loading: true,
      };
    case GET_CREATIVES_SUCCESS:
      return {
        ...state,
        loading: false,
        collections: payload
      };
    case GET_CREATIVES_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return {
        ...state,
      }
  }
}
