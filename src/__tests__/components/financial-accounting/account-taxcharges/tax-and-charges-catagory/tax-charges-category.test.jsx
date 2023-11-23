/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TaxChargesCategory } from '@components/FinancialAccounting/AccountTaxCharges/TaxAndChargesCategory/TaxChargesCategory';
import customRender from '@utils/test-utils';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

jest.mock('store/actions/data/financialAccounting/taxChargeType', ()=>({
    taxChargeCategoryTypeDataActions:{}
}));

const fetchTaxChargeCategoryType = jest.fn();

afterEach(() => {
    jest.restoreAllMocks();
});

describe('TaxChargesCategory component', () => {
    
    it("onSuccessAction", async()=>{
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                FinancialAccounting: {
                    TaxChargesCategory: { isLoaded: false, isLoading: false, data: { pageNumber:'1', pageSize: '10', totalRecords:'1', taxCategoryHeaderListDto:[{id: "532", status: true, taxCategoryCode: "123", taxCategoryDescription: "test"}] } } 
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <TaxChargesCategory fetchTaxChargeCategoryType={fetchTaxChargeCategoryType} />
            </Provider>
        );

        fetchTaxChargeCategoryType.mock.calls[0][0].onSuccessAction();

        const tableText = await screen.findByText('test');
        expect(tableText).toBeTruthy();

        const editIcon = screen.getByTestId('edit');
        fireEvent.click(editIcon);

        const viewIcon = screen.getByTestId('view');
        fireEvent.click(viewIcon);
    })

    it("refresh button", ()=>{
        const filterString = {advanceFilter: false, keyword: 'PA05'};

        const tableData = [{ id: "133", status: true, taxCategoryCode: "PA05", taxCategoryDescription: "Goods and Services Tax 5%"
        }];

        const buttonData = { editBtn: true, saveBtn: true, saveAndNewBtn: true, saveAndNewBtnClicked: true, closeBtn: true, cancelBtn: true, formBtnActive: true }; 

        const formActionType = { addMode: 'add', editMode: 'edit', viewMode: 'view' };

        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                FinancialAccounting: {
                    TaxChargesCategory: { isLoaded: false, isLoading: false, data: { pageNumber:1, pageSize:10, totalRecords:365, taxCategoryHeaderListDto: [{ id: "133", status: true, taxCategoryCode: "PA05", taxCategoryDescription: "Goods and Services Tax 5%"
                    }] } },  
                },
            }
        });

        customRender(
            <Provider store={mockStore}>
                <TaxChargesCategory advanceFilter={false} filterString={filterString} tableData={tableData} formActionType={formActionType} buttonData={buttonData} fetchTaxChargeCategoryType={fetchTaxChargeCategoryType} />
            </Provider>
        );

        const categoryCode = screen.getByRole('textbox', {name:'Tax & Charges Category Code'});
        fireEvent.change(categoryCode, { target:{value:'PA05'} });

        const searchBtn = screen.getByRole('button', {name:'search'});
        fireEvent.click(searchBtn);

        const refreshBtn = screen.getByRole('button', {name:''});
        fireEvent.click(refreshBtn);
    })

    it("plus add button", ()=>{
        const filterString = {advanceFilter: false, keyword: 'PA05'};

        const tableData = [{ id: "133", status: true, taxCategoryCode: "PA05", taxCategoryDescription: "Goods and Services Tax 5%"
        }];

        const buttonData = { editBtn: true, saveBtn: true, saveAndNewBtn: true, saveAndNewBtnClicked: true, closeBtn: true, cancelBtn: true, formBtnActive: true }; 

        const formActionType = { addMode: 'add', editMode: 'edit', viewMode: 'view' };

        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                FinancialAccounting: {
                    TaxChargesCategory: { isLoaded: false, isLoading: false, data: { pageNumber:1, pageSize:10, totalRecords:365, taxCategoryHeaderListDto: [{ id: "133", status: true, taxCategoryCode: "PA05", taxCategoryDescription: "Goods and Services Tax 5%"
                    }] } },  
                },
            }
        });

        customRender(
            <Provider store={mockStore}>
                <TaxChargesCategory advanceFilter={false} filterString={filterString} tableData={tableData} formActionType={formActionType} buttonData={buttonData} fetchTaxChargeCategoryType={fetchTaxChargeCategoryType} />
            </Provider>
        );

        const categoryCode = screen.getByRole('textbox', {name:'Tax & Charges Category Code'});
        fireEvent.change(categoryCode, { target:{value:'PA05'} });

        const searchBtn = screen.getByRole('button', {name:'search'});
        fireEvent.click(searchBtn);

        const plusAddBtn = screen.getByRole('button', {name:'plus Add'});
        fireEvent.click(plusAddBtn);

        const closeIcon = screen.getByRole('img', {name:'close'});
        fireEvent.click(closeIcon);
    })

    it('search button', () => {
        customRender(<TaxChargesCategory />);

        const categoryCode = screen.getByRole('textbox', {name:'Tax & Charges Category Code'});
        fireEvent.change(categoryCode, {target:{value:'test'}});

        const searchBtn = screen.getByRole('button', {name:'search'});
        fireEvent.click(searchBtn);
    });

    it('close-circle img', () => {
        customRender(<TaxChargesCategory />);

        const categoryCode = screen.getByRole('textbox', {name:'Tax & Charges Category Code'});
        fireEvent.change(categoryCode, {target:{value:'test'}});

        const coloseCircle = screen.getByRole('img', {name:'close-circle'});
        fireEvent.click(coloseCircle);
    });

    it("TaxChargesCode pass data", ()=>{
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                FinancialAccounting: {
                    TaxChargesCode: { isLoaded: false, isLoading: false, data: [{taxCategoryCode: 'T002', taxCategoryDescription: 'GST', status: true, id: '123'}] },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <TaxChargesCategory fetchTaxChargeCategoryType={fetchTaxChargeCategoryType}/>
            </Provider>
        );
    })

    it("TaxChargesCategory pass data", ()=>{
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                FinancialAccounting: {
                    TaxChargesCategory: { isLoaded: false, isLoading: false, data: [{taxCode: 'T002'}] },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <TaxChargesCategory fetchTaxChargeCategoryType={fetchTaxChargeCategoryType}/>
            </Provider>
        )
    })
});
