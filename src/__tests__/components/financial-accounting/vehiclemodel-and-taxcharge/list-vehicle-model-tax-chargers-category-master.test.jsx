/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { VehicleModelAndTaxChargersCategory } from '@components/FinancialAccounting/VehicleModelAndTaxCharges/ListVehicleModelTaxChargersCategoryMaster';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('VehicleModelAndTaxChargersCategory component', () => {
    it('render table header', () => {
        customRender(<VehicleModelAndTaxChargersCategory  VehicleModelTaxChargesCategoryDataLoaded={false} userId={'1234'}/>);

        const modelGroup = screen.getByRole('columnheader', {name:'Model Group'});
        expect(modelGroup).toBeTruthy();

        const tax = screen.getByRole('columnheader', {name:'Tax Charges and Category'});
        expect(tax).toBeTruthy();

        const categogory = screen.getByRole('columnheader', {name:'Account Category'});
        expect(categogory).toBeTruthy();

        const action = screen.getByRole('columnheader', {name:'Action'});
        expect(action).toBeTruthy();
    });

});
