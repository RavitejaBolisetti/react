
/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CreditDebitNoteMaster } from '@components/FinancialAccounting/CreditDebitNote/CreditDebitNoteMaster';
import { Provider } from 'react-redux';
import customRender from '@utils/test-utils';
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


jest.mock('store/actions/data/financialAccounting/creditDebitNoteSearch', ()=>({
    creditDebitNoteSearchDataAction:{}
}));

const fetchList = jest.fn();
const fetchDetail = jest.fn();
const setFilterString = jest.fn();

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render components',() => {
    const tableData = [{customerName: null, id: "123", paidAmount: 0, partyCode: "CK01", partySegment: "PRINCIPAL", partyType: "PRI",status: true, voucherDate: "2023", voucherNumber: "VCR24E000037", voucherType: "CRN"}];

    it("onSuccessAction, onErrorAction", async()=>{
        const extraParams = [{canRemove: true, filter: true, key: "searchParam", name: "VCR24E000037", title: "Value", value: "VCR24E000037"}];

        const mockStore = createMockStore({
            auth: { userId: 123 },
        });

        customRender(
            <Provider store={mockStore}>
                <CreditDebitNoteMaster isVisible={true} extraParams={extraParams} fetchList={fetchList} setFilterString={setFilterString} />
            </Provider>
        );

        fetchList.mock.lastCall[0].onErrorAction();
        fetchList.mock.lastCall[0].onSuccessAction();
    })

    it('should render components', () => {
        customRender(<CreditDebitNoteMaster setFilterString={setFilterString} />);

        const textbox = screen.getByRole('textbox', {name:'Search Credit/Debit'});
        fireEvent.change(textbox,{target:{value:'test'}});

        // const searchImg = screen.getByRole('img', {name:'search'});
        // fireEvent.click(searchImg)
    });

    it('Credit button, close', () => {
        customRender(<CreditDebitNoteMaster onCloseAction={jest.fn()} setFilterString={setFilterString} />);

        const creditBtn = screen.getByRole('button', {name:'Add Credit Note'});
        fireEvent.click(creditBtn);

        const closeImg = screen.getByRole('img', {name:'close'});
        fireEvent.click(closeImg);
    });

    it('Debit button', () => {
        customRender(<CreditDebitNoteMaster buttonData={{printBtn:true}} setFilterString={setFilterString} />);

        const debitBtn = screen.getByTestId('add_debit_btn');
        fireEvent.click(debitBtn);

        const plusImg = screen.getAllByRole('img', {name:'plus'});
        fireEvent.click(plusImg[1]);

        // const searchBtn = screen.getAllByRole('img', {name:'search'});
        // fireEvent.click(searchBtn[1]);

        const saveBtn = screen.getByTestId('save_next_btn');
        fireEvent.click(saveBtn);
    });

    it('Advance Filters, closeImg', () => {
        customRender(<CreditDebitNoteMaster setFilterString={setFilterString} />);

        const advancedBtn = screen.getByRole('button', {name:'Advance Filters'});
        fireEvent.click(advancedBtn);

        const closeImg = screen.getByRole('img', {name:'close'});
        fireEvent.click(closeImg);
    });

    it('Advance Filters, Search', () => {
        customRender(<CreditDebitNoteMaster setFilterString={setFilterString} />);

        const advancedBtn = screen.getByRole('button', {name:'Advance Filters'});
        fireEvent.click(advancedBtn);

        const searchBtn = screen.getByRole('button', {name:'Search'});
        fireEvent.click(searchBtn);
    });

    it("clearBtn", ()=>{
        const filterString = {advanceFilter:true }
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                FinancialAccounting: {
                    CreditDebitNoteSearch: { isLoaded: false, data: tableData, filter: filterString},
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <CreditDebitNoteMaster fetchList={fetchList} isVisible={true} fetchDetail={fetchDetail} setFilterString={setFilterString} />
            </Provider>
        );
    })

    it("creditDebitData",()=>{
        const creditDebitData = [{voucherNumber:'123', voucherType:'CRN'}];
        const formActionType = {addMode:true}
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                FinancialAccounting: {
                    CreditDebitNoteSearch: { isDetailLoaded: true, detailData: creditDebitData},
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <CreditDebitNoteMaster isVisible={true} formActionType={formActionType} fetchList={fetchList} setFilterString={setFilterString} />
            </Provider>
        );
    })
});
