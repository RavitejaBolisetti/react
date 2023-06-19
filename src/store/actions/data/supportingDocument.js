import { dataActions } from 'store/actions/crud/dataAction';
import { withAuthToken } from 'utils/withAuthToken';
import { axiosAPICall } from 'utils/axiosAPICall';
import { BASE_URL_SUPPORTING_DOCUMENT as baseURL, BASE_URL_DOCUMENT_UPLOAD as baseUploadURL } from 'constants/routingApi';

const PREFIX = 'UPLOAD_';
const moduleName = 'Supporting Document(Vault)';

export const RECEIVE_DATA_LOADING_ACTION_CONSTANT = PREFIX + 'LOADING_DATA';
export const RECEIVE_DATA_ACTION_CONSTANT = PREFIX + 'LIST_RECIEVE_DATA';
export const RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT = PREFIX + 'LIST_APPLY_FILTER_CONSTANT';
export const RECIEVE_DATA_DETAIL_ACTION_CONSTANT = PREFIX + 'RECIEVE_DETAIL_DATA';
export const SAVE_DATA_ACTION_CONSTANT = PREFIX + 'SAVE_DATA';
export const RESET_DATA_ACTION_CONSTANT = PREFIX + 'RESET_DATA';
export const SAVE_FORM_DATA_LOADING_CONSTANT = PREFIX + 'SAVE_FORM_DATA_LOADING_CONSTANT';

const supportingDocumentDataActions = dataActions({
    baseURL,
    moduleName,
    RECEIVE_DATA_LOADING_ACTION_CONSTANT,
    RECEIVE_DATA_ACTION_CONSTANT,
    RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT,
    RECIEVE_DATA_DETAIL_ACTION_CONSTANT,
    SAVE_DATA_ACTION_CONSTANT,
    RESET_DATA_ACTION_CONSTANT,
    SAVE_FORM_DATA_LOADING_CONSTANT,
});

supportingDocumentDataActions.uploadFile = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, data, userId, onSuccess, method = 'post' } = params;
    setIsLoading(true);

    const onSuccessAction = (res) => {
        onSuccess(res.data);
    };

    const apiCallParams = {
        data,
        method: method,
        url: baseUploadURL,
        token,
        accessToken,
        userId,
        onSuccess: onSuccessAction,
        onError,
        onTimeout: () => onError('Request timed out, Please try again'),
        postRequest: () => setIsLoading(false),
    };

    axiosAPICall(apiCallParams);
});

export { supportingDocumentDataActions };
