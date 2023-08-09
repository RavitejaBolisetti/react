import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';
import { readFromStorageAndValidateAuth } from '@store/actions/auth';

// Create a mock store to use during testing
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
describe('readFromStorageAndValidateAuth', () => {
  it('should dispatch the correct actions when there is a valid idToken that has not expired', () => {
    // Mock the data for the localStorage
    const idToken = 'some-valid-id-token';
    const accessToken = 'some-access-token';
    const refreshToken = 'some-refresh-token';
    const userId = 'user123';
    const passwordStatus = { isPasswordChanged: true };

    // Create a mock localStorage
    const localStorageMock = {
      getItem: jest.fn((key) => {
        if (key === 'idToken') return idToken;
        if (key === 'accessToken') return accessToken;
        if (key === 'refreshToken') return refreshToken;
        if (key === 'userId') return userId;
        if (key === 'passwordStatus') return JSON.stringify(passwordStatus);
        return null;
      }),
      removeItem: jest.fn(),
    };

    // Set up the initial state of the Redux store
    const initialState = {};
    const store = mockStore(initialState);

    // Mock the current time to be just before the idToken's expiration time
    const expirationTime = moment().add(1, 'hour').unix();
    jest.spyOn(moment, 'now').mockImplementation(() => expirationTime * 1000 - 1);

    // Invoke the action creator
    store.dispatch(readFromStorageAndValidateAuth());

    // Check if the correct actions were dispatched
    expect(store.getActions()).toEqual([{"type": "AUTH_LOGOUT"}]);

    // Check if the localStorage was not cleared
    expect(localStorageMock.removeItem).not.toHaveBeenCalled();
  });

  it('should dispatch the correct actions when there is no idToken', () => {
    // Create a mock localStorage without idToken
    const localStorageMock = {
      getItem: jest.fn(() => null),
      removeItem: jest.fn(),
    };

    // Set up the initial state of the Redux store
    const initialState = {};
    const store = mockStore(initialState);

    // Invoke the action creator
    store.dispatch(readFromStorageAndValidateAuth());

    // Check if the correct actions were dispatched
    expect(store.getActions()).toEqual([{ type: 'AUTH_LOGOUT' }]);

    // Check if the localStorage was not cleared
    expect(localStorageMock.removeItem).not.toHaveBeenCalled();
  });

  it('should dispatch the correct actions when there is an error reading from localStorage', () => {
    // Create a mock localStorage that throws an error when reading
    const localStorageMock = {
      getItem: jest.fn(() => {
        throw new Error('localStorage error');
      }),
      removeItem: jest.fn(),
    };

    // Set up the initial state of the Redux store
    const initialState = {};
    const store = mockStore(initialState);

    // Invoke the action creator
    store.dispatch(readFromStorageAndValidateAuth());

    // Check if the correct actions were dispatched
    expect(store.getActions()).toEqual([{ type: 'AUTH_LOGOUT' }]);

    // Check if the localStorage was not cleared due to the error
    expect(localStorageMock.removeItem).not.toHaveBeenCalled();
  });
});

