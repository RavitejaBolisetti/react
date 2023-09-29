/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
// import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ViewDetail } from '@components/FinancialAccounting/AccountCategory/ViewDetail';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe("ViewDetail Component Render", ()=>{
    it("accountCategory", ()=>{
        const financialAccountData = [{id: '123', key: 'CHECKING1234', value: "SIYARAM'S", parentKey: null}];
        const accountCategory = [{accountDocumentMaps:[{menuId:'123', accountDocumentMapId:'123', applicationId:'123', financialAccountHeadCode:'A001', documentDescription:'test', applicationName:'test1'}]}];

        customRender(<ViewDetail styles={{}} financialAccountData={financialAccountData} accountCategory={accountCategory} setDisabledEdit={undefined} />);
    })
}) 