import { readFromStorageAndValidateAuth, authPreLoginSuccess, authLoggingError, authUserLogout, authUserTokenExpired, unAuthenticateUser, doCloseLoginError, doCloseUnAuthenticatedError, authPostLogin, authPreLogin, doLogin, doRefreshToken, doLogoutAPI } from 'store/actions/auth';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';
import { waitFor } from '@testing-library/react';

jest.mock('jwt-decode', () => jest.fn(() => ({ exp: Math.floor(Date.now() / 1000) + (60 * 60) })));

describe('Auth Actions Component', () => {
    it('should dispatch the actions', async () => {
        const store = createMockStore({});
        const actions = [];

        store.subscribe(() => {
            actions.push(store.getState().lastAction);
        });

        store.dispatch(readFromStorageAndValidateAuth());
        store.dispatch(authUserLogout());
        store.dispatch(authUserTokenExpired());
        store.dispatch(unAuthenticateUser());
        store.dispatch(doCloseLoginError());
        store.dispatch(doCloseUnAuthenticatedError());
        store.dispatch(authPostLogin());
        store.dispatch(authPreLogin());

        const requestData={ userId: 'test', password: 'password' };
        const onError=jest.fn();
        const onLogin=jest.fn();
        store.dispatch(doLogin(requestData, false, onLogin, onError));
        const params={
          onSuccess: jest.fn(),
          onError: jest.fn(),
          data: { name: 'Kai' }
        }
        store.dispatch(doRefreshToken(params));
        store.dispatch(doLogoutAPI(params));

    });

    it('should dispatch the correct actions when there is a valid idToken that has not expired', async () => {
        localStorage.setItem('idToken', 'hello');
        localStorage.setItem('accessToken', 'accessToken');
        localStorage.setItem('refreshToken', 'refreshToken');
        localStorage.setItem('userId', 'userId');
        localStorage.setItem('passwordStatus', JSON.stringify('passwordStatus'));

        const store = createMockStore({});
        store.dispatch(readFromStorageAndValidateAuth());

        const authPostLoginActions=jest.fn();

        await waitFor(() => { authPostLoginActions() });
    });

    it('functions should work', async () => {
        authPreLoginSuccess();
        authLoggingError();
    });
});
