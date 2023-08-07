import { renderHook } from '@testing-library/react-hooks';
import { crudListReducer, initialState } from '@store/reducers/crud/crudList';

describe('crudListReducer', () => {
    it('should handle SHOW_LOADING action', () => {
        const listActionConstants = {
            SHOW_LOADING: 'LIST_SHOW_LOADING',
            FETCH_ERROR: 'LIST_FETCH_ERROR',
            SET_FILTER_STRING: 'LIST_SET_FILTER_STRING',
            SET_FILTER_VALUES: 'LIST_SET_FILTER_VALUES',
        };

        const { result } = renderHook(() => crudListReducer(listActionConstants));

        // Simulate the SHOW_LOADING action
        const showLoadingAction = {
            type: listActionConstants.SHOW_LOADING,
        };
        const updatedState = result.current(initialState, showLoadingAction);

        // Assert the expected state changes
        expect(updatedState.isLoading).toBe(true);
    });

    it('should handle FETCH_ERROR action', () => {
        const listActionConstants = {
            SHOW_LOADING: 'LIST_SHOW_LOADING',
            FETCH_ERROR: 'LIST_FETCH_ERROR',
            SET_FILTER_STRING: 'LIST_SET_FILTER_STRING',
            SET_FILTER_VALUES: 'LIST_SET_FILTER_VALUES',
        };

        const { result } = renderHook(() => crudListReducer(listActionConstants));

        // Simulate the FETCH_ERROR action with a custom error message
        const errorMessage = 'An error occurred while fetching data.';
        const fetchErrorAction = {
            type: listActionConstants.FETCH_ERROR,
            message: errorMessage,
        };
        const updatedState = result.current(initialState, fetchErrorAction);

        // Assert the expected state changes
        expect(updatedState.isError).toBe(true);
        expect(updatedState.message).toBe(errorMessage);
    });

    it('should handle SET_FILTER_STRING action', () => {
        const listActionConstants = {
            SHOW_LOADING: 'LIST_SHOW_LOADING',
            FETCH_ERROR: 'LIST_FETCH_ERROR',
            SET_FILTER_STRING: 'LIST_SET_FILTER_STRING',
            SET_FILTER_VALUES: 'LIST_SET_FILTER_VALUES',
        };

        const { result } = renderHook(() => crudListReducer(listActionConstants));

        // Simulate the SET_FILTER_STRING action with a filter string
        const filterString = 'searchKeyword';
        const setFilterStringAction = {
            type: listActionConstants.SET_FILTER_STRING,
            filterString: filterString,
        };
        const updatedState = result.current(initialState, setFilterStringAction);

        // Assert the expected state changes
        expect(updatedState.filterString).toBe(filterString);
    });

    it('should handle SET_FILTER_VALUES action', () => {
        const listActionConstants = {
            SHOW_LOADING: 'LIST_SHOW_LOADING',
            FETCH_ERROR: 'LIST_FETCH_ERROR',
            SET_FILTER_STRING: 'LIST_SET_FILTER_STRING',
            SET_FILTER_VALUES: 'LIST_SET_FILTER_VALUES',
        };

        const { result } = renderHook(() => crudListReducer(listActionConstants));

        // Simulate the SET_FILTER_VALUES action with additional filter values
        const additionalFilterValues = {
            category: 'electronics',
            price: '1000',
        };
        const setFilterValuesAction = {
            type: listActionConstants.SET_FILTER_VALUES,
            additionalFilterValues: additionalFilterValues,
        };
        const updatedState = result.current(initialState, setFilterValuesAction);

        // Assert the expected state changes
        expect(updatedState.additionalFilterValues).toEqual(additionalFilterValues);
    });
});
