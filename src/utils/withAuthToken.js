import { getAuthToken, getAuthAccessToken, getUserId } from '../store/state/auth';

export const withAuthToken = (fn) => {
    return (...params) =>
        (dispatch, getState) => {
            const token = getAuthToken(getState());
            const userId = getUserId(getState());
            const accessToken = getAuthAccessToken(getState());
            return fn(...params)({ token, accessToken, userId })(dispatch);
        };
};
