/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/FinancialAccounting/CreditDebitNote/VoucherAndPartyDetails/AddEditForm';
import customRender from '@utils/test-utils';

describe("AddEditForm Component", ()=>{
    it("Party ID", ()=>{
        const formActionType = {addMode: true, editMode: false, viewMode: false};

        customRender(<AddEditForm formActionType={formActionType} handlePartyIdChange={jest.fn()} handleSearchParamSearch={jest.fn()} typeData={['PARTY_CATEG']} handleCollapse={jest.fn()} />);

        const plusImg = screen.getAllByRole('img', {name:'plus'});
        fireEvent.click(plusImg[1]);

        const partyId = screen.getByRole('textbox', {name:'Party ID'});
        fireEvent.change(partyId, {target:{name:'test'}});

        const searchBtn = screen.getByRole('img', {name:'search'});
        fireEvent.click(searchBtn);
    })

    it('Party Segment', ()=>{
        const formActionType = {addMode: true, editMode: false, viewMode: false};

        customRender(<AddEditForm typeData={['PARTY_CATEG']} formActionType={formActionType} handlePartySegmentChange={jest.fn()} handleCollapse={jest.fn()} />);

        const plusImg = screen.getAllByRole('img', {name:'plus'});
        fireEvent.click(plusImg[1]);

        const partySeg = screen.getByRole('combobox', {name:'Party Segment'});
        fireEvent.change(partySeg, {target:{value:'test1'}});
    })
})