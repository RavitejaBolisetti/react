/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormDocTypeAcMapping from '@components/FinancialAccounting/AccountTaxCharges/DocumentTypeOtherCharges/DocTypeAcHeadMapping/FormDocTypeAcMapping';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

const FormWrapper = (props) =>{
    const [formEdit] = Form.useForm();
    const myMoock = {
        ...formEdit,
        validateFields:jest.fn(),
        getFieldsValue:jest.fn(),
        resetFields:jest.fn(),
    }
    return <FormDocTypeAcMapping formEdit={myMoock} {...props} />
}

const EditFormWrapper = (props) =>{
    const [editForm] = Form.useForm();
    const myMoock = {
        ...editForm,
        setFieldsValue:jest.fn(),
    }
    return <FormDocTypeAcMapping editForm={myMoock} {...props} />
}

afterEach(() => {
    jest.restoreAllMocks();
});

describe("FormDocTypeAcMapping Component", ()=>{
    it('formEdit=false', () => {
        customRender(<FormWrapper  formEdit={false} addDocHeadMapping={jest.fn()}/>);

        const desc = screen.getByRole('combobox', {name:'Other Charges'});
        fireEvent.change(desc, {target:{value:'test'}})

        const head = screen.getByRole('combobox', {name:''});
        fireEvent.change(head, {target:{value:'test'}})

        const addBtn = screen.getByRole('button', {name:'plus Add'});
        fireEvent.click(addBtn);
    });

    it('formEdit=true', () => {
        customRender(<EditFormWrapper  formEdit={false} addDocHeadMapping={jest.fn()}/>);

        const desc = screen.getByRole('combobox', {name:'Other Charges'});
        fireEvent.change(desc, {target:{value:'test'}})

        const head = screen.getByRole('combobox', {name:''});
        fireEvent.change(head, {target:{value:'test'}})

        const plusImg = screen.getByRole('img', {name:'plus'});
        fireEvent.click(plusImg);
    });
})