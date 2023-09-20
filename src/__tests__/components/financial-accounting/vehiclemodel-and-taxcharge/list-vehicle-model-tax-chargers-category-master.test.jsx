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
    it('ContentHeaderProps', () => {
        const props = {
            handleAdd:jest.fn(),
            handleChange:jest.fn(),
            handleReferesh:jest.fn(),
            onSearchHandle:jest.fn(),
            VehicleModelTaxChargesCategoryData:[{modelId:'123', modelGroup:'test'},{modelId:'13', modelGroup:'test1'}],
            isProductHierarchyDataLoading:false,
            titleHierarchy: 'Model Group',
            ModelOptions:[{}]
        }
        customRender(<VehicleModelAndTaxChargersCategory {...props}/>);

        const searchInput = screen.getAllByRole('combobox');
        fireEvent.change(searchInput[0], {target:{value:'test'}});
    });

});
