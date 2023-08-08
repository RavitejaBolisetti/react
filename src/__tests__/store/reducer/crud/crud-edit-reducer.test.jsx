import { renderHook } from '@testing-library/react-hooks';
import { crudEditReducer, initialState } from '@store/reducers/crud/crudEdit';

describe('crudEditReducer', () => {
    it('should handle SUCCESS action', () => {
        const editActionConstants = {
            SUCCESS: 'EDIT_SUCCESS',
            ERROR: 'EDIT_ERROR',
            SHOW_LOADING: 'EDIT_SHOW_LOADING',
            SHOW_FORM: 'EDIT_SHOW_FORM',
            HIDE_FORM: 'EDIT_HIDE_FORM',
            ERROR_CLOSE: 'EDIT_ERROR_CLOSE',
        };

        const { result } = renderHook(() => crudEditReducer({ editActionConstants }));

        // Simulate the SUCCESS action
        const successAction = {
            type: editActionConstants.SUCCESS,
        };
        const updatedState = result.current(initialState, successAction);

        // Assert the expected state changes
        expect(updatedState.isUpdated).toBe(true);
        expect(updatedState.isVisible).toBe(false);
        expect(updatedState.isError).toBe(false);
    });

    it('should handle ERROR action', () => {
        const editActionConstants = {
            SUCCESS: 'EDIT_SUCCESS',
            ERROR: 'EDIT_ERROR',
            SHOW_LOADING: 'EDIT_SHOW_LOADING',
            SHOW_FORM: 'EDIT_SHOW_FORM',
            HIDE_FORM: 'EDIT_HIDE_FORM',
            ERROR_CLOSE: 'EDIT_ERROR_CLOSE',
        };

        const { result } = renderHook(() => crudEditReducer({ editActionConstants }));

        // Simulate the ERROR action with a message
        const errorMessage = 'An error occurred.';
        const errorAction = {
            type: editActionConstants.ERROR,
            message: errorMessage,
        };
        const updatedState = result.current(initialState, errorAction);

        // Assert the expected state changes
        expect(updatedState.isError).toBe(true);
        expect(updatedState.message).toBe(errorMessage);
        expect(updatedState.isUpdated).toBe(false);
    });
    it('should handle SHOW_LOADING action', () => {
        const editActionConstants = {
            SUCCESS: 'EDIT_SUCCESS',
            ERROR: 'EDIT_ERROR',
            SHOW_LOADING: 'EDIT_SHOW_LOADING',
            SHOW_FORM: 'EDIT_SHOW_FORM',
            HIDE_FORM: 'EDIT_HIDE_FORM',
            ERROR_CLOSE: 'EDIT_ERROR_CLOSE',
        };

        const { result } = renderHook(() => crudEditReducer({ editActionConstants }));

        // Simulate the SHOW_LOADING action
        const showLoadingAction = {
            type: editActionConstants.SHOW_LOADING,
        };
        const updatedState = result.current(initialState, showLoadingAction);

        // Assert the expected state changes
        expect(updatedState.isUpdated).toBe(false);
        expect(updatedState.isVisible).toBe(false);
        expect(updatedState.isError).toBe(false);
    });

    it('should handle SHOW_FORM action', () => {
        const editActionConstants = {
            SUCCESS: 'EDIT_SUCCESS',
            ERROR: 'EDIT_ERROR',
            SHOW_LOADING: 'EDIT_SHOW_LOADING',
            SHOW_FORM: 'EDIT_SHOW_FORM',
            HIDE_FORM: 'EDIT_HIDE_FORM',
            ERROR_CLOSE: 'EDIT_ERROR_CLOSE',
        };

        const { result } = renderHook(() => crudEditReducer({ editActionConstants }));

        // Simulate the SHOW_FORM action with an id
        const id = 123;
        const showFormAction = {
            type: editActionConstants.SHOW_FORM,
            id: id,
        };
        const updatedState = result.current(initialState, showFormAction);

        // Assert the expected state changes
        expect(updatedState.isVisible).toBe(true);
        expect(updatedState.id).toBe(id);
    });

    it('should handle HIDE_FORM action', () => {
        const editActionConstants = {
            SUCCESS: 'EDIT_SUCCESS',
            ERROR: 'EDIT_ERROR',
            SHOW_LOADING: 'EDIT_SHOW_LOADING',
            SHOW_FORM: 'EDIT_SHOW_FORM',
            HIDE_FORM: 'EDIT_HIDE_FORM',
            ERROR_CLOSE: 'EDIT_ERROR_CLOSE',
        };

        const { result } = renderHook(() => crudEditReducer({ editActionConstants }));

        // Simulate the HIDE_FORM action
        const hideFormAction = {
            type: editActionConstants.HIDE_FORM,
        };
        const updatedState = result.current(initialState, hideFormAction);

        // Assert the expected state changes
        expect(updatedState.isVisible).toBe(false);
    });

    it('should handle ERROR_CLOSE action', () => {
        const editActionConstants = {
            SUCCESS: 'EDIT_SUCCESS',
            ERROR: 'EDIT_ERROR',
            SHOW_LOADING: 'EDIT_SHOW_LOADING',
            SHOW_FORM: 'EDIT_SHOW_FORM',
            HIDE_FORM: 'EDIT_HIDE_FORM',
            ERROR_CLOSE: 'EDIT_ERROR_CLOSE',
        };

        const { result } = renderHook(() => crudEditReducer({ editActionConstants }));

        // Set the state with an error
        const errorState = {
            ...initialState,
            isError: true,
            message: 'An error occurred.',
        };

        // Simulate the ERROR_CLOSE action
        const errorCloseAction = {
            type: editActionConstants.ERROR_CLOSE,
        };
        const updatedState = result.current(errorState, errorCloseAction);

        // Assert the expected state changes
        expect(updatedState.isError).toBe(false);
    });
});
