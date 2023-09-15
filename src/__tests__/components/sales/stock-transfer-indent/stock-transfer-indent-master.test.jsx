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

    it("Indent Raised Button", ()=>{
        customRender(<StockTransferIndentMaster settoggleButton={jest.fn()} />);

        const raisedBtn = screen.getByRole('button', {name:'Indent Raised'});
        fireEvent.click(raisedBtn);
    });


    it("Indent Received", ()=>{
        customRender(<StockTransferIndentMaster settoggleButton={jest.fn()} />);

        const idendtBtn = screen.getByRole('button', {name:'Indent Received'});
        fireEvent.click(idendtBtn);
    });


    it("Advanced Filters Button", ()=>{
        customRender(<StockTransferIndentMaster setAdvanceSearchVisible={jest.fn()} />);

        const advancedBtn = screen.getByRole('button', {name:'Advanced Filters'});
        fireEvent.click(advancedBtn);
    });

    it("Close Button", ()=>{
        customRender(<StockTransferIndentMaster setAdvanceSearchVisible={jest.fn()} />);

        const advancedBtn = screen.getByRole('button', {name:'Advanced Filters'});
        fireEvent.click(advancedBtn);

        const closedBtn = screen.getByRole('button', {name:'Close'});
        fireEvent.click(closedBtn);
    });

    it("Reset Button", ()=>{
        customRender(<StockTransferIndentMaster setAdvanceSearchVisible={jest.fn()} />);

        const advancedBtn = screen.getByRole('button', {name:'Advanced Filters'});
        fireEvent.click(advancedBtn);

        const resetBtn = screen.getByRole('button', {name:'Reset'});
        fireEvent.click(resetBtn);
    });

    it("Apply Button", ()=>{
        customRender(<StockTransferIndentMaster setAdvanceSearchVisible={jest.fn()} />);

        const advancedBtn = screen.getByRole('button', {name:'Advanced Filters'});
        fireEvent.click(advancedBtn);

        const applyBtn = screen.getByRole('button', {name:'Apply'});
        fireEvent.click(applyBtn);
    });

    it("Add Indent Button", ()=>{
        customRender(<StockTransferIndentMaster handleOnAddIndentClick={jest.fn()} />);

        const indentBtn = screen.getByRole('button', {name:'Add Indent'});
        fireEvent.click(indentBtn);
    });
})