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

jest.mock('components/FinancialAccounting/CreditDebitNote/CreditDebitFormButton', () => {
    const CreditDebitNoteFormButton = ({ onFinish }) => {
        // const values = {partyDetails:{partyId: "4", partyName: "United India Insurance Company Limited", partySegment: "MIT"}};
        return(
            <div><button onClick={onFinish}>Save</button></div>
        )
    };
    return {
        __esModule: true,
        CreditDebitNoteFormButton
    };
})

const FormWrapper = (props) =>{
   const [form] = Form.useForm();
    const myMock = {
        ...form,
        resetFields:jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ partyDetails:{partyId: "4", partySegment: "MIT"} }]),
    }
    return <VoucherAndPartyDetailsMaster form={myMock} {...props}/>
}

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/vehicle/customerCommonDetails', ()=>({
    vehicleCustomerCommonDetailsDataAction:{}
}));

jest.mock('store/actions/data/partyMaster', ()=>({
    partyMasterDataActions:{}
}));

const fetchDetail = jest.fn();
const fetchList = jest.fn();
const listShowLoading = jest.fn();
const listPartyShowLoading = jest.fn();

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

    it('close-circle', ()=>{
        customRender(
            <FormWrapper  typeData={typeData}  fetchDetail={fetchDetail} setButtonData={jest.fn()} fetchList={fetchList} listPartyShowLoading={listPartyShowLoading} listShowLoading={listShowLoading} />
        );

        const plusImg = screen.getAllByRole('img', {name:'plus'});
        fireEvent.click(plusImg[1]);

        const partyId = screen.getByRole("textbox", {name:'Party Id'});
        fireEvent.change(partyId, {target:{value:'4'}});

        const closeImg = screen.getByRole('img', {name:'close-circle'});
        fireEvent.click(closeImg);
    })

    it('empty value in Party ID', ()=>{
        customRender(
            <FormWrapper  typeData={typeData}  fetchDetail={fetchDetail} setButtonData={jest.fn()} fetchList={fetchList} listPartyShowLoading={listPartyShowLoading} listShowLoading={listShowLoading} />
        );

        const plusImg = screen.getAllByRole('img', {name:'plus'});
        fireEvent.click(plusImg[1]);

        const searchBtn = screen.getByRole('img', {name:'search'});
        fireEvent.click(searchBtn);
    })

    it('Party Segment and Party ID value present', ()=>{

        customRender(
            <FormWrapper  typeData={typeData}  fetchDetail={fetchDetail} setButtonData={jest.fn()} fetchList={fetchList} listPartyShowLoading={listPartyShowLoading} listShowLoading={listShowLoading} />
        );

        const plusImg = screen.getAllByRole('img', {name:'plus'});
        fireEvent.click(plusImg[1]);

        const partySeg = screen.getByRole('combobox', {name:'Party Segment'});
        fireEvent.change(partySeg, {target:{value:'MIT'}});

        const partyId = screen.getByRole("textbox", {name:'Party Id'});
        fireEvent.change(partyId, {target:{value:'4'}});

        const searchBtn = screen.getByRole('img', {name:'search'});
        fireEvent.click(searchBtn);
    })

    it('save & next btn', ()=>{
        const buttonData = {
            saveBtn:true,
            saveAndNewBtn:true,
            cancelBtn:true
        }

        customRender(<FormWrapper buttonData={buttonData} />);

        const saveAndNextBtn = screen.getByRole('button', {name:'Save'});
        fireEvent.click(saveAndNextBtn);


    })

});
