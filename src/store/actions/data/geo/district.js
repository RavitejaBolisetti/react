import { dataActions } from 'store/actions/crud/dataAction';
import { BASE_URL_GEO_GRAPHY_DISTRICT as baseURL } from 'constants/routingApi';

const PREFIX = 'GEO_DISTRICT_';
const moduleName = 'District Master';

export const RECEIVE_DATA_LOADING_ACTION_CONSTANT = PREFIX + 'LOADING_DATA';
export const RECEIVE_DATA_ACTION_CONSTANT = PREFIX + 'LIST_RECIEVE_DATA';
export const RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT = PREFIX + 'LIST_APPLY_FILTER_CONSTANT';
export const RECEIVE_FILTERED_DATA_ACTION_CONSTANT = PREFIX + 'FILTERED_LIST_RECIEVE_DATA';
export const RECIEVE_DATA_DETAIL_ACTION_CONSTANT = PREFIX + 'RECIEVE_DETAIL_DATA';
export const SAVE_DATA_ACTION_CONSTANT = PREFIX + 'SAVE_DATA';
export const RESET_DATA_ACTION_CONSTANT = PREFIX + 'RESET_DATA';

export const geoDistrictDataActions = dataActions({
    baseURL,
    moduleName,
    RECEIVE_DATA_LOADING_ACTION_CONSTANT,
    RECEIVE_DATA_ACTION_CONSTANT,
    RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT,
    RECEIVE_FILTERED_DATA_ACTION_CONSTANT,
    RECIEVE_DATA_DETAIL_ACTION_CONSTANT,
    SAVE_DATA_ACTION_CONSTANT,
    RESET_DATA_ACTION_CONSTANT,
});
