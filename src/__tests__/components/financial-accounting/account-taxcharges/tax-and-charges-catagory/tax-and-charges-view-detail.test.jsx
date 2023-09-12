/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ViewDetail } from '@components/FinancialAccounting/AccountTaxCharges/TaxAndChargesCategory/ViewDetail';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('ViewDetail component', () => {
    it('render all header', ()=>{
        customRender(<ViewDetail styles={{}}  />);

        const code = screen.getByRole('columnheader', {name:'Code'});
        expect(code).toBeTruthy();

        const description = screen.getByRole('columnheader', {name:'Description'});
        expect(description).toBeTruthy();

        const status = screen.getByRole('columnheader', {name:'State'});
        expect(status).toBeTruthy();

        const action = screen.getByRole('columnheader', {name:'Sale Type'});
        expect(action).toBeTruthy();
    })
})