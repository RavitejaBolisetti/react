/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import  CardAccountAndDocumentMapping  from '@components/FinancialAccounting/AccountCategory/AccountAndDocumentMapping/CardAccountAndDocumentMapping';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});
const FormWrapper = (props) =>{
    const [accDocMapForm] = Form.useForm();
    const myMoock = {
        ...accDocMapForm,
        validateFields:jest.fn(),
        getFieldsValue:jest.fn(),
        resetFields:jest.fn(),
    }
    return <CardAccountAndDocumentMapping accDocMapForm={myMoock} {...props} />
}

const EditFormWrapper = (props) =>{
    const [editForm] = Form.useForm();
    const myMoock = {
        ...editForm,
        setFieldsValue:jest.fn(),
        getFieldsValue:jest.fn()
    }
    return <CardAccountAndDocumentMapping editForm={myMoock} {...props} />
}

describe('Render CardAccountAndDocumentMapping component', () => {
    const cardProps = {
        buttonData: {cancelBtn: true, formBtnActive: false, editBtn: false, saveBtn: true, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false},
        disableSaveButton: false,
        formActionType: {addMode: false, editMode: true, viewMode: false},
        viewMode:false,
        isVisible:true,
    }

    const accountDocumentMaps = [{
        internalId : '123',
        applicationId : "test",
        documentTypeCode : "test",
        financialAccountHeadCode : "test", 
        applicationName : "test", 
        documentDescription : "test", 
        financialAccountHead : "test", 
    }]

    it('Cancel Button', () => {
        const uniqueCardEdit = '1234';
        const internalId = '1234';
        customRender(<CardAccountAndDocumentMapping formEdit={true} internalId={internalId} uniqueCardEdit={uniqueCardEdit} setButtonData={jest.fn()} {...cardProps} setFormEdit={jest.fn()} setDropdownItems={jest.fn()} />);

        const cancelBtn = screen.getByRole('button', {name:'Cancel'});
        fireEvent.click(cancelBtn);
    })

    it('Save Button', () => {
        const uniqueCardEdit = '1234';
        const internalId = '1234';

        customRender(<EditFormWrapper formEdit={true} internalId={internalId} accountDocumentMaps={accountDocumentMaps} uniqueCardEdit={uniqueCardEdit} setButtonData={jest.fn()} {...cardProps} setFormEdit={jest.fn()} setDropdownItems={jest.fn()} onAccountDocumentMapsSave={jest.fn()} setAccountDocumentMaps={jest.fn()}/>)

        const saveBtn = screen.getByRole('button', {name:'Save'});
        fireEvent.click(saveBtn);
    })

    it('edit button', ()=>{
        customRender(<EditFormWrapper  {...cardProps} accountDocumentMaps={accountDocumentMaps} setFormEdit={jest.fn()} setButtonData={jest.fn()} setSelectedTreeSelectKey={jest.fn()} accDocMapEdit={jest.fn()} setuniqueCardEdit={jest.fn()}/>);

        const editBtn = screen.getAllByRole('button', {name:""});
        fireEvent.click(editBtn[0]);
    })

    it('delete button', ()=>{
        customRender(<FormWrapper {...cardProps} accountDocumentMaps={accountDocumentMaps} onAccAndMapDelete={jest.fn()} setAccountDocumentMaps={jest.fn()} setFormEdit={jest.fn(false)} forceUpdate={jest.fn()}/>);
        
        const deletBtn = screen.getAllByRole('button', {name:""});
        fireEvent.click(deletBtn[1]);
    })

});
