export const GET_REPORT = "GET_REPORT";
export const GET_REPORT_SUCCESS = "GET_REPORT_SUCCESS";
export const GET_REPORT_FAILURE = "GET_REPORT_FAILURE";

const initialState = {
  loading: false,
  report: null,
  error: null
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case GET_REPORT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        report: payload
      };
    case GET_REPORT_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      };

    default:
      return {
        ...state
      };
  }
}
