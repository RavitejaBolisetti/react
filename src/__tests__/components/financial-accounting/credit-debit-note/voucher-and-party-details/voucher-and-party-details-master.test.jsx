/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { VoucherAndPartyDetailsMaster } from '@components/FinancialAccounting/CreditDebitNote/VoucherAndPartyDetails/index';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

const FormWrapper = (props) =>{
   const [form] = Form.useForm();
    const myMock = {
        ...form,
        resetFields:jest.fn(),
    }
    return <VoucherAndPartyDetailsMaster form={myMock} {...props}/>
}

afterEach(() => {
    jest.restoreAllMocks();
});

describe('VoucherAndPartyDetailsMaster component', () => {
    const typeData = [{
        PARAM_MASTER:{
            PARTY_CATEG:{
                id:'123'
            }}
    }]
    it('render plus image1', () => {
        customRender(<VoucherAndPartyDetailsMaster typeData={typeData}/>);

        const plusImg1 = screen.getAllByRole('img', {name:'plus'});
        fireEvent.click(plusImg1[0]);
    });

    it('render plus image2', () => {
        customRender(<VoucherAndPartyDetailsMaster typeData={typeData}/>);

        const plusImg = screen.getAllByRole('img', {name:'plus'});
        fireEvent.click(plusImg[1]);
    });

    it('isDetailLoaded=true', ()=>{
        const formActionType = {addMode:true};

        customRender(<FormWrapper formActionType={formActionType} isDetailLoaded={true}/>)
    })

    it('creditDebitData', ()=>{

        customRender(<FormWrapper creditDebitData={{voucherDetailsDto:'test'}} isDetailLoaded={true} handleFormValueChange={jest.fn()} />)
    })

    const formProps = {
        formData:{partyDetailsDto:'test'},
    }

    it('formProps, Party ID', ()=>{
        const formActionType = {addMode: true, editMode: false, viewMode: false};

        customRender(<FormWrapper {...formProps}  typeData={typeData} formActionType={formActionType} onSuccessAction={jest.fn()} onSuccessCustomerAction={jest.fn()} handlePartyIdChange={jest.fn()} handleSearchParamSearch={jest.fn()} />);

        const plusImg = screen.getAllByRole('img', {name:'plus'});
        fireEvent.click(plusImg[1]);

        const partyId = screen.getByRole('textbox', {name:'Party ID'});
        fireEvent.change(partyId, {target:{name:'test'}});

        const searchBtn = screen.getByRole('img', {name:'search'});
        fireEvent.click(searchBtn);
    })

    it('formProps, Party Segment', ()=>{
        const formActionType={addMode:false, editMode:true};

        customRender(<FormWrapper {...formProps} typeData={typeData} formActionType={formActionType} handlePartySegmentChange={jest.fn()} />);

        const plusImg = screen.getAllByRole('img', {name:'plus'});
        fireEvent.click(plusImg[1]);

        const partySeg = screen.getByRole('combobox', {name:'Party Segment'});
        fireEvent.change(partySeg, {target:{value:'test1'}});
    })


});
