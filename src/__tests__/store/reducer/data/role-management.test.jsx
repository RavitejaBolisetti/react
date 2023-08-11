
import { createStore } from 'redux';
import {RoleManagement} from '@store/reducers/data/RoleManagement'; // Your reducer file

describe('RoleManagement Reducer', () => {
  let store;

  beforeEach(() => {
    store = createStore(RoleManagement); // Create a Redux store with your reducer
  });

  it('handles ROLE_MANAGEMENT_DATA_LOADED action', () => {
    const data = [{ id: 1, name: 'Role 1' }];
    const action = { type: 'ROLE_MANAGEMENT_DATA_LOADED', isLoaded: true, data };

    store.dispatch(action);

    expect(store.getState().data).toEqual(data);
    expect(store.getState().isLoaded).toEqual(true);
  });

  it('handles ROLE_MANAGEMENT_SET_FORM_DATA action', () => {
    const formData = { id: 1, name: 'Role 1' };
    const action = { type: 'ROLE_MANAGEMENT_SET_FORM_DATA', isFormDataLoaded: true, formData };

    store.dispatch(action);

    expect(store.getState().formData).toEqual(formData);
    expect(store.getState().isFormDataLoaded).toEqual(true);
  });

  it('handles unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    store.dispatch(action);

    expect(store.getState()).toEqual({
      isLoaded: false,
      data: [],
      isFormDataLoaded: false,
      formData: undefined,
      isFormVisible: false,
      isLoading: false,
      isLoadingOnSave: false,
    });
  });
  it('handles ROLE_MANAGEMENT_SET_FORM_IS_VISIBLE action', () => {
    const isVisible = true;
    const action = { type: 'ROLE_MANAGEMENT_SET_FORM_IS_VISIBLE', isLoading: isVisible };

    store.dispatch(action);

    expect(store.getState().isFormVisible).toEqual(isVisible);
  });

  it('handles ROLE_MANAGEMENT_DATA_SHOW_LOADING action', () => {
    const isLoading = true;
    const action = { type: 'ROLE_MANAGEMENT_DATA_SHOW_LOADING', isLoading };

    store.dispatch(action);

    expect(store.getState().isLoading).toEqual(isLoading);
  });

  it('handles ROLE_MANAGEMENT_DATA_ON_SAVE_SHOW_LOADING action', () => {
    const isLoadingOnSave = true;
    const action = { type: 'ROLE_MANAGEMENT_DATA_ON_SAVE_SHOW_LOADING', isLoading: isLoadingOnSave };

    store.dispatch(action);

    expect(store.getState().isLoadingOnSave).toEqual(isLoadingOnSave);
  });

  it('handles MENU_DATA_LOADED action', () => {
    const menuData = [{ id: 1, name: 'Menu 1' }];
    const action = { type: 'MENU_DATA_LOADED', isLoaded: true, data: menuData };

    store.dispatch(action);

    expect(store.getState().MenuTreeData).toEqual(menuData);
    expect(store.getState().isLoaded).toEqual(true);
  });

  it('handles ROLE_MANAGEMENT_ROLES action', () => {
    const roleData = [{ id: 1, name: 'Role 1' }];
    const action = { type: 'ROLE_MANAGEMENT_ROLES', isLoaded: true, data: roleData };

    store.dispatch(action);

    expect(store.getState().RoleData).toEqual(roleData);
    expect(store.getState().isLoaded).toEqual(true);
  });

});
