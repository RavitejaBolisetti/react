/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { TaxAndChargesCalculationMaster } from '@components/FinancialAccounting/AccountTaxCharges/TaxAndChargesCategory/TaxAndChargesCalculation/TaxAndChargesCalculationMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

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

const TaxChargeCalFormWrapper = (props) =>{
    const [taxChargeCalForm] = Form.useForm();
    const myMock = {
        ...taxChargeCalForm,
        resetFields:jest.fn(),
        getFieldsValue:jest.fn(),
        validateFields:jest.fn().mockResolvedValue([{chargeDescription:'No TCS', taxMasterId:'731'}]),

    }

    return <TaxAndChargesCalculationMaster taxChargeCalForm={myMock} {...props} />
}

describe('TaxAndChargesCalculationMaster component', () => {
    const taxChargeCalList = [{chargeCode:"CPA18", chargeDescription: "Central GST 9%", chargeType: "CGST", id: "311", internalId: '1234', taxMasterId: "123",}]

    it('addBtn', () => {
        const setTaxChargeCalList = jest.fn();
        jest.spyOn(React, 'useState').mockReturnValue([null, setTaxChargeCalList]);

        render(<TaxChargeCalFormWrapper isVisible={true} formEdit={false} forceUpdate={jest.fn()} setButtonData={jest.fn()} handleCodeFunction={jest.fn()} setTaxChargeCalList={setTaxChargeCalList} />);
        
        const addBtn = screen.getByRole('button', {name:'plus Add'});
        fireEvent.click(addBtn);

        expect(setTaxChargeCalList).toHaveBeenCalledTimes(0);
    });

    it('addBtn error', () => {
        render(<TaxChargeCalFormWrapper isVisible={true} formEdit={false} forceUpdate={jest.fn()} setButtonData={jest.fn()} handleCodeFunction={jest.fn()}/>);
        
        const addBtn = screen.getByRole('button', {name:'plus Add'});
        fireEvent.click(addBtn);
    });

    it('formEdit = false', () => {
        customRender(<FormWrapper isVisible={true} formEdit={false} />);
    });

    it('formEdit = true', () => {
        customRender(<FormWrapper isVisible={true} formEdit={true} />);
    });

    it('taxCategory',()=>{
        const setTaxChargeCalList = jest.fn();
        jest.spyOn(React, 'useState').mockReturnValue([null, setTaxChargeCalList]);

        const taxCategory = {taxCategoryDetail:[{chargeCode:'00A', }]};
        render(<FormWrapper taxCategory={taxCategory} isVisible={true} setTaxChargeCalList={setTaxChargeCalList} />);

        expect(setTaxChargeCalList).toHaveBeenCalledWith(expect.any(Function));
        const setTaxChargeCalListFunction = setTaxChargeCalList.mock.calls[0][0];
        setTaxChargeCalListFunction([]);
    });

    it('taxChargeCalList', () => {
        customRender(<TaxAndChargesCalculationMaster taxChargeCalList={taxChargeCalList}/>)
    });

});
