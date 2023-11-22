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
    // restore replaced property
    jest.restoreAllMocks();
});
// jest.mock('components/FinancialAccounting/GSTIRNAuthentication/GSTLoginForm', () => {
//     const GSTLoginForm = ({ onFinish }) => {
//         return (
//             <div>
//                 <button onClick={onFinish}>Save</button>
//             </div>
//         );
//     };
//     return {
//         __esModule: true,
//         GSTLoginForm,
//     };
// });

// jest.mock('components/FinancialAccounting/GSTIRNAuthentication/GSTAuthenticationFormButton/GstAuthFormButton', () => {
//     const GstAuthFormButton = ({ onCloseAction }) => {
//         return (
//             <div>
//                 <button onClick={onCloseAction}>Close</button>
//             </div>
//         );
//     };
//     return {
//         __esModule: true,
//         GstAuthFormButton,
//     };
// });

describe('GSTIRNAuthenticationMaster components', () => {
    jest.setTimeout(30000);
    it('onFinish', async () => {
        const values = { clientId: 'AAECS19TXPANP3F', gstinNumber: '19AAECS6807Q1ZL', password: 'Shree@#2020', secretId: '1yE3Ssg7MAaOo4IhWvk0', userName: 'SHREEAUTO', docId: 'c84f814c-f05f-4ac5-a36e-b4b184846ae8' };
        const mockStore = createMockStore({
            auth: { userId: 'test12', accessToken: '345', token: '321' },
            data: { FinancialAccounting: { DealerGstDetails: { data: [{ value: 'GSTIN06' }] } } },
        });
        customRender(
            <Provider store={mockStore}>
                <GSTIRNAuthenticationMaster isVisible={true} values={values} fetchGstDoc={jest.fn()} fetchList={fetchList} />
            </Provider>
        );
        const handleGstinNumber = screen.getByRole('combobox', { name: '' });
        fireEvent.change(handleGstinNumber, { target: { value: 'GSTIN06' } });
        await waitFor(() => {
            expect(screen.getAllByText('GSTIN06')[1]).toBeInTheDocument();
        });
        fireEvent.click(screen.getAllByText('GSTIN06')[1]);

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
    });
    // it('onFinish', () => {
    //     const buttonData = { closeBtn: true };
    //     customRender(<GSTIRNAuthenticationMaster buttonData={buttonData} />);
    //     const loginBtn = screen.getByRole('button', { name: 'Save' });
    //     fireEvent.click(loginBtn);
    //     //  screen.getByRole("");
    // });
    // it("onCloseAction",()=>{
    //     const buttonData = {closeBtn:true}
    // customRender(
    // <GSTIRNAuthenticationMaster buttonData={buttonData}/>
    //  )
    // // const closeBtn = screen.getByRole('button', {name:'Close'});
    // // fireEvent.click(closeBtn)
    // });

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
