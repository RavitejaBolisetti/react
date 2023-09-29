/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { PartyDetailsForm } from '@components/FinancialAccounting/CreditDebitNote/VoucherAndPartyDetails/PartyDetailsForm';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myMock = {
        ...form,
        setFieldsValue:jest.fn(),
        getFieldsValue:jest.fn()
    }
    return <PartyDetailsForm form={myMock} {...props} />
}

afterEach(() => {
    jest.restoreAllMocks();
});

describe('PartyDetailsForm components', () => {
    const typeData = [{
        PARAM_MASTER:{
            PARTY_CATEG:{
                id:'123'
            }
        }
    }];

    it('Party ID textbox, search img', () => {
        const formActionType = {addMode: true, editMode: false, viewMode: false};
        
        customRender(<FormWrapper typeData={typeData} handlePartyIdChange={jest.fn()} handleSearchParamSearch={jest.fn()} formActionType={formActionType} />);

        const partyId = screen.getByRole('textbox', {name:'Party ID'});
        fireEvent.change(partyId, {target:{name:'test'}});

        const searchBtn = screen.getByRole('img', {name:'search'});
        fireEvent.click(searchBtn);
    });

    it('Party Segment', ()=>{
        customRender(<FormWrapper typeData={typeData} handlePartySegmentChange={jest.fn()}  />);

        const partySeg = screen.getByRole('combobox', {name:'Party Segment'});
        fireEvent.change(partySeg, {target:{value:'test1'}});
    })
})