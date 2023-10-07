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
    
    it("combobox", () => {
        const fieldNames = { key: 'modelGroupCode', value: 'modelGroupDescription' }
        const ModelOptions = [{modelGroupCode: "ECOM", modelGroupDescription: "ECOMOBILE"}]; 

        customRender(
            <VehicleModelAndTaxChargersCategory fieldNames={fieldNames} ModelOptions={ModelOptions} isProductHierarchyDataLoading={false}/>
        );

        const inputBox = screen.getByRole('combobox', { name: '', exact: false});
        fireEvent.change(inputBox, { target: { value: 'ECOMOBILE' } });
        fireEvent.click(inputBox);
    })

    it("plus Add butotn", ()=>{
        const VehicleModelTaxChargesCategoryData = {pageNumber:1, pageSize:10, totalRecords:'5942', vehicleModel: [{
            accountCategoryCode: "A002",
            accountCategoryDescription: "Vehicle Sales Account",
        }] }

        const mockStore = createMockStore({
            auth:{userId:123},
            data:{
                VehicleModelandTaxChargesCategory:{
                    VehicleModelTaxChargesCategoryMain: { isLoaded: false, data: VehicleModelTaxChargesCategoryData },
                }
            }
        });

        customRender(
            <Provider store={mockStore}>
                <VehicleModelAndTaxChargersCategory buttonAction={'add'} />
            </Provider>
        );

        const plusAdd = screen.getByRole('button', {name:'plus Add'});
        fireEvent.click(plusAdd); 

        const cancelBtn = screen.getByRole('button', {name:'Cancel'});
        fireEvent.click(cancelBtn);
    })

    it("refresh butotn", ()=>{
        const VehicleModelTaxChargesCategoryData = {pageNumber:1, pageSize:10, totalRecords:'5942', vehicleModel: [{
            accountCategoryCode: "A002",
            accountCategoryDescription: "Vehicle Sales Account",
        }] }

        const mockStore = createMockStore({
            auth:{userId:123},
            data:{
                VehicleModelandTaxChargesCategory:{
                    VehicleModelTaxChargesCategoryMain: { isLoaded: false, data: VehicleModelTaxChargesCategoryData },
                }
            }
        });

        customRender(
            <Provider store={mockStore}>
                <VehicleModelAndTaxChargersCategory buttonAction={'add'} />
            </Provider>
        );

        const refreshBtn = screen.getByRole('button', {name:''});
        fireEvent.click(refreshBtn)
    });

    it("useEfect data passed", ()=>{

        const mockStore = createMockStore({
            auth:{userId:123},
            data:{
                VehicleModelandTaxChargesCategory:{

                    ProductModelGroup: { isLoaded: true, data: [
                        {modelGroupCode: 'ECOM', modelGroupDescription: 'ECOMOBILE', segmentCode: 'PROSPER', productDivisionCode: null, productDivisionName: null}
                    ] },

                    TaxChargeCategoryLov: { isFilteredListLoaded: true, isLoading: false, filteredListData: [{
                        id: "234", key: "12", parentKey: null, value: "DESCTESST"
                    }] },

                    AccountCategorylov: { isFilteredListLoaded: true, filteredListData: [
                        {key: 'A001', value: 'Parts Account', parentKey: null}
                    ] },
                }
            }
        });

        customRender(
            <Provider store={mockStore}>
                <VehicleModelAndTaxChargersCategory />
            </Provider>
        );

    });

    it("isLoaded=true", ()=>{
        const VehicleModelTaxChargesCategoryData = {pageNumber:1, pageSize:10, totalRecords:'5942', vehicleModel: [{
            accountCategoryCode: "A002",
            accountCategoryDescription: "Vehicle Sales Account",
        }] }

        const mockStore = createMockStore({
            auth:{userId:123},
            data:{
                VehicleModelandTaxChargesCategory:{
                    VehicleModelTaxChargesCategoryMain: { isLoaded: true, data: VehicleModelTaxChargesCategoryData },
                }
            }
        });

        customRender(
            <Provider store={mockStore}>
                <VehicleModelAndTaxChargersCategory buttonAction={'add'} />
            </Provider>
        );

        const refreshBtn = screen.getByRole('button', {name:''});
        fireEvent.click(refreshBtn)
    });

    it("onFinish", ()=>{
        
        const VehicleModelTaxChargesCategoryData = {pageNumber:1, pageSize:10, totalRecords:'5942', vehicleModel: [{
            accountCategoryCode: "A002",
            accountCategoryDescription: "Vehicle Sales Account",
        }] };

        const mockStore = createMockStore({
            auth:{userId:123},
            data:{
                VehicleModelandTaxChargesCategory:{
                    VehicleModelTaxChargesCategoryMain: { isLoaded: false, data: VehicleModelTaxChargesCategoryData },

                    ProductModelGroup: { isLoaded: true, data: [
                        {modelGroupCode: 'ECOM', modelGroupDescription: 'ECOMOBILE', segmentCode: 'PROSPER', productDivisionCode: null, productDivisionName: null}
                    ] },

                    TaxChargeCategoryLov: { isFilteredListLoaded: true, isLoading: false, filteredListData: [{
                        id: "234", key: "12", parentKey: null, value: "DESCTESST"
                    }] },

                    AccountCategorylov: { isFilteredListLoaded: true, filteredListData: [
                        {key: 'A001', value: 'Parts Account', parentKey: null}
                    ] },
                }
            }
        });

        customRender(
            <Provider store={mockStore}>
                <VehicleModelAndTaxChargersCategory />
            </Provider>
        );

        const plusAdd = screen.getByRole('button', {name:'plus Add'});
        fireEvent.click(plusAdd); 

        const modelComboBox = screen.getByRole('combobox', {name:'Model Group (Product Hierarchy)'});
        fireEvent.change(modelComboBox, {target:{value:'ECOMOBILE'}});
        expect(modelComboBox.value).toBe('ECOMOBILE');
        fireEvent.click(modelComboBox);

        const taxComboBox = screen.getByRole('combobox', {name:'Tax/Charge Category'});
        fireEvent.change(taxComboBox, {target:{value:'DESCTESST'}});
        expect(taxComboBox.value).toBe('DESCTESST');
        fireEvent.click(taxComboBox);

        const accountComboBox = screen.getByRole('combobox', {name:'Account category'});
        fireEvent.change(accountComboBox, {target:{value:'Parts Account'}});
        expect(accountComboBox.value).toBe('Parts Account');
        fireEvent.click(accountComboBox);

        const saveBtn = screen.getByRole('button', {name:'Save'});
        fireEvent.click(saveBtn); 
    });

});
