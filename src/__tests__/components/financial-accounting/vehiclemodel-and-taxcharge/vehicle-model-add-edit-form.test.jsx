/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/FinancialAccounting/VehicleModelAndTaxCharges/AddEditForm';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

const FormWrapper = (props) =>{
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
    };
    return <AddEditForm form={myFormMock} {...props} />;
}

afterEach(() => {
    jest.restoreAllMocks();
});

describe('AddEditForm component', () => {

    it('selectedModelGroup', ()=>{
        customRender(<FormWrapper isVisible={true} formActionType={{addMode:true}} selectedModelGroup={'ECOM'} />);
    });

    it('should render when taxCategoryId = TaxChargesOptions id',()=>{
        const TaxChargesOptions = [{id:'895'}];
        const formData = {taxCategoryId: "895"};
        
        customRender(<AddEditForm isVisible={true} formActionType={{}} TaxChargesOptions={TaxChargesOptions} formData={formData}/>);
    });

    it('should render when taxCategoryId != TaxChargesOptions id',()=>{
        const TaxChargesOptions = [{id:'126'}];
        const formData = {taxCategoryId: "895"};
        
        customRender(<AddEditForm isVisible={true} formActionType={{}} TaxChargesOptions={TaxChargesOptions} formData={formData}/>);
    });

    it('should render when accountCategoryCode = AccountDataOptions key',()=>{
        const AccountDataOptions = [{key:'A001'}];
        const formData = {accountCategoryCode: "A001"};
        
        customRender(<AddEditForm isVisible={true} formActionType={{}} AccountDataOptions={AccountDataOptions} formData={formData}/>);
    });

    it('should render when accountCategoryCode != AccountDataOptions key',()=>{
        const AccountDataOptions = [{key:'A001'}];
        const formData = {accountCategoryCode: "CPA28"};
        
        customRender(<AddEditForm isVisible={true} formActionType={{}} AccountDataOptions={AccountDataOptions} formData={formData}/>);
    });

    it("handleFormValueChange", ()=>{
        const fieldNames = { key: 'id', value: 'value' };
        const TaxChargesOptions = [{id: "234", key: "12", parentKey: null, value: "DESCTESST"}];

        customRender(<AddEditForm isVisible={true} formActionType={{}} fieldNames={fieldNames} TaxChargesOptions={TaxChargesOptions}/>);

        const taxComboBox = screen.getByRole('combobox', {name:'Tax/Charge Category'});
        fireEvent.change(taxComboBox, {target:{value:'DESCTESST'}});
        expect(taxComboBox.value).toBe('DESCTESST');
        fireEvent.click(taxComboBox);
    })
    
})