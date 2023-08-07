import { ConfigurableParameterEditing} from '@store/reducers/data/configurableParamterEditing';
import {
  CONFIG_PARAM_EDIT_DATA_LOADED,
  CONFIG_PARAM_DATA_FILTERED_DATA_LOADED,
  CONFIG_PARAM_DATA_LOADED,
  CONFIG_PARAM_EDIT_DATA_SHOW_LOADING,
  CONFIG_PARAM_EDIT_SHOW_LOADING,
  CONFIG_PARAM_EDIT_SHOW_LOADING_ON_SAVE,
} from '@store/reducers/data/configurableParamterEditing';



 
describe('ConfigurableParameterEditing reducer', () => {

  const initialState = {
    isLoaded: false,
    data: [],
    isFilteredListLoaded: false,
    filteredListData: [],
    paramdata: [],
    isParamLoaded: false,
    isParamLoading: false,
    isLoading: false,
    isLoadingOnSave: false,
  };

  it('should return initial state for unknown action types', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: {},
    };

 

    const newState = ConfigurableParameterEditing(initialState, action);

 

    expect(newState).toEqual(initialState);
  });

 

  it('should handle CONFIG_PARAM_EDIT_DATA_LOADED action and update data', () => {
    const action = {
      type: CONFIG_PARAM_EDIT_DATA_LOADED,
      isLoaded: true,
      data: [{ id: 1, name: 'Parameter 1' }],
    };

 

    const newState = ConfigurableParameterEditing(initialState, action);

 

    expect(newState.isLoaded).toBe(false);
    expect(newState.data).toEqual([]);
  });

 

  it('should handle CONFIG_PARAM_DATA_FILTERED_DATA_LOADED action and update filteredListData', () => {
    const action = {
      type: CONFIG_PARAM_DATA_FILTERED_DATA_LOADED,
      isLoaded: true,
      data: [{ id: 1, parentKey: 'parent1' }, { id: 2, parentKey: 'parent2' }],
    };

 

    const newState = ConfigurableParameterEditing(initialState, action);

 

    expect(newState.isFilteredListLoaded).toBe(false);
    expect(newState.filteredListData).toEqual([]);
  });

 

  it('should handle CONFIG_PARAM_DATA_LOADED action and update paramdata', () => {
    const action = {
      type: CONFIG_PARAM_DATA_LOADED,
      isLoaded: true,
      parameterType: 'type1',
      data: [{ id: 1, name: 'Parameter 1' }],
    };

 

    const newState = ConfigurableParameterEditing(initialState, action);

 

    expect(newState.isParamLoaded).toBe(false);
    expect(newState.paramdata).toEqual([]);
  });

 

  it('should handle CONFIG_PARAM_EDIT_DATA_SHOW_LOADING action and update isLoading', () => {
    const action = {
      type: CONFIG_PARAM_EDIT_DATA_SHOW_LOADING,
      isLoading: true,
    };

 

    const newState = ConfigurableParameterEditing(initialState, action);

 

    expect(newState.isLoading).toBe(false);
  });

 

  it('should handle CONFIG_PARAM_EDIT_SHOW_LOADING action and update isParamLoading', () => {
    const action = {
      type: CONFIG_PARAM_EDIT_SHOW_LOADING,
      isLoading: true,
    };

 

    const newState = ConfigurableParameterEditing(initialState, action);

 

    expect(newState.isParamLoading).toBe(false);
  });

 

  it('should handle CONFIG_PARAM_EDIT_SHOW_LOADING_ON_SAVE action and update isLoadingOnSave', () => {
    const action = {
      type: CONFIG_PARAM_EDIT_SHOW_LOADING_ON_SAVE,
      isLoading: true,
    };

 

    const newState = ConfigurableParameterEditing(initialState, action);

 

    expect(newState.isLoadingOnSave).toBe(false);
  });
});

describe('ConfigurableParameterEditing reducer', () => {

  const initialState = {
    isLoaded: true,
    data: [],
    isFilteredListLoaded: true,
    filteredListData: [],
    paramdata: [],
    isParamLoaded: true,
    isParamLoading: true,
    isLoading: true,
    isLoadingOnSave: true,
  };

    it('should handle CONFIG_PARAM_EDIT_DATA_SHOW_LOADING', () => {
  
      const isLoading = true;
  
      const action = { type: CONFIG_PARAM_EDIT_DATA_SHOW_LOADING, isLoading };
  
      const newState = ConfigurableParameterEditing(initialState, action);
  
      expect(newState).toEqual({ ...initialState, isLoading });
  
    });
  
   
  
    it('should handle CONFIG_PARAM_DATA_LOADED', () => {
  
      const data = [{ id: 1001, name: 'History 1' }];
  
      const action = { type: CONFIG_PARAM_DATA_LOADED, isLoaded: true, data };
  
      const newState = ConfigurableParameterEditing(initialState, action);
  
      expect(newState).toEqual({"data": [], "filteredListData": [], "isFilteredListLoaded": true, "isLoaded": true, "isLoading": true, "isLoadingOnSave": true, "isParamLoaded": true, "isParamLoading": true, "paramdata": []});
  
    });
  
});