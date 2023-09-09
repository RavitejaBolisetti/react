/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ViewDetail } from '@components/FinancialAccounting/VehicleModelAndTaxCharges/ViewDetail';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('ViewDetail component', () => {
    it('render table header', () => {
        customRender(<ViewDetail style={{}} />);

        const groupCode = screen.getByRole('columnheader', {name:'Model Group Code'});
        expect(groupCode).toBeTruthy();

        const desc = screen.getByRole('columnheader', {name:'Tax Category Description'});
        expect(desc).toBeTruthy();

        const categogory = screen.getByRole('columnheader', {name:'Account Category Description'});
        expect(categogory).toBeTruthy();
    })
})