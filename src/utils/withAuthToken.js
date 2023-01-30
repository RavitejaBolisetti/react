import { getAuthToken, getUserId } from "../store/state/auth";

export const withAuthToken = (fn) => {
  return (...params) =>
    (dispatch, getState) => {
      const token = getAuthToken(getState());
      return fn(...params)(token)(dispatch);
    };
};

export const withAuthTokenAndUserId = (fn) => {
  return (...params) =>
    (dispatch, getState) => {
      const token = getAuthToken(getState());
      const userId = getUserId(getState());
      return fn(...params)(token, userId)(dispatch);
    };
};
