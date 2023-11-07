/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { GSTIRNAuthenticationMaster } from "components/FinancialAccounting/GSTIRNAuthentication/GSTIRNAuthenticationMaster";
import customRender from '@utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import createMockStore from "__mocks__/store";
import { Provider } from "react-redux";
import { fireEvent, screen } from "@testing-library/react";

jest.mock('store/actions/data/financialAccounting/dealerGstAction', ()=>({
    dealerGstAction:{}
}));

jest.mock('store/actions/data/financialAccounting/selectGstToDocAction', ()=>({
    selectGstToDocAction:{}
}));

jest.mock('store/actions/data/financialAccounting/gstIrnLoginAction', ()=>({
    gstIrnLoginAction:{}
}));

const fetchGstDoc = jest.fn()
const fetchList = jest.fn()

afterEach(() => {
    // restore replaced property
    jest.restoreAllMocks();
});

describe("GSTIRNAuthenticationMaster components", ()=>{

    it("onFinish", ()=>{
        const values = {clientId: "AAECS19TXPANP3F", gstinNumber: "19AAECS6807Q1ZL", password: "Shree@#2020", secretId: "1yE3Ssg7MAaOo4IhWvk0", userName: "SHREEAUTO"};
        
        const mockStore = createMockStore({
            auth: { userId:'test12', accessToken:'345', token:'321' },
            data:{ FinancialAccounting: {DealerGstDetails: { data: [{key: "823", parentKey: null, value: "GSTIN06"}] }} }
        });

        customRender(
            <Provider store={mockStore}>
                <GSTIRNAuthenticationMaster isVisible={true} values={values} fetchList={fetchList}/>
            </Provider>
        );

        const loginBtn = screen.getByRole('button', {name:'Login & Continue'});
        fireEvent.click(loginBtn)
    })

    it("fileProps", ()=>{
        const docData = {documentId:'123', pemFile:'secretkey-1696914838011.pem'}
        const mockStore = createMockStore({
            auth: { userId:'test12', accessToken:'345', token:'321' },
            data:{ FinancialAccounting: {DealerGstDetails: { data: [{documentId:'123', pemFile:'secretkey-1696914838011.pem'}] }} }
        });

        customRender(
            <Provider store={mockStore}>
                <GSTIRNAuthenticationMaster fetchGstDoc={fetchGstDoc} isVisible={true} fetchList={fetchList}
                 docData={docData} showDownloadIcon={true} showRemoveIcon={true} />
            </Provider>
        );

        fetchList.mock.lastCall[0].onSuccessAction();
        fetchList.mock.lastCall[0].onErrorAction();
    });

    it("selectGstCombobox", ()=>{
        const dealerGst = [{key: '123', value: '987', parentKey: null}];

        const mockStore = createMockStore({
            auth: { userId:'test12', accessToken:'345', token:'321' },
            data:{ FinancialAccounting: {DealerGstDetails: { data: [{key: "123", parentKey: null, value: "987"}] },} }
        });

        customRender(
            <Provider store={mockStore}>
                <GSTIRNAuthenticationMaster fetchGstDoc={fetchGstDoc} dealerGst={dealerGst} fetchList={jest.fn()} />
            </Provider>
        );

        const dealerNameInputBox = screen.getAllByRole('textbox', {name:''});
        fireEvent.change(dealerNameInputBox[0], {target:{value:'test12'}});
        expect(dealerNameInputBox[0].value).toBe('test12');

        const selectGstCombobox = screen.getByRole('combobox', {name:''});
        fireEvent.change(selectGstCombobox, { target: { value: '987' } });
    });

})