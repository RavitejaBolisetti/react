/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { ViewDetail } from '@components/FinancialAccounting/AccountTaxCharges/TaxAndChargesCategory/ViewDetail';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('ViewDetail component', () => {
    it('render all header', ()=>{
        const taxCategory = {taxCategoryDetail:[{chargeCode: "CCESS17",chargeDescription: "Compensation Cess 17%",chargeType: "CCESS",id: "513",saleType: "OUGST",stateCode: "27",stateName: null,taxMasterId: "609"}]}
        customRender(<ViewDetail styles={{}}  taxCategory={taxCategory} />);
    })
})