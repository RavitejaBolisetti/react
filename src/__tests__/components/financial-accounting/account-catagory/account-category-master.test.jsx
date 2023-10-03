/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AccountCategory } from '@components/FinancialAccounting/AccountCategory/AccountCategoryMaster';
import customRender from '@utils/test-utils';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';

const accountCategoryData = {totalRecords:'89',paginationData:[{accountCategoryCode: 'A001', accountCategoryDescription: 'Parts Account', status: true}]};

export const createMockStore = (initialState) => {
    const mockStore = configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: [thunk],
    });

    return mockStore;
};

afterEach(() => {
    jest.restoreAllMocks();
});

describe('AccountCategory components', () => {

    it('should render search input',()=>{
        customRender(<AccountCategory setPage={jest.fn()} setFilterString={jest.fn()} handleClearInSearch={jest.fn()} />);

        const inputText = screen.getByRole('textbox', {name:'Account Category Code'});
        fireEvent.change(inputText, { target:{value:'test'} });

        const searchImg = screen.getByRole('img', {name:'search'});
        fireEvent.click(searchImg);
    })

    it('should render close-circle',()=>{
        customRender(<AccountCategory  handleClearInSearch={jest.fn()} setFilterString={jest.fn()} setShowDataLoading={jest.fn()} />);

        const inputTextCode = screen.getByRole('textbox', {name:'Account Category Code'});
        fireEvent.change(inputTextCode, { target:{value:'testCategoryCode'} });

        const closeCircle = screen.getByRole('img', {name:'close-circle'});
        fireEvent.click(closeCircle);
    });

    it("Cancel button", ()=>{
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                FinancialAccounting: {
                    AccountCategory: { isLoading:false, data:accountCategoryData },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <AccountCategory />
            </Provider>
        )
    
        const plusAdd = screen.getByRole('button', {name:'plus Add'});
        fireEvent.click(plusAdd)

        const cancelBtn = screen.getByRole('button', {name:'Cancel'});
        fireEvent.click(cancelBtn);
    });

    it("view and edit icon", async()=>{
        const tableColumn  = jest.fn()
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                FinancialAccounting: {
                    AccountCategory: { isLoading:false, data:[{accountCategoryCode: "CPA12",accountCategoryDescription:"Central GST 6%",status: true}] },
                },
            },
        });
        customRender(
            <Provider store={mockStore} >
                <AccountCategory totalRecords={100} buttonAction={'add'} tableColumn={tableColumn} canEdit={true} canView={true} />
            </Provider>
        );
    })
    
});

