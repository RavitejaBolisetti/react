/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { GstBranchAccessibleMaster } from 'components/FinancialAccounting/GSTIRNAuthentication/GstBranchAccessible';
import { Provider } from 'react-redux';

jest.mock('store/actions/data/financialAccounting/dealerBranchAccessAction', ()=>({
    dealerBranchAccessAction:{}
}));

const fetchList = jest.fn();

describe("GstBranchAccessibleMaster component", ()=>{
    
    it("onErrorAction", ()=>{
        const mockStore = createMockStore({
            auth: { userId:'123' },
            data: {
                FinancialAccounting: {
                    DealerBranchDetails: { data: [{mapUnmap:"Yes"}] },
                },
            }
        });

        customRender(
            <Provider store={mockStore}>
                <GstBranchAccessibleMaster isVisible={true} fetchList={fetchList} />
            </Provider>
        );

        fetchList.mock.lastCall[0].onErrorAction();

    });

});