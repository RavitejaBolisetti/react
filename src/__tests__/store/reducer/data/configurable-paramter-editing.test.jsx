import '@testing-library/jest-dom/extend-expect';
import { ConfigurableParameterEditing } from '@store/reducers/data/configurableParamterEditing';

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

  it('should handle CONFIG_PARAM_EDIT_DATA_LOADED action and update data', () => {
    const data = [{ id: 1, name: 'parameter 1' }];
    const action = { type: 'CONFIG_PARAM_EDIT_DATA_LOADED', isLoaded: true, data };
    const newState = ConfigurableParameterEditing(initialState, action);

    expect(newState.isLoaded).toBe(true);
    expect(newState.data).toEqual(data);
  })

  it('should handle CONFIG_PARAM_DATA_FILTERED_DATA_LOADED action and update data', () => {
    const data = [{ id: 1, parentKey: 'parameter 1' }, { id: 2, parentKey: 'parameter 12' }];
    const action = { type: 'CONFIG_PARAM_DATA_FILTERED_DATA_LOADED', isLoaded: true, data };


    const newState = ConfigurableParameterEditing(initialState, action);

    expect(newState.isFilteredListLoaded).toBe(true);
    expect(newState.data).toEqual([]);
  })

  it('should handle CONFIG_PARAM_DATA_LOADED action and update data', () => {
    const data = [{ id: 1, name: 'parameter 1' }];
    const action = { type: 'CONFIG_PARAM_DATA_LOADED', isLoaded: true, parameterType: 'type1', data };
    const newState = ConfigurableParameterEditing(initialState, action);

    expect(newState.isParamLoaded).toBe(true);
    expect(newState.data).toEqual([]);
  })

  it('should handle CONFIG_PARAM_EDIT_DATA_SHOW_LOADING action and update data', () => {
    const action = { type: 'CONFIG_PARAM_EDIT_DATA_SHOW_LOADING', isLoading: true };
    const newState = ConfigurableParameterEditing(initialState, action);

    expect(newState.isLoading).toBe(true);
  })

  it('should handle CONFIG_PARAM_EDIT_SHOW_LOADING action and update data', () => {
    const action = { type: 'CONFIG_PARAM_EDIT_SHOW_LOADING', isLoading: true };
    const newState = ConfigurableParameterEditing(initialState, action);

    expect(newState.isParamLoading).toBe(true);
  })

  it('should handle CONFIG_PARAM_EDIT_SHOW_LOADING_ON_SAVE action and update data', () => {
    const action = { type: 'CONFIG_PARAM_EDIT_SHOW_LOADING_ON_SAVE', isLoading: true };
    const newState = ConfigurableParameterEditing(initialState, action);

    expect(newState.isLoadingOnSave).toBe(true);
  })

  it('should return initial state for unknown action types', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: {},
    };

    const newState = ConfigurableParameterEditing(initialState, action);

    expect(newState).toEqual(initialState);
  });
})