import { ProductHierarchy, PRODUCT_HIERARCHY_DATA_SHOW_LOADING, PRODUCT_HIERARCHY_CHANGE_HISTORY_DATA_LOADED, PRODUCT_HIERARCHY_RESET_DATA, PRODUCT_HIERARCHY_FILTERED_DATA_ACTION_CONSTANT } from '@store/reducers/data/productHierarchy';

describe('ProductHierarchy reducer', () => {
    const initialState = {
        isLoaded: false,
        data: [],
        isSkuLoaded: false,
        skudata: [],
        isLoading: false,
        isHistoryLoaded: false,
        historyData: [],
        isHistoryLoading: false,
        changeHistoryVisible: false,
        actionVisible: false,
        organizationId: false,
    };

    it('should handle PRODUCT_HIERARCHY_DATA_LOADED action', () => {
        const action = {
            type: 'PRODUCT_HIERARCHY_DATA_LOADED',
            isLoaded: true,
            data: [
                { id: 1, name: 'Product1' },
                { id: 2, name: 'Product2' },
            ],
        };

        const newState = ProductHierarchy(initialState, action);

        expect(newState.isLoaded).toEqual(true);
        expect(newState.data).toEqual([
            { id: 1, name: 'Product1' },
            { id: 2, name: 'Product2' },
        ]);
    });


    it('should return the current state for an unknown action', () => {
        const currentState = {
            isLoaded: true,
            data: [
                { id: 1, name: 'Product1' },
                { id: 2, name: 'Product2' },
            ],
            isSkuLoaded: false,
            skudata: [],
            isLoading: false,
            isHistoryLoaded: false,
            historyData: [],
            isHistoryLoading: false,
            changeHistoryVisible: false,
            actionVisible: false,
            organizationId: false,
        };

        const action = {
            type: 'UNKNOWN_ACTION',
        };

        const newState = ProductHierarchy(currentState, action);

        expect(newState).toEqual(currentState);
    });
    it('should handle PRODUCT_HIERARCHY_DATA_SHOW_LOADING action', () => {
        const initialState = {
            isLoading: false,
        };

        const action = {
            type: PRODUCT_HIERARCHY_DATA_SHOW_LOADING,
            isLoading: true,
        };

        const newState = ProductHierarchy(initialState, action);

        expect(newState.isLoading).toEqual(true);
    });

    it('should handle PRODUCT_HIERARCHY_CHANGE_HISTORY_DATA_LOADED action', () => {
        const initialState = {
            isHistoryLoaded: false,
            historyData: [],
        };

        const action = {
            type: PRODUCT_HIERARCHY_CHANGE_HISTORY_DATA_LOADED,
            isLoaded: true,
            data: [
                { id: 201, description: 'Change 1' },
                { id: 202, description: 'Change 2' },
            ],
        };

        const newState = ProductHierarchy(initialState, action);

        expect(newState.isHistoryLoaded).toEqual(true);
        expect(newState.historyData).toEqual([
            { id: 201, description: 'Change 1' },
            { id: 202, description: 'Change 2' },
        ]);
    });

    // Add more test cases for the remaining actions similarly

    it('should handle PRODUCT_HIERARCHY_RESET_DATA action', () => {
        const initialState = {
            isLoaded: true,
            data: [{ id: 1, name: 'Product1' }],
        };

        const action = {
            type: PRODUCT_HIERARCHY_RESET_DATA,
        };

        const newState = ProductHierarchy(initialState, action);

        expect(newState.isLoaded).toEqual(false);
        expect(newState.data).toEqual([]);
    });

    it('should handle PRODUCT_HIERARCHY_FILTERED_DATA_ACTION_CONSTANT action', () => {
        const initialState = {
            isFilteredListLoaded: false,
            filteredListData: [],
        };

        const action = {
            type: PRODUCT_HIERARCHY_FILTERED_DATA_ACTION_CONSTANT,
            filteredListData: [{ id: 301, name: 'Filtered Product 1' }],
        };

        const newState = ProductHierarchy(initialState, action);

        expect(newState.isFilteredListLoaded).toEqual(true);
        expect(newState.filteredListData).toEqual([{ id: 301, name: 'Filtered Product 1' }]);
    });

    it('should handle unknown action and return the initial state', () => {
        const initialState = {
            isLoaded: false,
            data: [],
            isSkuLoaded: false,
            skudata: [],
            isLoading: false,
            isHistoryLoaded: false,
            historyData: [],
            isHistoryLoading: false,
            changeHistoryVisible: false,
            actionVisible: false,
            organizationId: false,
        };

        const action = {
            type: 'UNKNOWN_ACTION',
        };

        const newState = ProductHierarchy(initialState, action);

        expect(newState).toEqual(initialState);
    });
});
