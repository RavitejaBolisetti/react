/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import moment from 'moment';
import { showLoadingCF } from 'store/reducers/utils/reducerCF/showLoadingCF';
import { showLoadingSaveCF } from 'store/reducers/utils/reducerCF/showLoadingSaveCF';

export const initialState = {
    isLoaded: false,
    data: [],
    isFilteredListLoaded: false,
    filteredListData: [],
    isLoading: false,
    isDataSave: false,
    saveDataId: undefined,
    detailData: [],
    extraParam: [],
    filter: undefined,
    isLoadingOnSave: false,

    isChangeHistoryLoaded: false,
    isChangeHistoryLoading: false,
    changeHistoryData: [],
};

const recieveDataCF = (state, action) => ({
    ...state,
    isLoaded: true,
    data: action.data,
    updatedAt: moment().toDate(),
});

const recieveChangeHistoryDataCF = (state, action) =>
    console.log('action', action) || {
        ...state,
        isChangeHistoryLoaded: true,
        changeHistoryData: action.data,
        extraParam: action.extraParam,
    };

const recieveChangeHistoryDataLoadingCF = (state, action) => ({
    ...state,
    isChangeHistoryLoading: action.isLoading,
});

const setFilterDataCF = (state, action) => ({
    ...state,
    filter: action.filter,
});

const filteredListRecieveDataCF = (state, action) => ({
    ...state,
    isFilteredListLoaded: true,
    filteredListData: action.filteredListData,
    updatedAt: moment().toDate(),
});

const recieveDataDetailCF = (state, action) => ({
    ...state,
    isDetailLoaded: true,
    detailData: action.data,
    extraParam: action.extraParam,
});

const saveDataCF = (state, action) => ({
    ...state,
    isDataSave: true,
    saveDataId: action.saveDataId,
});

const resetDataCF = (state, action) => ({
    initialState,
});

export const crudDataReducer =
    ({ RECEIVE_DATA_LOADING_ACTION_CONSTANT, RECEIVE_DATA_ACTION_CONSTANT, RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT, RECEIVE_FILTERED_DATA_ACTION_CONSTANT, RECIEVE_DATA_DETAIL_ACTION_CONSTANT, SAVE_DATA_ACTION_CONSTANT, RESET_DATA_ACTION_CONSTANT, SAVE_FORM_DATA_LOADING_CONSTANT, RECEIVE_CHANGE_HISTORY_DATA_ACTION_CONSTANT, RECEIVE_CHANGE_HISTORY_DATA_LOADING_ACTION_CONSTANT, myInitialState = initialState }) =>
    (state = myInitialState, action) => {
        switch (action.type) {
            case RECEIVE_DATA_LOADING_ACTION_CONSTANT:
                return showLoadingCF(state, action);
            case SAVE_FORM_DATA_LOADING_CONSTANT:
                return showLoadingSaveCF(state, action);
            case RECEIVE_DATA_ACTION_CONSTANT:
                return recieveDataCF(state, action);
            case RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT:
                return setFilterDataCF(state, action);
            case RECEIVE_FILTERED_DATA_ACTION_CONSTANT:
                return filteredListRecieveDataCF(state, action);
            case RECIEVE_DATA_DETAIL_ACTION_CONSTANT:
                return recieveDataDetailCF(state, action);
            case SAVE_DATA_ACTION_CONSTANT:
                return saveDataCF(state, action);
            case RECEIVE_CHANGE_HISTORY_DATA_ACTION_CONSTANT:
                return recieveChangeHistoryDataCF(state, action);
            case RECEIVE_CHANGE_HISTORY_DATA_LOADING_ACTION_CONSTANT:
                return recieveChangeHistoryDataLoadingCF(state, action);
            case RESET_DATA_ACTION_CONSTANT:
                return resetDataCF(state, action);

            default:
                return state;
        }
    };
