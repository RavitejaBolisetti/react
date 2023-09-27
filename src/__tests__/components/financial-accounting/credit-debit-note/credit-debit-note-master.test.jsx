
/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CreditDebitNoteMaster } from '@components/FinancialAccounting/CreditDebitNote/CreditDebitNoteMaster';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render components', () => {
    it('should render components', () => {
        customRender(<CreditDebitNoteMaster />);

        const textbox = screen.getByRole('textbox', {name:'Search Credit/Debit'});
        fireEvent.change(textbox,{target:{value:'test'}});

        const searchImg = screen.getByRole('img', {name:'search'});
        fireEvent.click(searchImg)
    });

    it('Credit button, close', () => {
        customRender(<CreditDebitNoteMaster onCloseAction={jest.fn()} />);

        const creditBtn = screen.getByRole('button', {name:'Add Credit Note'});
        fireEvent.click(creditBtn);

        const closeImg = screen.getByRole('img', {name:'close'});
        fireEvent.click(closeImg);
    });

    it('Debit button', () => {
        customRender(<CreditDebitNoteMaster />);

        const debitBtn = screen.getByRole('button', {name:'Add Debit Note'});
        fireEvent.click(debitBtn)
    });

    it('Advanced Filters, Search', () => {
        customRender(<CreditDebitNoteMaster />);

        const advancedBtn = screen.getByRole('button', {name:'Advanced Filters'});
        fireEvent.click(advancedBtn);

        const searchBtn = screen.getByRole('button', {name:'Search'});
        fireEvent.click(searchBtn);
    });

    const fetchList = jest.fn()
    const fetchDetail = jest.fn()
    const tableData = {
        customerName: null,
        id: "123",
        paidAmount: 0,
        partyCode: "CK01",
        partySegment: "PRINCIPAL",
        partyType: "PRI",
        status: true,
        voucherDate: "2023-08-30T04:01:57.000+00:00",
        voucherNumber: "VCR24E000037",
        voucherType: "CRN"
    }

    it("view and edit button",()=>{
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                FinancialAccounting: {
                    CreditDebitNoteSearch: { isLoaded: false, data: tableData },
                },
            },
        });
        
        customRender(
            <Provider store={mockStore}>
                <CreditDebitNoteMaster fetchList={fetchList} isVisible={true} fetchDetail={fetchDetail}/>
            </Provider>
        );
    })

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
                <CreditDebitNoteMaster fetchList={fetchList} isVisible={true} fetchDetail={fetchDetail}/>
            </Provider>
        );

        const clearBtn = screen.getByRole('button', {name:'Clear'});
        fireEvent.click(clearBtn);
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
                <CreditDebitNoteMaster fetchList={fetchList} isVisible={true} fetchDetail={fetchDetail} formActionType={formActionType} setVoucherTableData={jest.fn([])} setApportionTableData={jest.fn([])} />
            </Provider>
        );
    })
});
