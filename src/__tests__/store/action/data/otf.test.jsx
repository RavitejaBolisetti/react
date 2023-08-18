import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { otfDataActions } from '@store/actions/data/otf/otf';

const mockStore = configureMockStore([thunk]);

describe('otfDataActions', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            auth: { userId: 6523, accessToken: "access token", token: "token_test" }
        });
    });

    it('should dispatch transferOTF action successfully', async () => {
        const setIsLoadingMock = jest.fn();
        const onSuccessActionMock = jest.fn();
        const onErrorActionMock = jest.fn();
        const dispatchMock = jest.fn();

        const params = {
            setIsLoading: setIsLoadingMock,
            onSuccessAction: onSuccessActionMock,
            onErrorAction: onErrorActionMock,
            data: { mockData: 'value' },
            userId: '2434',
            customURL: 'yourCustomURL',
        };

        const token = 'yourToken';
        const accessToken = 'yourAccessToken';

        const expectedApiCallParams = {
            data: params.data,
            method: 'put',
            url: params.customURL,
            token,
            accessToken,
            userId: params.userId,
            onSuccess: expect.any(Function),
            onError: expect.any(Function),
            onTimeout: expect.any(Function),
            onUnAuthenticated: expect.any(Function),
            onUnauthorized: expect.any(Function),
            postRequest: expect.any(Function),
        };

        const axiosAPICallMock = jest.fn();
        axiosAPICallMock.mockImplementation((apiCallParams) => {
            expect(apiCallParams).toEqual(expectedApiCallParams);
            apiCallParams.onSuccess({ data: 'response data' });
        });

        const withAuthTokenMock = (func) => func({ token, accessToken, userId: params.userId })(dispatchMock);

        const doLogoutMock = jest.fn();
        const unAuthenticateUserMock = jest.fn();

        const originalDoLogout = otfDataActions.doLogout;
        const originalUnAuthenticateUser = otfDataActions.unAuthenticateUser;

        otfDataActions.doLogout = doLogoutMock;
        otfDataActions.unAuthenticateUser = unAuthenticateUserMock;

        otfDataActions.axiosAPICall = axiosAPICallMock;
        otfDataActions.withAuthToken = withAuthTokenMock;

        await store.dispatch(otfDataActions.transferOTF(params));
        expect(setIsLoadingMock).toHaveBeenCalledWith(true);        
        expect(dispatchMock).not.toHaveBeenCalledWith(doLogoutMock());
        expect(dispatchMock).not.toHaveBeenCalledWith(unAuthenticateUserMock());

        otfDataActions.doLogout = originalDoLogout;
        otfDataActions.unAuthenticateUser = originalUnAuthenticateUser;

    });
});
