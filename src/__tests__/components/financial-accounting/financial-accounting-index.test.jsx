/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { gstIRNTransactionActions } from '@store/actions/data/financialAccounting/gstIRNTransactionPending/gstIRNTransaction';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);


describe("FinancialAccounting Index", ()=>{
    let store;

    beforeEach(() => {
        store = mockStore({
            auth: { userId: 6523, accessToken: "access token", token: "token_test" }
        });
    });

    it("gstIRNTransactionPending", async()=>{
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

        const withAuthTokenMock = (func) => func({ token, accessToken, userId: params.userId })(dispatchMock);

        gstIRNTransactionActions.withAuthToken = withAuthTokenMock;

        await store.dispatch(gstIRNTransactionActions.fetchGSTINList(params));
        expect(setIsLoadingMock).toHaveBeenCalledWith(true);
    });
    
});