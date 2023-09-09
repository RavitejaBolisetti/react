/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ViewDetail } from '@components/FinancialAccounting/AccountCategory/ViewDetail';
import customRender from '@utils/test-utils';

describe("ViewDetail Component Render", ()=>{
    it("render all header and text", ()=>{
        customRender(<ViewDetail styles={{}} expandIcon={jest.fn()} />);

        const descStatus = screen.getByRole('row', {name:'Account Category Code Description Status'});
        expect(descStatus).toBeTruthy();

        const inactiveText = screen.getByRole('row', {name:'InActive'});
        expect(inactiveText).toBeTruthy();

        const code = screen.getByRole('columnheader', {name:'Account Category Code'});
        expect(code).toBeTruthy();

        const description = screen.getByRole('columnheader', {name:'Description'});
        expect(description).toBeTruthy();

        const status = screen.getByRole('columnheader', {name:'Status'});
        expect(status).toBeTruthy();
    });

    it("accountCategory", ()=>{
        const financialAccountData = [{id: '888f1d51-eb7d-40bf-b8cc-7c7f103fd9f2', key: 'CHECKING1234', value: "SIYARAM'S", parentKey: null}];
        const accountCategory = [{accountDocumentMaps:[{menuId:'123', accountDocumentMapId:'123', applicationId:'123', financialAccountHeadCode:'A001', documentDescription:'test', applicationName:'test1'}]}];

        customRender(<ViewDetail styles={{}} financialAccountData={financialAccountData} accountCategory={accountCategory} setDisabledEdit={undefined}/>);
    })
}) 