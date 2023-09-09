/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { dataActions } from 'store/actions/crud/dataAction';
import { BASE_URL_STOCK_TRANSFER as baseURL } from 'constants/routingApi';

// import { doLogout, unAuthenticateUser } from 'store/actions/auth';
// import { axiosAPICall } from 'utils/axiosAPICall';
// import { withAuthToken } from 'utils/withAuthToken';

const PREFIX = 'STOCK_TRANSFER';
const moduleName = 'Stock Transfer';

export const RECEIVE_DATA_LOADING_ACTION_CONSTANT = PREFIX + 'LOADING_DATA';
export const RECEIVE_DATA_ACTION_CONSTANT = PREFIX + 'LIST_RECIEVE_DATA';
export const RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT = PREFIX + 'LIST_APPLY_FILTER_CONSTANT';
export const RECIEVE_DATA_DETAIL_ACTION_CONSTANT = PREFIX + 'RECIEVE_DETAIL_DATA';
export const SAVE_DATA_ACTION_CONSTANT = PREFIX + 'SAVE_DATA';
export const RESET_DATA_ACTION_CONSTANT = PREFIX + 'RESET_DATA';

const stockTransferIndent = dataActions({
    baseURL,
    moduleName,
    RECEIVE_DATA_LOADING_ACTION_CONSTANT,
    RECEIVE_DATA_ACTION_CONSTANT,
    RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT,
    RECIEVE_DATA_DETAIL_ACTION_CONSTANT,
    SAVE_DATA_ACTION_CONSTANT,
    RESET_DATA_ACTION_CONSTANT,
});

// stockTransferIndent.fetchIndentLocation = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
//     const { setIsLoading, onSuccessAction = undefined, onErrorAction = undefined, data, userId, customURL } = params;

//     setIsLoading(true);

//     const onError = (message) => {
//         onErrorAction && onErrorAction(message);
//     };

//     const onSuccess = (res) => {
//         if (res?.data) {
//             onSuccessAction && onSuccessAction(res);
//         } else {
//             onErrorAction(res?.responseMessage);
//         }
//     };

//     const apiCallParams = {
//         data,
//         method: 'get',
//         url: customURL,
//         token,
//         accessToken,
//         userId,
//         onSuccess,
//         onError,
//         onTimeout: () => onError('Request timed out, Please try again'),
//         onUnAuthenticated: () => dispatch(doLogout()),
//         onUnauthorized: (message) => dispatch(unAuthenticateUser(message)),
//         postRequest: () => setIsLoading(false),
//     };

//     axiosAPICall(apiCallParams);
// });


export { stockTransferIndent };
