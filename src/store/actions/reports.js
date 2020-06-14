import {
  GET_REPORT,
  GET_REPORT_FAILURE,
  GET_REPORT_SUCCESS,
} from "../reducers/reports";
import RequestFactory from "src/services/requestFactory";
import { GET_REPORT_ID, RUN_REPORT } from "src/services/APIs";

export const getReport = (formData) => async (dispatch, state) => {
  const currentDomain = state().user.currentDomain;

  dispatch({ type: GET_REPORT });
  try {
    const { data: { QueryExecutionId } } = await RequestFactory.send(GET_REPORT_ID(currentDomain), formData);
    if (QueryExecutionId) {
      const { data } = await RequestFactory.send(RUN_REPORT(currentDomain, QueryExecutionId));
      dispatch({ type: GET_REPORT_SUCCESS, payload: data });
    } else {
      dispatch({ type: GET_REPORT_FAILURE, payload: "No result found" })
    }
  } catch (e) {
    dispatch({ type: GET_REPORT_FAILURE, payload: e.message })
  }
};
