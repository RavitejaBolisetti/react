/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AccountAndDocumentMappingMaster } from '@components/FinancialAccounting/AccountCategory/AccountAndDocumentMapping/AccountAndDocumentMappingMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

const FormWrapper = (props) =>{
    const [accDocMapForm] = Form.useForm();
    const myMoock = {
        ...accDocMapForm,
        validateFields:jest.fn(),
        getFieldsValue:jest.fn(),
        resetFields:jest.fn(),
    }
    return <AccountAndDocumentMappingMaster accDocMapForm={myMoock} {...props} />
}

const EditFormWrapper = (props) =>{
    const [editForm] = Form.useForm();
    const myMoock = {
        ...editForm,
        setFieldsValue:jest.fn(),
    }
    return <AccountAndDocumentMappingMaster editForm={myMoock} {...props} />
}

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render AccountAndDocumentMappingMaster component', () => {
    const formProductAttributeProps = {
        formActionType: {addMode: false, editMode: true, viewMode: false},
        isVisible: true,
        viewMode: false,
        disableSaveButton: false,
        buttonData: {cancelBtn: true, formBtnActive: false, editBtn: false, saveBtn: true, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false,},
    }

    const cardAttributeProps = {
        buttonData: {cancelBtn: true, formBtnActive: false, editBtn: false, saveBtn: true, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false}, //
        disableSaveButton: false, // 
        formActionType: {addMode: false, editMode: true, viewMode: false}, // 
        viewMode:false, // 
        isVisible:true, // 
        formEdit: false, // 
    }

    const accountDocumentMaps = [{
        internalId:'123', accountDocumentMapId:'45', applicationId:'23',applicationMenu:'op', documentTypeCode:'xy00',documentDescription:'desc', financialAccountHeadCode:'ac00', financialAccountHead:'fgh', selectedTreeSelectKey:'ac', applicationName:'tst'
    }]

    it('pass formProductAttributeProps and formEdit = false', () => {
        customRender(<FormWrapper mainFomEdit={false}  {...formProductAttributeProps} formEdit={false}  />);
    });

    it('pass formProductAttributeProps and formEdit = true', () => {
        customRender(<FormWrapper mainFomEdit={false}  {...formProductAttributeProps} formEdit={true}  />);
    });

    it('edit button', ()=>{
        customRender(<EditFormWrapper  {...cardAttributeProps} accountDocumentMaps={accountDocumentMaps} setFormEdit={jest.fn()} setButtonData={jest.fn()} setSelectedTreeSelectKey={jest.fn()} accDocMapEdit={jest.fn()} setuniqueCardEdit={jest.fn()}/>);

        const desc = screen.getByRole('combobox', {name:'Document Description'});
        fireEvent.change(desc, {target:{value:'test'}})

        const head = screen.getByRole('combobox', {name:'Financial Account Head'});
        fireEvent.change(head, {target:{value:'test'}})

        const editBtn = screen.getAllByRole('button', {name:""});
        // fireEvent.click(editBtn[0]);
    })

    it('delete button', ()=>{
        customRender(<FormWrapper {...cardAttributeProps} accountDocumentMaps={accountDocumentMaps} onAccAndMapDelete={jest.fn()} setAccountDocumentMaps={jest.fn()} setFormEdit={jest.fn(false)} forceUpdate={jest.fn()}/>);
        
        const deletBtn = screen.getAllByRole('button', {name:""});
        fireEvent.click(deletBtn[1]);
    })
});
