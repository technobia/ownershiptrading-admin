import moment from "moment";
import {
  GET_DAILY_DATA_REPORT,
  GET_DAILY_DATA_REPORT_FAILURE,
  GET_DAILY_DATA_REPORT_SUCCESS,
  GET_DAILY_TAG_REPORT,
  GET_DAILY_TAG_REPORT_FAILURE,
  GET_DAILY_TAG_REPORT_SUCCESS,
  GET_MONTHLY_DATA_REPORT,
  GET_MONTHLY_DATA_REPORT_FAILURE,
  GET_MONTHLY_DATA_REPORT_SUCCESS,
} from "../reducers/dashboard";
import RequestFactory from "src/services/requestFactory";
import {
  GET_DAILY_DATA_REPORT_DETAIL,
  GET_DAILY_TAG_REPORT_DETAIL,
  GET_MONTHLY_DATA_REPORT_DETAIL
} from "src/services/APIs";

export const getDailyDataReport = (date) => async (dispatch, store) => {
  const currentDomain = store().user.currentDomain;
  const currentDate = date ? moment(date).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
  dispatch({ type: GET_DAILY_DATA_REPORT });
  try {
    const { data } = await RequestFactory.send(
      GET_DAILY_DATA_REPORT_DETAIL(currentDomain),
      { date: currentDate }
    );
    dispatch({ type: GET_DAILY_DATA_REPORT_SUCCESS, payload: data })
  } catch (e) {
    dispatch({ type: GET_DAILY_DATA_REPORT_FAILURE, payload: e.message })
  }
};

export const getDailyTagReport = (date) => async (dispatch, store) => {
  const currentDomain = store().user.currentDomain;
  const currentDate = date ? moment(date).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
  dispatch({ type: GET_DAILY_TAG_REPORT });
  try {
    const { data } = await RequestFactory.send(
      GET_DAILY_TAG_REPORT_DETAIL(currentDomain),
      { date: currentDate }
    );
    dispatch({ type: GET_DAILY_TAG_REPORT_SUCCESS, payload: data })
  } catch (e) {
    dispatch({ type: GET_DAILY_TAG_REPORT_FAILURE, payload: e.message })
  }
};

export const getMonthlyDataReport = () => async (dispatch, store) => {
  const currentDomain = store().user.currentDomain;
  const currentMonth = ("0" + (moment().get("months") + 1)).slice(-2);

  dispatch({ type: GET_MONTHLY_DATA_REPORT });
  try {
    const { data } = await RequestFactory.send(
      GET_MONTHLY_DATA_REPORT_DETAIL(currentDomain),
      { mm: currentMonth }
    );
    dispatch({ type: GET_MONTHLY_DATA_REPORT_SUCCESS, payload: data })
  } catch (e) {
    dispatch({ type: GET_MONTHLY_DATA_REPORT_FAILURE, payload: e.message })
  }
};
