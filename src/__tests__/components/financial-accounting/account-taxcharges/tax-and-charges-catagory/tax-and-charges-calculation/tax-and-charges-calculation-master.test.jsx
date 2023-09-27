/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
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
    it('formEdit = false', () => {
        customRender(<FormWrapper isVisible={true} formEdit={false} />);
    });

    it('formEdit = true', () => {
        customRender(<FormWrapper isVisible={true} formEdit={true} />);
    });

    it('taxCategory',()=>{
        const taxCategory = {taxCategoryDetail:[{chargeCode:'00A', }]};
        customRender(<FormWrapper taxCategory={taxCategory} isVisible={true} setTaxChargeCalList={jest.fn()} />);
    });

    it('taxChargeCalList', () => {
        const taxChargeCalList = [{chargeCode:"CPA18",chargeDescription: "Central GST 9%",chargeType: "CGST",id: "311",internalId: '1234',taxMasterId: "123",}]

        customRender(<TaxAndChargesCalculationMaster taxChargeCalList={taxChargeCalList}/>)
    });

});
