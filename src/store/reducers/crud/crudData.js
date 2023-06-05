import moment from 'moment';
import { showLoadingCF } from 'store/reducers/utils/reducerCF/showLoadingCF';

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
};

const recieveDataCF = (state, action) => ({
    ...state,
    isLoaded: true,
    data: action.data,
    updatedAt: moment().toDate(),
});

const setFilterDataCF = (state, action) =>
    console.log(state, action) || {
        ...state,
        filter: action.filter,
    };

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
    ({ RECEIVE_DATA_LOADING_ACTION_CONSTANT, RECEIVE_DATA_ACTION_CONSTANT, RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT, RECEIVE_FILTERED_DATA_ACTION_CONSTANT, RECIEVE_DATA_DETAIL_ACTION_CONSTANT, SAVE_DATA_ACTION_CONSTANT, RESET_DATA_ACTION_CONSTANT, myInitialState = initialState }) =>
    (state = myInitialState, action) => {
        switch (action.type) {
            case RECEIVE_DATA_LOADING_ACTION_CONSTANT:
                return showLoadingCF(state, action);
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
            case RESET_DATA_ACTION_CONSTANT:
                return resetDataCF(state, action);
            default:
                return state;
        }
    };
