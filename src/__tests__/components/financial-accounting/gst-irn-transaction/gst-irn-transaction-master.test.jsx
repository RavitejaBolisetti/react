/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { GstIRNTransaction } from 'components/FinancialAccounting/GstIRNTransaction/GstIRNTransactionMaster';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';

const createMockStore = (initialState) => {
    const mockStore = configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: [thunk],
    });

    return mockStore;
};

jest.mock('store/actions/data/financialAccounting/gstIRNTransactionPending/gstIRNTransaction', ()=>({
    gstIRNTransactionActions:{}
}));

const fetchList = jest.fn();
const fetchGSTINList = jest.fn();
const saveData = jest.fn();

afterEach(() => {
    jest.restoreAllMocks();
});

describe("GstIRNTransaction component",()=>{

    it("success and error alert", async()=>{
        const mockStore = createMockStore({
            auth: { userId:123 },
            data: {
                FinancialAccounting: {
                    GstIRNTransaction: { isLoading: false, data:{pageNumber:'1', pageSize:'10', totalRecords:'1', 
                    paginationData:[{invoiceDocumentNumber: "test"}]}, },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <GstIRNTransaction fetchList={fetchList} fetchGSTINList={fetchGSTINList} viewDocument={jest.fn()} 
                uploadDocument={jest.fn()} setFilterString={jest.fn()} saveData={saveData}/>
            </Provider>
        )

        fetchGSTINList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => { expect(screen.getByText(/test/i)).toBeInTheDocument() });
        const uploadBtn=screen.getByTestId('upload');
        fireEvent.click(uploadBtn);

        fetchList.mock.calls[0][0].onErrorAction();

        saveData.mock.lastCall[0].onError();
        saveData.mock.lastCall[0].onSuccess();
    });

    it("onAdvanceSearchCloseAction", ()=>{
        customRender(<GstIRNTransaction setFilterString={jest.fn()} />);

        const advancedBtn = screen.getByRole('button', {name:'Advance Filters'});
        fireEvent.click(advancedBtn);

        const closeImg = screen.getByRole('img', {name:'close'});
        fireEvent.click(closeImg)
    });

    it("resetBtn", ()=>{
        customRender(<GstIRNTransaction setFilterString={jest.fn()}/>);

        const advancedBtn = screen.getByRole('button', {name:'Advance Filters'});
        fireEvent.click(advancedBtn);

        const resetBtn = screen.getByRole('button', {name:'Reset'});
        fireEvent.click(resetBtn)
    });

    it("applyBtn", ()=>{
        customRender(<GstIRNTransaction setFilterString={jest.fn()}/>);

        const advancedBtn = screen.getByRole('button', {name:'Advance Filters'});
        fireEvent.click(advancedBtn);

        const applyBtn = screen.getByRole('button', {name:'Apply'});
        fireEvent.click(applyBtn)
    });

    it("clearBtn",()=>{
        const extraParams = [{ name: "INV22C000617" }];
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                FinancialAccounting: {
                    GstIRNTransaction: { isLoading: false, 
                        data:{pageNumber:'1', pageSize:'10', totalRecords:'1', paginationData:[{
                        id: "416", invoiceDocumentDate: "22022-01-3", invoiceDocumentNumber: "INV22C000617", invoiceDocumentType: "CI",irnStatus: null, location: "NB03"}]},

                        filter: {advanceFilter: true, current: 1, pageSize: undefined, searchParam: "INV22C000617", searchType:"invoiceId" }, 
                    },
                },
            },
        })
        customRender(
            <Provider store={mockStore}>
                <GstIRNTransaction advanceFilter={true} extraParams={extraParams} fetchList={fetchList} fetchGSTINList={fetchGSTINList} setFilterString={jest.fn()} />
            </Provider>
        );

        const selectParameter = screen.getAllByRole('combobox', { name: '',});
        // act(async () => {
            fireEvent.change(selectParameter[1], { target: { value: 'Document Number' } });
            const parameter = screen.getByText('Document Number');
            fireEvent.click(parameter);
        // });

        const searchTextBox = screen.getByRole('textbox', {name:''});
        fireEvent.change(searchTextBox, {target:{value:'INV22C000617'}});
        expect(searchTextBox.value).toBe('INV22C000617');

        const searchImg = screen.getByRole('img', {name:'search'});
        fireEvent.click(searchImg);

        const clearBtn = screen.getByRole('button', {name:'Clear'});
        fireEvent.click(clearBtn);
    });

})

