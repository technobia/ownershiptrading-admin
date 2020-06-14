import {
  GET_CREATIVES,
  GET_CREATIVES_SUCCESS,
  GET_CREATIVES_FAILURE
} from "../reducers/creatives";
import RequestFactory from "src/services/requestFactory";
import { GET_CREATIVES_LIST } from "src/services/APIs";

export const getCreatives = () => async (dispatch, store) => {
  const currentDomain = store().user.currentDomain;
  dispatch({ type: GET_CREATIVES });
  try {
    const { data } = await RequestFactory.send(GET_CREATIVES_LIST(currentDomain));
    dispatch({ type: GET_CREATIVES_SUCCESS, payload: data })
  } catch (e) {
    dispatch({ type: GET_CREATIVES_FAILURE, payload: e.message })
  }
};
