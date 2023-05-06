import { dataActions } from 'store/actions/crud/dataAction';
import { BASE_URL_GEO_GRAPHY_COUNTRY } from 'constants/routingApi';

export const GEO_COUNTRY_LOADING_DATA = 'GEO_COUNTRY_LOADING_DATA';
export const GEO_COUNTRY_LIST_RECIEVE_DATA = 'GEO_COUNTRY_LIST_RECIEVE_DATA';
export const GEO_COUNTRY_FILTERED_LIST_RECIEVE_DATA = 'GEO_COUNTRY_FILTERED_LIST_RECIEVE_DATA';
export const GEO_COUNTRY_RECIEVE_DETAIL_DATA = 'GEO_COUNTRY_RECIEVE_DETAIL_DATA';
export const GEO_COUNTRY_SAVE_DATA = 'GEO_COUNTRY_SAVE_DATA';
export const GEO_COUNTRY_RESET_DATA = 'GEO_COUNTRY_RESET_DATA';

const baseURL = BASE_URL_GEO_GRAPHY_COUNTRY;

export const geoCountryDataActions = dataActions({
    baseURL,
    moduleName: 'Country Master',
    RECEIVE_DATA_LOADING_ACTION_CONSTANT: GEO_COUNTRY_LOADING_DATA,
    RECEIVE_DATA_ACTION_CONSTANT: GEO_COUNTRY_LIST_RECIEVE_DATA,
    RECEIVE_FILTERED_DATA_ACTION_CONSTANT: GEO_COUNTRY_FILTERED_LIST_RECIEVE_DATA,
    RECIEVE_DATA_DETAIL_ACTION_CONSTANT: GEO_COUNTRY_RECIEVE_DETAIL_DATA,
    SAVE_DATA_ACTION_CONSTANT: GEO_COUNTRY_SAVE_DATA,
    RESET_DATA_ACTION_CONSTANT: GEO_COUNTRY_RESET_DATA,
});