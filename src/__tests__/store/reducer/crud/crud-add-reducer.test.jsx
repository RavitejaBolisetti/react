import { crudAddReducer, initialState } from '@store/reducers/crud/crudAdd';

const addActionConstants = {
    SUCCESS: 'ADD_SUCCESS',
    ERROR: 'ADD_ERROR',
    SHOW_FORM: 'ADD_SHOW_FORM',
    HIDE_FORM: 'ADD_HIDE_FORM',
    SHOW_LOADING: 'ADD_SHOW_LOADING',
    SUCCESS_CLOSE: 'ADD_SUCCESS_CLOSE',
    ERROR_CLOSE: 'ADD_ERROR_CLOSE',
};

describe('crudAddReducer', () => {
    it('should return the initial state', () => {
        const result = crudAddReducer(addActionConstants, initialState)(undefined, {});
        expect(result).toEqual(initialState);
    });

    it('should handle ADD_SUCCESS action', () => {
        const action = {
            type: addActionConstants.SUCCESS,
            message: 'Success message',
            isFormShown: true,
            data: { id: 1, name: 'Test' },
        };

        const result = crudAddReducer(addActionConstants, initialState)(initialState, action);
        const expectedState = {
            isError: false,
            isAdded: true,
            message: 'Success message',
            isVisible: true,
            data: { id: 1, name: 'Test' },
        };

        expect(result).toEqual(expectedState);
    });

    it('should handle ADD_ERROR action', () => {
        const action = {
            type: addActionConstants.ERROR,
            message: 'Error message',
        };

        const result = crudAddReducer(addActionConstants, initialState)(initialState, action);
        const expectedState = {
            isError: true,
            isAdded: false,
            isVisible: true,
            message: 'Error message',
        };

        expect(result).toEqual(expectedState);
    });
});
