/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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
        getFieldsValue:jest.fn(),
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
    };

    const accountDocumentMaps = [{
        internalId : '123',
        applicationId : "Finac",
        documentTypeCode : "AC00",
        financialAccountHeadCode : "FC00", 
        applicationName : "Financial Accounting", 
        documentDescription : "test", 
        financialAccountHead : "test00", 
    }];

    const documentDescriptionData = [{id: "153", key: "REC", parentKey: null, value: "Receipts(Finance)"}];

    it('financialAccountHeadCode', ()=>{ 
        const financialAccountData = [{key: 'FC00'}];
        customRender(<CardAccountAndDocumentMapping financialAccountHeadCode={'FC00'} financialAccountData={financialAccountData} />)
    })

    it('Cancel Button', () => {
        const uniqueCardEdit = '1234';
        const internalId = '1234';

        const setDropdownItems = jest.fn();
        jest.spyOn(React, 'useState').mockReturnValue([null, setDropdownItems]);

        render(<CardAccountAndDocumentMapping formEdit={true} internalId={internalId} uniqueCardEdit={uniqueCardEdit} setButtonData={jest.fn()} {...cardProps} setFormEdit={jest.fn()} setDropdownItems={setDropdownItems} />);

        const cancelBtn = screen.getByTestId('cancel_btn');
        fireEvent.click(cancelBtn);

        // expect(setDropdownItems).toHaveBeenCalledWith(expect.any(Function));
        // const setDropdownItemsFunction = setDropdownItems.mock.calls[0][0];
        // setDropdownItemsFunction([]);
    })

    it('Save Button', () => {
        const uniqueCardEdit = '1234';
        const internalId = '1234';

        const accountDocumentMaps = [{
            internalId : 'Finac',
        }];

        customRender(<EditFormWrapper formEdit={true} internalId={internalId} accountDocumentMaps={accountDocumentMaps} uniqueCardEdit={uniqueCardEdit} setButtonData={jest.fn()} {...cardProps} setFormEdit={jest.fn()} setDropdownItems={jest.fn()} onAccountDocumentMapsSave={jest.fn()} setAccountDocumentMaps={jest.fn()} documentDescriptionData={documentDescriptionData}/>)

        const saveBtn = screen.getByTestId('save_btn');
        fireEvent.click(saveBtn);
    })

    it('edit button', ()=>{
        const applicationId = 'Finac';

        const setSelectedTreeSelectKey = jest.fn();
        jest.spyOn(React, 'useState').mockReturnValue([null, setSelectedTreeSelectKey]);

        render(<EditFormWrapper  {...cardProps} accountDocumentMaps={accountDocumentMaps} setFormEdit={jest.fn()} setButtonData={jest.fn()} setSelectedTreeSelectKey={setSelectedTreeSelectKey} accDocMapEdit={jest.fn()} setuniqueCardEdit={jest.fn()} applicationId={applicationId} />);

        const editBtn = screen.getAllByRole('button', {name:""});
        fireEvent.click(editBtn[0]);

        expect(setSelectedTreeSelectKey).toHaveBeenCalledWith(expect.any(Function));
        const setSelectedTreeSelectKeyFunction = setSelectedTreeSelectKey.mock.calls[0][0];
        setSelectedTreeSelectKeyFunction(applicationId);
    })

    it('delete button', ()=>{
        const setAccountDocumentMaps = jest.fn();
        jest.spyOn(React, 'useState').mockReturnValue([null, setAccountDocumentMaps]);

        render(<FormWrapper {...cardProps}  onAccAndMapDelete={jest.fn()} setAccountDocumentMaps={setAccountDocumentMaps}
        setFormEdit={jest.fn(false)} forceUpdate={jest.fn()} />);
        
        const deletBtn = screen.getAllByRole('button', {name:""});
        fireEvent.click(deletBtn[1]);

        expect(setAccountDocumentMaps).toHaveBeenCalledWith(expect.any(Function));
        const setAccountDocumentMapsFunction = setAccountDocumentMaps.mock.calls[0][0];
        const prev = [{ internalId: '123' }];
        setAccountDocumentMapsFunction(prev);
    })

});
