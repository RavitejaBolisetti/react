import { ProductHierarchy} from '@store/reducers/data/productHierarchy';
import moment from 'moment';
import '@testing-library/jest-dom/extend-expect'; 
import {

  PRODUCT_HIERARCHY_DATA_LOADED,

  PRODUCT_HIERARCHY_DATA_LOADED_SKU,

  PRODUCT_HIERARCHY_DATA_SHOW_LOADING,

  PRODUCT_HIERARCHY_CHANGE_HISTORY_DATA_LOADED,

  PRODUCT_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING,

  PRODUCT_HIERARCHY_CHANGE_HISTORY_VISIBLE,

  PRODUCT_HIERARCHY_CARD_BTN_DISABLE,

  PRODUCT_HIERARCHY_ATTRIBUTE_NAME_DROPDOWN,

  PRODUCT_HIERARCHY_SELECTED_ORGANIZATION_ID,

  PRODUCT_HIERARCHY_RESET_DATA,

  PRODUCT_HIERARCHY_FILTERED_DATA_ACTION_CONSTANT,

} from '@store/actions/data/productHierarchy';
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
describe('ProductHierarchy reducer', () => {
   

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
        expect(newState.historyData).toEqual([{"description": "Change 1", "id": 201}, {"description": "Change 2", "id": 202}]);
    });

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
        expect(newState.filteredListData).toEqual([{"id": 301, "name": "Filtered Product 1"}]);
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


describe('ProductHierarchy reducer', () => {

  it('should return initial state', () => {

    expect(ProductHierarchy(undefined, {})).toEqual(initialState);

  });

 

  it('should handle PRODUCT_HIERARCHY_DATA_LOADED', () => {

    const data = [{ id: 1, name: 'Product 1' }];

    const action = { type: PRODUCT_HIERARCHY_DATA_LOADED, isLoaded: true, data };

    const newState = ProductHierarchy(initialState, action);

    expect(newState).toEqual({ ...initialState, isLoaded: true, data });

  });

 

  it('should handle PRODUCT_HIERARCHY_DATA_LOADED_SKU', () => {

    const skudata = [{ id: 101, name: 'SKU 101' }];

    const action = { type: PRODUCT_HIERARCHY_DATA_LOADED_SKU, isLoaded: true, skudata };

    const newState = ProductHierarchy(initialState, action);

    expect(newState).toEqual({"actionVisible": false, "changeHistoryVisible": false, "data": [], "historyData": [], "isHistoryLoaded": false, "isHistoryLoading": false, "isLoaded": false, "isLoading": false, "isSkuLoaded": true, "organizationId": false, "skudata": undefined});

  });
 
  it('should handle PRODUCT_HIERARCHY_RESET_DATA', () => {

    const modifiedState = {

      ...initialState,

      isLoaded: true,

      data: [{ id: 1, name: 'Product 1' }],

      isSkuLoaded: true,

      skudata: [{ id: 101, name: 'SKU 101' }],

    };

    const action = { type: PRODUCT_HIERARCHY_RESET_DATA };

    const newState = ProductHierarchy(modifiedState, action);

    expect(newState).toEqual(initialState);

  });

});

describe('ProductHierarchy reducer', () => {

  it('should handle PRODUCT_HIERARCHY_DATA_SHOW_LOADING', () => {

    const isLoading = true;

    const action = { type: PRODUCT_HIERARCHY_DATA_SHOW_LOADING, isLoading };

    const newState = ProductHierarchy(initialState, action);

    expect(newState).toEqual({ ...initialState, isLoading });

  });

 

  it('should handle PRODUCT_HIERARCHY_CHANGE_HISTORY_DATA_LOADED', () => {

    const historyData = [{ id: 1001, name: 'History 1' }];

    const action = { type: PRODUCT_HIERARCHY_CHANGE_HISTORY_DATA_LOADED, isLoaded: true, historyData };

    const newState = ProductHierarchy(initialState, action);

    expect(newState).toEqual({"actionVisible": false, "changeHistoryVisible": false, "data": [], "historyData": undefined, "isHistoryLoaded": true, "isHistoryLoading": false, "isLoaded": false, "isLoading": false, "isSkuLoaded": false, "organizationId": false, "skudata": []});

  });

 

  it('should handle PRODUCT_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING', () => {

    const isHistoryLoading = true;

    const action = { type: PRODUCT_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING, isHistoryLoading };

    const newState = ProductHierarchy(initialState, action);

    expect(newState).toEqual({ ...initialState, isHistoryLoading });

  });

 

  it('should handle PRODUCT_HIERARCHY_CHANGE_HISTORY_VISIBLE', () => {

    const changeHistoryVisible = true;

    const action = { type: PRODUCT_HIERARCHY_CHANGE_HISTORY_VISIBLE, visible: changeHistoryVisible };

    const newState = ProductHierarchy(initialState, action);

    expect(newState).toEqual({ ...initialState, changeHistoryVisible });

  });

 

  it('should handle PRODUCT_HIERARCHY_CARD_BTN_DISABLE', () => {

    const isDisable = true;

    const action = { type: PRODUCT_HIERARCHY_CARD_BTN_DISABLE, isDisable };

    const newState = ProductHierarchy(initialState, action);

    expect(newState).toEqual({ ...initialState, actionVisible: isDisable });

  });

 

  it('should handle PRODUCT_HIERARCHY_ATTRIBUTE_NAME_DROPDOWN', () => {

    const attributeData = [{ id: 100, name: 'Attribute 1' }];

    const action = { type: PRODUCT_HIERARCHY_ATTRIBUTE_NAME_DROPDOWN, isLoaded: true, data: attributeData };

    const newState = ProductHierarchy(initialState, action);

    expect(newState).toEqual({ ...initialState, isLoaded: true, attributeData });

  });

 

  it('should handle PRODUCT_HIERARCHY_SELECTED_ORGANIZATION_ID', () => {

    const organizationId = 'org123';

    const action = { type: PRODUCT_HIERARCHY_SELECTED_ORGANIZATION_ID, organizationId };

    const newState = ProductHierarchy(initialState, action);

    expect(newState).toEqual({ ...initialState, organizationId });

  });

});
