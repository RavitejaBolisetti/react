/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import  CardDocTypeAcMapping  from '@components/FinancialAccounting/AccountTaxCharges/DocumentTypeOtherCharges/DocTypeAcHeadMapping/CardDocTypeAcMapping';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import React from 'react';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) =>{
    const [formEdit] = Form.useForm();
    const myMoock = {
        ...formEdit,
        validateFields:jest.fn(),
        getFieldsValue:jest.fn(),
        resetFields:jest.fn(),
    }
    return <CardDocTypeAcMapping formEdit={myMoock} {...props} />
}

const EditFormWrapper = (props) =>{
    const [editForm] = Form.useForm();
    const myMoock = {
        ...editForm,
        setFieldsValue:jest.fn(),
    }
    return <CardDocTypeAcMapping editForm={myMoock} {...props} />
}

const DeleteFormWrapper = (props) =>{
    const [docTypeHeadMappingForm] = Form.useForm();
    const myMoock = {
        ...docTypeHeadMappingForm,
        resetFields:jest.fn(),
    }
    return <CardDocTypeAcMapping docTypeHeadMappingForm={myMoock} {...props} />
}

describe("CardDocTypeAcMapping component",()=>{
    const cardProps = {
        buttonData: {cancelBtn: true, formBtnActive: false, editBtn: false, saveBtn: true, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false},
        disableSaveButton: false,
        formActionType: {addMode: false, editMode: true, viewMode: false},
        viewMode:false,
        isVisible:true,
    }

    it("typeData", ()=>{
        const typeData = [{key:"CASH"}];
        const financialAccHeadData = [{id:'123'}]
        const props = {chargeCode:"CASH", financialAccountHeadId:"123"};

        customRender(<CardDocTypeAcMapping isVisible={true} typeData={typeData} props={props} financialAccHeadData={financialAccHeadData} />);
    })

    it('deletBtn', ()=>{
        const setDocTypeHeadMappingList = jest.fn();
        jest.spyOn(React, 'useState').mockReturnValue([null, setDocTypeHeadMappingList]);

        render(<DeleteFormWrapper {...cardProps} formEdit={false} setDocTypeHeadMappingList={setDocTypeHeadMappingList} setFormEdit={jest.fn()} forceUpdate={jest.fn()} />);

        const editBtn = screen.getAllByRole('button', {name:""});
        fireEvent.click(editBtn[1]);

        expect(setDocTypeHeadMappingList).toHaveBeenCalledWith(expect.any(Function));
        const setDocTypeHeadMappingListFunction = setDocTypeHeadMappingList.mock.calls[0][0];
        const prev = [{ internalId: '12345' }];
        setDocTypeHeadMappingListFunction(prev);
    });

    it('Cancel Button', () => {
        const uniqueCardEdit = '1234';
        const internalId = '1234';
        
        customRender(<CardDocTypeAcMapping formEdit={true} internalId={internalId} uniqueCardEdit={uniqueCardEdit} setButtonData={jest.fn()} {...cardProps} setFormEdit={jest.fn()} setDropdownItems={jest.fn()} onDocTypeHeadMappingCancel={jest.fn()} />);

        const cancelBtn = screen.getByRole('button', {name:'Cancel'});
        fireEvent.click(cancelBtn);
    });

    it('Save Button', () => {
        const docTypeHeadMappingList=[{
            chargeCode : '123',
            financialAccountHeadId : '45',
            financialAccountHeadDesc : 'desc',
            chargeCodeDesc : 'hello',
            financialAccountHeadCode : 'test',
        }]
        const uniqueCardEdit = '1234';
        const internalId = '1234';
        
        customRender(<CardDocTypeAcMapping formEdit={true} internalId={internalId} uniqueCardEdit={uniqueCardEdit} setButtonData={jest.fn()} {...cardProps} setFormEdit={jest.fn()} setDropdownItems={jest.fn()} docTypeHeadMappingList={docTypeHeadMappingList} setDocTypeHeadMappingList={jest.fn()} forceUpdate={jest.fn()} />);

        const cancelBtn = screen.getByRole('button', {name:'Save'});
        fireEvent.click(cancelBtn);
    });

    it('edit button', ()=>{
        customRender(<EditFormWrapper  {...cardProps}  setFormEdit={jest.fn()} setButtonData={jest.fn()} setSelectedTreeSelectKey={jest.fn()} accDocMapEdit={jest.fn()} setuniqueCardEdit={jest.fn()}/>);

        const editBtn = screen.getAllByRole('button', {name:""});
        fireEvent.click(editBtn[0]);
    });

    it('plus Add button', ()=>{
        customRender(<FormWrapper {...cardProps} setButtonData={jest.fn()}/>);
        
        const plusAdd = screen.getByRole('button', {name:"plus Add"});
        fireEvent.click(plusAdd);
    });

    it('plus image', ()=>{
        customRender(<FormWrapper {...cardProps} setButtonData={jest.fn()}/>);
        
        const plusImg = screen.getByRole('img', {name:"plus"});
        fireEvent.click(plusImg);
    });
})