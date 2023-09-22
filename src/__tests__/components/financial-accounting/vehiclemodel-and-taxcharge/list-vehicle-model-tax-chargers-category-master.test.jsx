/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { VehicleModelAndTaxChargersCategory } from '@components/FinancialAccounting/VehicleModelAndTaxCharges/ListVehicleModelTaxChargersCategoryMaster';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('VehicleModelAndTaxChargersCategory component', () => {
    const fetchList = jest.fn();
    const fetchModelList = jest.fn();
    const fetchAccountCategoryLov = jest.fn();
    const fetchTaxCategoryLov = jest.fn();

    const VehicleModelTaxChargesCategoryData = [{accountCategoryCode:'AC123', accountCategoryDescription:'test', id:'123', modelGroup:'grp', taxCategoryDescription:'test1', taxCategoryId:'65' }];
    const ProductHierarchyData = [];
    const AccountData = [{key:'001', parentKey:null, value:'service'}];
    const TaxCategoryData = [{id:'123', key:'T001', parentKey:null, value:'SGST'}];

    it("pass data", ()=>{
        const filterString = {keyword:'123'};

        const mockStore = createMockStore({
            auth: { userId:123 },
            data: {
                VehicleModelandTaxChargesCategory: {VehicleModelTaxChargesCategoryMain:{isLoaded:false}, data:VehicleModelTaxChargesCategoryData},
                ProductModelGroup: {isLoaded:false, data:ProductHierarchyData},
                AccountCategorylov: { isFilteredListLoaded:false, data:AccountData},
                TaxChargeCategoryLov: { isFilteredListLoaded:false, data:TaxCategoryData}
            }
        })

        customRender(
            <Provider store={mockStore}>
                <VehicleModelAndTaxChargersCategory fetchList={fetchList} fetchModelList={fetchModelList} fetchAccountCategoryLov={fetchAccountCategoryLov} fetchTaxCategoryLov={fetchTaxCategoryLov} filterString={filterString} />
            </Provider>
        );
    })

});
