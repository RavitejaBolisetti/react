/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { StockTransferIndentMaster } from '@components/Sales/StockTransferIndent/StockTransferIndentMaster';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

describe("StockTransferIndentMaster component", ()=>{
    it('Clear Button', ()=>{
        const mockStore = createMockStore({
            auth: { userId:123 },
            data: {
                stockTransferIndentData: {
                    stockTransferIndent: { isLoading: false, filter: { advanceFilter: true, current: 1, pageSize: undefined,searchParam:"STR1694606620526"} },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <StockTransferIndentMaster  />
            </Provider>
        );

        const searchIndentTextbox = screen.getByRole('textbox', {name:''});
        fireEvent.change(searchIndentTextbox, {target:{value:'STR1694606620526'}});
        expect(searchIndentTextbox.value).toBe('STR1694606620526')

        const searchImg = screen.getByRole('img', {name:'search'});
        fireEvent.click(searchImg);

        const clearBtn = screen.getByRole('button', {name:'Clear'});
        fireEvent.click(clearBtn)
    })

    it('Remove Filter', ()=>{
        const extraParams = [{
            canRemove: true, filter: true, key: "indentNo", name: "STR1694606620526", title: "Value", value: "STR1694606620526"}]
            const mockStore = createMockStore({
                auth: { userId:123 },
                data: {
                    stockTransferIndentData: {
                        stockTransferIndent: { isLoading: false, filter: { advanceFilter: true, current: 1, pageSize: undefined, searchParam:"STR1694606620526"} },
                        IndentIssue: { isLoaded: false, isLoading: false, data: [] },
                    },
                },
            });

        customRender(
            <Provider store={mockStore}>
                <StockTransferIndentMaster  extraParams={extraParams} advanceFilter={true}/>
            </Provider>
        );

        const searchIndentTextbox = screen.getByRole('textbox', {name:''});
        fireEvent.change(searchIndentTextbox, {target:{value:'STR1694606620526'}});
        expect(searchIndentTextbox.value).toBe('STR1694606620526')

        const searchImg = screen.getByRole('img', {name:'search'});
        fireEvent.click(searchImg);

        const removeBtn = screen.getByTestId('removeBtn');
        fireEvent.click(removeBtn)
    })

    it("Close Button", ()=>{
        customRender(<StockTransferIndentMaster setAdvanceSearchVisible={jest.fn()} />);

        const advancedBtn = screen.getByRole('button', {name:'Advanced Filters'});
        fireEvent.click(advancedBtn);

        const closedBtn = screen.getByRole('button', {name:'Close'});
        fireEvent.click(closedBtn);
    });

    it("Apply Button", ()=>{
        customRender(<StockTransferIndentMaster setAdvanceSearchVisible={jest.fn()} />);

        const advancedBtn = screen.getByRole('button', {name:'Advanced Filters'});
        fireEvent.click(advancedBtn);

        const applyBtn = screen.getByRole('button', {name:'Apply'});
        fireEvent.click(applyBtn);
    });

    it("Reset Button", ()=>{
        customRender(<StockTransferIndentMaster handleResetFilter={jest.fn()} />);

        const advancedBtn = screen.getByRole('button', {name:'Advanced Filters'});
        fireEvent.click(advancedBtn);

        const resetBtn = screen.getByRole('button', {name:'Reset'});
        fireEvent.click(resetBtn);
    });

    it("Add Indent Button", ()=>{
        customRender(<StockTransferIndentMaster handleOnAddIndentClick={jest.fn()} />);

        const indentBtn = screen.getByRole('button', {name:'Add Indent'});
        fireEvent.click(indentBtn);
    });

    it("Indent Received Button", ()=>{
        customRender(<StockTransferIndentMaster onCloseAction={jest.fn()} />);

        const indentRecBtn = screen.getByRole('button', {name:'Indent Received'});
        fireEvent.click(indentRecBtn);
    });

    it("plusImg", ()=>{
        customRender(<StockTransferIndentMaster handleCollapse={jest.fn()} />);

        const indentBtn = screen.getByRole('button', {name:'Add Indent'});
        fireEvent.click(indentBtn);

        const plusImg= screen.getByRole('img', {name:'plus'});
        fireEvent.click(plusImg);
    });
})