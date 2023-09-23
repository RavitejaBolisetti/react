/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { StockTransferIndentMaster } from '@components/Sales/StockTransferIndent/StockTransferIndentMaster';
import customRender from '@utils/test-utils';

describe("StockTransferIndentMaster component", ()=>{

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

        // screen.getByRole('');
        // screen.debug();

    });

    // it("Submit Button", ()=>{
    //     customRender(<StockTransferIndentMaster handleOnAddIndentClick={jest.fn()} />);

    //     const indentBtn = screen.getByRole('button', {name:'Add Indent'});
    //     fireEvent.click(indentBtn);

    //     const submitBtn = screen.getByRole('button', {name:'Submit'});
    //     fireEvent.submit(submitBtn);
    // });

    // it("Add Button", ()=>{
    //     customRender(<StockTransferIndentMaster handleAddVehicleDetails={jest.fn()} />);

    //     const indentBtn = screen.getByRole('button', {name:'Add Indent'});
    //     fireEvent.click(indentBtn);

    //     const addBtn = screen.getByRole('button', {name:'Add'});
    //     fireEvent.click(addBtn);
    // });

    // it("closeImg", ()=>{
    //     customRender(<StockTransferIndentMaster handleOnAddIndentClick={jest.fn()} />);

    //     const indentBtn = screen.getByRole('button', {name:'Add Indent'});
    //     fireEvent.click(indentBtn);

    //     const closeImg = screen.getByRole('img', {name:'close'});
    //     fireEvent.click(closeImg);
    // });

    it("plusImg", ()=>{
        customRender(<StockTransferIndentMaster handleCollapse={jest.fn()} />);

        const indentBtn = screen.getByRole('button', {name:'Add Indent'});
        fireEvent.click(indentBtn);

        const plusImg= screen.getByRole('img', {name:'plus'});
        fireEvent.click(plusImg);
    });

    it('advanceFilterProps', ()=>{
        const props = {
            advanceFilter:true,
            otfFilter:true,
            settoggleButton:jest.fn()
        }
        customRender(<StockTransferIndentMaster {...props} />)
    })
})