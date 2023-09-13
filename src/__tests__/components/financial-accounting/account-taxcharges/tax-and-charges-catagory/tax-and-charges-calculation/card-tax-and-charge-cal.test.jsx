/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import  CardProductAttribute  from '@components/FinancialAccounting/AccountTaxCharges/TaxAndChargesCategory/TaxAndChargesCalculation/CardTaxAndChargeCal';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

const FormWrapper = (props) =>{
    const [editForm] = Form.useForm();
    const myMoock = {
        ...editForm,
        setFieldsValue:jest.fn(),
        validateFields:jest.fn(),
        getFieldsValue:jest.fn(),
    }
    return <CardProductAttribute editForm={myMoock} {...props} />
}

const EditDocFormWrapper = (props) =>{
    const [taxChargeCalForm] = Form.useForm();
    const myMoock = {
        ...taxChargeCalForm,
        resetFields:jest.fn(),
    }
    return <CardProductAttribute taxChargeCalForm={myMoock} {...props} />
}
afterEach(() => {
    jest.restoreAllMocks();
});

describe('CardProductAttribute component', () => {
    const cardProps = {
        buttonData: {cancelBtn: true, formBtnActive: false, editBtn: false, saveBtn: true, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false},
        disableSaveButton: false,
        formActionType: {addMode: false, editMode: true, viewMode: false},
        viewMode:false,
        isVisible:true,
    }

    it('Cancel Button', () => {
        const uniqueCardEdit = '1234';
        const internalId = '1234';
        
        customRender(<FormWrapper formEdit={true} internalId={internalId} uniqueCardEdit={uniqueCardEdit} setButtonData={jest.fn()} {...cardProps} setFormEdit={jest.fn()} setDropdownItems={jest.fn()} />);

        const cancelBtn = screen.getByRole('button', {name:'Cancel'});
        fireEvent.click(cancelBtn);
    })

    it('Save Button', () => {
        const taxChargeCalList=[{
            chargeCode : '123', //
            chargeType : '45', //
            chargeDescription : 'desc',
            chargeCodeDesc : 'hello',
            taxMasterId : 'test',
            internalId:'123' //
        }]
        const uniqueCardEdit = '1234';
        const internalId = '1234';
        
        customRender(<FormWrapper formEdit={true} internalId={internalId} uniqueCardEdit={uniqueCardEdit} setButtonData={jest.fn()} {...cardProps} setFormEdit={jest.fn()} setDropdownItems={jest.fn()} taxChargeCalList={taxChargeCalList} setTaxChargeCalList={jest.fn()} forceUpdate={jest.fn()} />);

        const saveBtn = screen.getByRole('button', {name:'Save'});
        fireEvent.click(saveBtn);
    })

    it('delete button should work and formEdit=false', () => {
        customRender(<EditDocFormWrapper  {...cardProps} setFormEdit={jest.fn()} setuniqueCardEdit={jest.fn()} setTaxChargeCalList={jest.fn()} forceUpdate={jest.fn()} formEdit={false} handleCodeFunction={jest.fn()}/>);

        const deleteBtn = screen.getAllByRole('button', {name:""});
        fireEvent.click(deleteBtn[1]);
    });

    it('edit button should work and formEdit=false', () => {
        customRender(<FormWrapper  {...cardProps} setuniqueCardEdit={jest.fn()}  handleCodeFunction={jest.fn()} setFormEdit={jest.fn()} setButtonData={jest.fn()} setSelectedTreeSelectKey={jest.fn()} formEdit={false} />);

        const editBtn = screen.getAllByRole('button', {name:""});
        fireEvent.click(editBtn[0]);
    });
})