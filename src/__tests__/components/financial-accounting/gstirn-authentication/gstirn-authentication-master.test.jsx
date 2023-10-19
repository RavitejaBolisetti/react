/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { GSTIRNAuthenticationMasterBase } from "components/FinancialAccounting/GSTIRNAuthentication/GSTIRNAuthenticationMaster";
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

const fetchGstDoc = jest.fn()

afterEach(() => {
    // restore replaced property
    jest.restoreAllMocks();
});

describe("GSTIRNAuthenticationMasterBase components", ()=>{
    it("fileProps", ()=>{
        const mockStore = createMockStore({
            auth: { userId:'test12', accessToken:'345', token:'321' },
            data:{ FinancialAccounting: {DealerGstDetails: { data: [{documentId:'123', pemFile:'secretkey-1696914838011.pem'}] },} }
        });

        customRender(
            <Provider store={mockStore}>
                <GSTIRNAuthenticationMasterBase fetchGstDoc={fetchGstDoc} isVisible={true} />
            </Provider>
        );
    });

    it("selectGstCombobox", ()=>{
        const dealerGst = [{key: '123', value: '987', parentKey: null}];

        const mockStore = createMockStore({
            auth: { userId:'test12', accessToken:'345', token:'321' },
            data:{ FinancialAccounting: {DealerGstDetails: { data: [{key: "123", parentKey: null, value: "987"}] },} }
        });

        customRender(
            <Provider store={mockStore}>
                <GSTIRNAuthenticationMasterBase fetchGstDoc={fetchGstDoc} dealerGst={dealerGst} />
            </Provider>
        );

        const dealerNameInputBox = screen.getAllByRole('textbox', {name:''});
        fireEvent.change(dealerNameInputBox[0], {target:{value:'test12'}});
        expect(dealerNameInputBox[0].value).toBe('test12');

        const selectGstCombobox = screen.getByRole('combobox', {name:''});
        fireEvent.change(selectGstCombobox, { target: { value: '987' } });
    });

})