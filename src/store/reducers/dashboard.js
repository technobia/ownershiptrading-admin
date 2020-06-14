export const GET_DAILY_DATA_REPORT = "GET_DAILY_DATA_REPORT";
export const GET_DAILY_DATA_REPORT_SUCCESS = "GET_DAILY_DATA_REPORT_SUCCESS";
export const GET_DAILY_DATA_REPORT_FAILURE = "GET_DAILY_DATA_REPORT_FAILURE";

export const GET_DAILY_TAG_REPORT = "GET_DAILY_TAG_REPORT";
export const GET_DAILY_TAG_REPORT_SUCCESS = "GET_DAILY_TAG_REPORT_SUCCESS";
export const GET_DAILY_TAG_REPORT_FAILURE = "GET_DAILY_TAG_REPORT_FAILURE";

export const GET_MONTHLY_DATA_REPORT = "GET_MONTHLY_DATA_REPORT";
export const GET_MONTHLY_DATA_REPORT_SUCCESS = "GET_MONTHLY_DATA_REPORT_SUCCESS";
export const GET_MONTHLY_DATA_REPORT_FAILURE = "GET_MONTHLY_DATA_REPORT_FAILURE";

const initialState = {
  dailyDataLoading: false,
  dailyDataReport: [],
  dailyDataError: null,
  dailyTagLoading: false,
  dailyTagReport: [],
  dailyTagError: null,
  monthlyDataLoading: false,
  monthlyDataReport: [],
  monthlyDataError: null,
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case GET_DAILY_DATA_REPORT:
      return {
        ...state,
        dailyDataLoading: true,
        dailyDataError: null,
      };
    case GET_DAILY_DATA_REPORT_SUCCESS:
      return {
        ...state,
        dailyDataLoading: false,
        dailyDataReport: Array.isArray(payload) ? payload : [],
      };
    case GET_DAILY_DATA_REPORT_FAILURE:
      return {
        ...state,
        dailyDataLoading: false,
        dailyDataError: payload,
      };


    case GET_DAILY_TAG_REPORT:
      return {
        ...state,
        dailyTagLoading: true,
        dailyTagError: null,
      };
    case GET_DAILY_TAG_REPORT_SUCCESS:
      return {
        ...state,
        dailyTagLoading: false,
        dailyTagReport: Array.isArray(payload) ? payload : [],
      };
    case GET_DAILY_TAG_REPORT_FAILURE:
      return {
        ...state,
        dailyTagLoading: false,
        dailyTagError: payload,
      };


    case GET_MONTHLY_DATA_REPORT:
      return {
        ...state,
        monthlyDataLoading: true,
        monthlyDataError: null,
      };
    case GET_MONTHLY_DATA_REPORT_SUCCESS:
      return {
        ...state,
        monthlyDataLoading: false,
        monthlyDataReport: Array.isArray(payload) ? payload : [],
      };
    case GET_MONTHLY_DATA_REPORT_FAILURE:
      return {
        ...state,
        monthlyDataLoading: false,
        monthlyDataError: payload,
      };


    default:
      return {
        ...state,
      }
  }
}
