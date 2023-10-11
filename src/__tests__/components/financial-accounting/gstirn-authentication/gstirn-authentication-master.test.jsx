/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { GSTIRNAuthenticationMasterBase } from "components/FinancialAccounting/GSTIRNAuthentication/GSTIRNAuthenticationMaster";
import customRender from '@utils/test-utils';
import createMockStore from "__mocks__/store";
import { Provider } from "react-redux";

jest.mock('store/actions/data/financialAccounting/dealerGstAction', ()=>({
    dealerGstAction:{}
}));

const fetchList = jest.fn()

afterEach(() => {
    // restore replaced property
    jest.restoreAllMocks();
});

describe("GSTIRNAuthenticationMasterBase components", ()=>{
    it("render", ()=>{
        customRender(<GSTIRNAuthenticationMasterBase />);
    });

    it("pass data", ()=>{
        const mockStore = createMockStore({
            auth: { userId:'123', accessToken:'345', token:'321' },
            data:{
                FinancialAccounting: {
                    DealerGstDetails: { data: [{key: "675", parentKey: null, value: "GSTIN02"}] },
                },
            }
        });

        customRender(
            <Provider store={mockStore}>
                <GSTIRNAuthenticationMasterBase />
            </Provider>
        );
    });

})