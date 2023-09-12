/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import  FormAccountAndDocumentMapping  from '@components/FinancialAccounting/AccountCategory/AccountAndDocumentMapping/FormAccountAndDocumentMapping';
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
    return <FormAccountAndDocumentMapping accDocMapForm={myMoock} {...props} />
}

const EditFormWrapper = (props) =>{
    const [editForm] = Form.useForm();
    const myMoock = {
        ...editForm,
        setFieldsValue:jest.fn(),
    }
    return <FormAccountAndDocumentMapping editForm={myMoock} {...props} />
}

describe('FormAccountAndDocumentMapping components', () => {
    it('formEdit=false', () => {
        customRender(<FormWrapper  formEdit={false} addDocAndMapp={jest.fn()}/>);

        const desc = screen.getByRole('combobox', {name:'Document Description'});
        fireEvent.change(desc, {target:{value:'test'}})

        const head = screen.getByRole('combobox', {name:'Financial Account Head'});
        fireEvent.change(head, {target:{value:'test'}})

        const addBtn = screen.getByRole('button', {name:'Add'});
        fireEvent.click(addBtn);
    });

    it('formEdit=true', () => {
        customRender(<EditFormWrapper  formEdit={false} addDocAndMapp={jest.fn()}/>);

        const desc = screen.getByRole('combobox', {name:'Document Description'});
        fireEvent.change(desc, {target:{value:'test'}})

        const head = screen.getByRole('combobox', {name:'Financial Account Head'});
        fireEvent.change(head, {target:{value:'test'}})

        const addBtn = screen.getByRole('button', {name:'Add'});
        fireEvent.click(addBtn);
    });
});
