/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { GstIRNTransaction } from 'components/FinancialAccounting/GstIRNTransaction/GstIRNTransactionMaster';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

afterEach(() => {
    jest.restoreAllMocks();
});

describe("GstIRNTransaction component",()=>{

    it("onAdvanceSearchCloseAction", ()=>{
        customRender(<GstIRNTransaction />);

        const advancedBtn = screen.getByRole('button', {name:'Advanced Filters'});
        fireEvent.click(advancedBtn);

        const closeImg = screen.getByRole('img', {name:'close'});
        fireEvent.click(closeImg)
    })

    it("resetBtn", ()=>{
        customRender(<GstIRNTransaction />);

        const advancedBtn = screen.getByRole('button', {name:'Advanced Filters'});
        fireEvent.click(advancedBtn);

        const resetBtn = screen.getByRole('button', {name:'Reset'});
        fireEvent.click(resetBtn)
    })

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
                <GstIRNTransaction advanceFilter={true} extraParams={extraParams} />
            </Provider>
        );

        const selectParameter = screen.getAllByRole('combobox', { name: '',});
        act(async () => {
            fireEvent.change(selectParameter[1], { target: { value: 'Document Number' } });
            const parameter = screen.getByText('Document Number');
            fireEvent.click(parameter);
        });

        const searchTextBox = screen.getByRole('textbox', {name:''});
        fireEvent.change(searchTextBox, {target:{value:'INV22C000617'}});
        expect(searchTextBox.value).toBe('INV22C000617');

        const searchImg = screen.getByRole('img', {name:'search'});
        fireEvent.click(searchImg);

        const clearBtn = screen.getByRole('button', {name:'Clear'});
        fireEvent.click(clearBtn);
    })
})

