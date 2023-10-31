import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { gstIRNTransactionActions } from '@store/actions/data/financialAccounting/gstIRNTransactionPending/gstIRNTransaction';

const mockStore = configureMockStore([thunk]);

describe('gstIRNTransactionActions', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            auth: { userId: 6523, accessToken: "access token", token: "token_test" }
        });
    });

    jest.mock('store/actions/data/financialAccounting/gstIRNTransactionPending/gstIRNTransaction', ()=>({
        gstIRNTransactionActions:{}
    }));

    it('should dispatch fetchGSTINList action successfully', async () => {
        const setIsLoadingMock = jest.fn();
        const onSuccessMock = jest.fn();
        const onErrorMock = jest.fn();
        const dispatchMock = jest.fn();
        const fetchGSTINList = jest.fn();

        const params = {
            setIsLoading: setIsLoadingMock,
            onSuccess: onSuccessMock,
            onError: onErrorMock,
            data: { mockData: 'value' },
            userId: '2434',
            customURL: 'yourCustomURL',
        };

        const token = 'yourToken';
        const accessToken = 'yourAccessToken';

        const expectedApiCallParams = {
            data: params.data,
            method: 'get',
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

        gstIRNTransactionActions.axiosAPICall = axiosAPICallMock;
        gstIRNTransactionActions.withAuthToken = withAuthTokenMock;

        await store.dispatch(gstIRNTransactionActions.fetchGSTINList(params));
        expect(setIsLoadingMock).toHaveBeenCalledWith(true);    
    });

    it('should dispatch viewDocument action successfully', async () => {
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
            method: 'get',
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

        gstIRNTransactionActions.axiosAPICall = axiosAPICallMock;
        gstIRNTransactionActions.withAuthToken = withAuthTokenMock;

        await store.dispatch(gstIRNTransactionActions.viewDocument(params));
        expect(setIsLoadingMock).toHaveBeenCalledWith(true);
    });

    it('should dispatch uploadDocument action successfully', async () => {
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
            method: 'get',
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

        gstIRNTransactionActions.axiosAPICall = axiosAPICallMock;
        gstIRNTransactionActions.withAuthToken = withAuthTokenMock;

        await store.dispatch(gstIRNTransactionActions.uploadDocument(params));
        expect(setIsLoadingMock).toHaveBeenCalledWith(true);
    });
});