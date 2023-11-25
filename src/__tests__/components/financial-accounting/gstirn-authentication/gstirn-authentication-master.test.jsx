/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { GSTIRNAuthenticationMaster } from 'components/FinancialAccounting/GSTIRNAuthentication/GSTIRNAuthenticationMaster';
import customRender from '@utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { fireEvent, screen, waitFor } from '@testing-library/react';

jest.mock('store/actions/data/financialAccounting/dealerGstAction', () => ({
    dealerGstAction: {},
}));

jest.mock('store/actions/data/financialAccounting/selectGstToDocAction', () => ({
    selectGstToDocAction: {},
}));

jest.mock('store/actions/data/financialAccounting/gstIrnLoginAction', () => ({
    gstIrnLoginAction: {},
}));

const fetchGstDoc = jest.fn();
const fetchList = jest.fn();

afterEach(() => {
    jest.restoreAllMocks();
});

describe('GSTIRNAuthenticationMaster components', () => {
    jest.setTimeout(30000);
    it('onFinish', async () => {
        const mockStore = createMockStore({
            auth: { userId: 'test12', accessToken: '345', token: '321' },
            data: { FinancialAccounting: { DealerGstDetails: { data: [{ "key": "fc59f4b6-397e-4072-9816-f7fad5ecb08e", "value": "19AAECS6807Q1ZL", "parentKey": null }] } } },
        });

        const saveData=jest.fn();
        const fetchGstDoc=jest.fn();
        const res={ data: { "documentId": "996111e0-73bd-4ae5-b439-9181f8210e4d", "pemFile": "secretkey-1696914838011.pem" } }

        customRender(
            <Provider store={mockStore}>
                <GSTIRNAuthenticationMaster isVisible={true} fetchListGstLogin={jest.fn()} saveData={saveData}  fetchGstDoc={fetchGstDoc} fetchList={fetchList} />
            </Provider>
        );

        const handleGstinNumber = screen.getByRole('combobox', { name: '' });
        fireEvent.change(handleGstinNumber, { target: { value: '19AAECS6807Q1ZL' } });
        await waitFor(() => {
            expect(screen.getAllByText('19AAECS6807Q1ZL')[1]).toBeInTheDocument();
        });
        fireEvent.click(screen.getAllByText('19AAECS6807Q1ZL')[1]);

        fetchGstDoc.mock.calls[0][0].onErrorAction();
        fetchGstDoc.mock.calls[0][0].onSuccessAction(res);

        const userName = screen.getByTestId('userNameInput');
        fireEvent.change(userName, { target: { value: 'Test' } });

        const clientId = screen.getByTestId('clientIdInput');
        fireEvent.change(clientId, { target: { value: 'Test' } });

        const secretId = screen.getByTestId('secretIdInput');
        fireEvent.change(secretId, { target: { value: 'Test' } });

        const passwordInput = screen.getByTestId('passwordInput');
        fireEvent.change(passwordInput, { target: { value: 'Test' } });

        const loginBtn = screen.getByRole('button', { name: 'Login & Continue' });
        fireEvent.click(loginBtn);

        await waitFor(() => { expect(saveData).toHaveBeenCalled() });

        saveData.mock.calls[0][0].onError();
        saveData.mock.calls[0][0].onSuccess();

        await waitFor(() => { expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument() });

        const cancelBtn=screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
    });

    it('fileProps', () => {
        const docData = { documentId: '123', pemFile: 'secretkey-1696914838011.pem' };
        const mockStore = createMockStore({
            auth: { userId: 'test12', accessToken: '345', token: '321' },
            data: { FinancialAccounting: { DealerGstDetails: { data: [{ documentId: '123', pemFile: 'secretkey-1696914838011.pem' }] } } },
        });

        customRender(
            <Provider store={mockStore}>
                <GSTIRNAuthenticationMaster fetchGstDoc={fetchGstDoc} isVisible={true} fetchList={fetchList} docData={docData} showDownloadIcon={true} showRemoveIcon={true} />
            </Provider>
        );

        fetchList.mock.lastCall[0].onSuccessAction();
        fetchList.mock.lastCall[0].onErrorAction();
    });

    it('selectGstCombobox', () => {
        const dealerGst = [{ key: '123', value: '987', parentKey: null }];

        const mockStore = createMockStore({
            auth: { userId: 'test12', accessToken: '345', token: '321' },
            data: { FinancialAccounting: { DealerGstDetails: { data: [{ key: '123', parentKey: null, value: '987' }] } } },
        });

        customRender(
            <Provider store={mockStore}>
                <GSTIRNAuthenticationMaster fetchGstDoc={fetchGstDoc} dealerGst={dealerGst} fetchList={jest.fn()} />
            </Provider>
        );

        const dealerNameInputBox = screen.getAllByRole('textbox', { name: '' });
        fireEvent.change(dealerNameInputBox[0], { target: { value: 'test12' } });
        expect(dealerNameInputBox[0].value).toBe('test12');

        const selectGstCombobox = screen.getByRole('combobox', { name: '' });
        fireEvent.change(selectGstCombobox, { target: { value: '987' } });
    });
});
