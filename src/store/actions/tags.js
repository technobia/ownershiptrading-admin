import {
  GET_TAG, GET_TAG_DETAIL,
  GET_TAG_DETAIL_FAILURE,
  GET_TAG_DETAIL_SUCCESS,
  GET_TAG_FAILURE,
  GET_TAG_SUCCESS,
  SAVE_TAG,
  SAVE_TAG_FAILURE,
  SAVE_TAG_RESET,
  SAVE_TAG_SUCCESS,
} from "../reducers/tags";
import RequestFactory from "src/services/requestFactory";
import { GET_TAG_BY_ID, GET_TAG_LIST, SAVE_TAG_ITEM } from "src/services/APIs";

export const getTags = () => async (dispatch, store) => {
  const currentDomain = store().user.currentDomain;
  dispatch({ type: GET_TAG });
  try {
    const { data } = await RequestFactory.send(GET_TAG_LIST(currentDomain));
    dispatch({ type: GET_TAG_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: GET_TAG_FAILURE, payload: e.message });
  }
};

export const saveTag = (formData) => async (dispatch, store) => {
  const currentDomain = store().user.currentDomain;
  dispatch({ type: SAVE_TAG });
  try {
    const { data } = await RequestFactory.send(SAVE_TAG_ITEM(currentDomain), formData);
    dispatch({ type: SAVE_TAG_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: SAVE_TAG_FAILURE, payload: e.message });
  }
};

export const resetSaveTag = () => dispatch => dispatch({ type: SAVE_TAG_RESET });

export const getTagDetail = id => async (dispatch, store) => {
  const currentDomain = store().user.currentDomain;
  dispatch({ type: GET_TAG_DETAIL });
  try {
    const { data } = await RequestFactory.send(GET_TAG_BY_ID(currentDomain, id));
    dispatch({ type: GET_TAG_DETAIL_SUCCESS, payload: data[0] });
  } catch (e) {
    dispatch({ type: GET_TAG_DETAIL_FAILURE, payload: e.message });
  }
};
