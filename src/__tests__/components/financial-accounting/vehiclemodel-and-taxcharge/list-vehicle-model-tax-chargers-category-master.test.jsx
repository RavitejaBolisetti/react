/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { screen, fireEvent} from '@testing-library/react';
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

    it("filterString", ()=>{
        customRender(<VehicleModelAndTaxChargersCategory filterString={{keyword:'test'}}/>)
    })

    it("VehicleModelTaxChargesCategoryDataLoaded=false", ()=>{
        customRender(<VehicleModelAndTaxChargersCategory userId={'123'} VehicleModelTaxChargesCategoryDataLoaded={false}/>)
    })

    it("VehicleModelTaxChargesCategoryDataLoaded=true", ()=>{
        customRender(<VehicleModelAndTaxChargersCategory userId={'123'} VehicleModelTaxChargesCategoryDataLoaded={true}/>)
    })

    it("isAccountDataLoaded=true", ()=>{
        customRender(<VehicleModelAndTaxChargersCategory userId={'123'} isAccountDataLoaded={true}/>)
    })

    it("isAccountDataLoaded=false", ()=>{
        customRender(<VehicleModelAndTaxChargersCategory userId={'123'} isAccountDataLoaded={false}/>)
    })

    it("isTaxCategoryDataLoaded=true", ()=>{
        customRender(<VehicleModelAndTaxChargersCategory userId={'123'} isTaxCategoryDataLoaded={true}/>)
    })

    it("isTaxCategoryDataLoaded=false", ()=>{
        customRender(<VehicleModelAndTaxChargersCategory userId={'123'} isTaxCategoryDataLoaded={false}/>)
    })

    it('isProductHierarchyDataLoaded=true', ()=>{
        customRender(<VehicleModelAndTaxChargersCategory isProductHierarchyDataLoaded={true} />)
    })

    it('buttonData', ()=>{
        customRender(<VehicleModelAndTaxChargersCategory buttonData={{closeBtn:true}} isVisible={true} onCloseAction={jest.fn()} />);
    })

});
