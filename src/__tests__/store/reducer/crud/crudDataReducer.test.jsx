import { crudDataReducer, initialState } from '@store/reducers/crud/crudData';

const actionConstants = {
    RECEIVE_DATA_LOADING_ACTION_CONSTANT: 'RECEIVE_DATA_LOADING_ACTION_CONSTANT',
    RECEIVE_DATA_ACTION_CONSTANT: 'RECEIVE_DATA_ACTION_CONSTANT',
    RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT: 'RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT',
    RECEIVE_FILTERED_DATA_ACTION_CONSTANT: 'RECEIVE_FILTERED_DATA_ACTION_CONSTANT',
    RECIEVE_DATA_DETAIL_ACTION_CONSTANT: 'RECIEVE_DATA_DETAIL_ACTION_CONSTANT',
    SAVE_DATA_ACTION_CONSTANT: 'SAVE_DATA_ACTION_CONSTANT',
    RESET_DATA_ACTION_CONSTANT: 'RESET_DATA_ACTION_CONSTANT',
    SAVE_FORM_DATA_LOADING_CONSTANT: 'SAVE_FORM_DATA_LOADING_CONSTANT',
    RECEIVE_CHANGE_HISTORY_DATA_ACTION_CONSTANT: 'RECEIVE_CHANGE_HISTORY_DATA_ACTION_CONSTANT',
    RECEIVE_CHANGE_HISTORY_DATA_LOADING_ACTION_CONSTANT: 'RECEIVE_CHANGE_HISTORY_DATA_LOADING_ACTION_CONSTANT',
};

describe('crudDataReducer', () => {
    it('should return the initial state', () => {
        const result = crudDataReducer(actionConstants, { myInitialState: initialState })(undefined, {});
        expect(result).toEqual(initialState);
    });

    it('should handle RECEIVE_DATA_LOADING_ACTION_CONSTANT action', () => {
        const action = {
            type: actionConstants.RECEIVE_DATA_LOADING_ACTION_CONSTANT,
            isLoading: true,
        };

        const result = crudDataReducer(actionConstants, { myInitialState: initialState })(initialState, action);
        const expectedState = {
            ...initialState,
            isLoading: true,
        };

        expect(result).toEqual(expectedState);
    });
});
