/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TaxChargesCategory } from '@components/FinancialAccounting/AccountTaxCharges/TaxAndChargesCategory/TaxChargesCategory';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('TaxChargesCategory component', () => {

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
                <TaxChargesCategory advanceFilter={false} filterString={filterString} tableData={tableData} formActionType={formActionType} buttonData={buttonData} />
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
                <TaxChargesCategory advanceFilter={false} filterString={filterString} tableData={tableData} formActionType={formActionType} buttonData={buttonData} />
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
                <TaxChargesCategory />
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
                <TaxChargesCategory />
            </Provider>
        )
    })
});
