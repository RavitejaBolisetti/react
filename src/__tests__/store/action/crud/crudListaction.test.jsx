import { listActions, listActionConstants } from '@store/actions/crud/crudList';

describe('listActions', () => {
    const prefix = 'TEST_';
    const actionConstants = listActionConstants(prefix);
    const actions = listActions(actionConstants);

    test('showLoading action', () => {
        const isLoading = true;

        const action = actions.showLoading(isLoading);

        expect(action).toEqual({
            type: actionConstants.SHOW_LOADING,
            isLoading,
        });
    });

    test('fetchError action', () => {
        const message = 'Error occurred while fetching data';

        const action = actions.fetchError(message);

        expect(action).toEqual({
            type: actionConstants.FETCH_ERROR,
            message,
        });
    });

    test('setFilterString action', () => {
        const filterString = 'search query';

        const action = actions.setFilterString(filterString);

        expect(action).toEqual({
            type: actionConstants.SET_FILTER_STRING,
            filterString,
        });
    });

    test('setFilter action', () => {
        const additionalFilterValues = { category: 'books', price: '100' };

        const action = actions.setFilter(additionalFilterValues);

        expect(action).toEqual({
            type: actionConstants.SET_FILTER_VALUES,
            additionalFilterValues,
        });
    });

    test('errorClose action', () => {
        const action = actions.errorClose();

        expect(action).toEqual({
            type: actionConstants.ERROR_CLOSE,
        });
    });
});
