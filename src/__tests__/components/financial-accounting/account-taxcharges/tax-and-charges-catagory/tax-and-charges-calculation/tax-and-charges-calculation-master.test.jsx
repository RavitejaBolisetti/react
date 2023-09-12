/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TaxAndChargesCalculationMaster } from '@components/FinancialAccounting/AccountTaxCharges/TaxAndChargesCategory/TaxAndChargesCalculation/TaxAndChargesCalculationMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) =>{
    const [editForm] = Form.useForm();
    const myMock = {
        ...editForm,
        setFieldsValue:jest.fn()
    }

    return <TaxAndChargesCalculationMaster editForm={myMock} {...props} />
}

describe('TaxAndChargesCalculationMaster component', () => {
    const formProductAttributeProps = {
        formActionType: {addMode: false, editMode: true, viewMode: false},
        isVisible: true,
        viewMode: false,
        disableSaveButton: false,
        buttonData: {cancelBtn: true, formBtnActive: false, editBtn: false, saveBtn: true, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false,},
        taxCharges:[{id: null, taxType: 'WCESS', taxCode: null, taxDescription: 'Cess on WCT'}],
    }

    it('pass formProductAttributeProps and formEdit = false', () => {
        customRender(<FormWrapper mainFomEdit={false}  {...formProductAttributeProps} formEdit={false} />);
    });

    it('pass formProductAttributeProps and formEdit = true', () => {
        customRender(<FormWrapper mainFomEdit={false}  {...formProductAttributeProps} formEdit={true}  />);
    });

    it('should render taxChargeCalList', () => {
        const taxChargeCalList = [{
            chargeCode:"CPA18",
            chargeDescription: "Central GST 9%",
            chargeType: "CGST",
            id: "311",
            internalId: '1234',
            taxMasterId: "123",
        }];
        
        customRender(<FormWrapper taxChargeCalList={taxChargeCalList}/>);
    });
});
