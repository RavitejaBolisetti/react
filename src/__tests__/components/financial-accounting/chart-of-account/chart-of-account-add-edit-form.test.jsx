/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/FinancialAccounting/ChartOfAccount/AddEditForm';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

const FormWrapper = (props) =>{
    const [form] = Form.useForm();
    const myMock = {
        ...form,
        resetFields:jest.fn(),
        validateFields:jest.fn(),
        setFieldsValue:jest.fn()
    }

    return <AddEditForm form={myMock} {...props} />
}

afterEach(() => {
    jest.restoreAllMocks();
});

describe("AddEditForm component render", ()=>{
    it("save button render", ()=>{
        customRender(<FormWrapper isVisible={true} handleFormValueChange={jest.fn()} handleFormFieldChange={jest.fn()} onFinish={jest.fn()} onFinishFailed={jest.fn()} setFormBtnActive={jest.fn()} />);

        const desc = screen.getByRole('textbox', {name:'Description'});
        fireEvent.change(desc, {target:{value:'test'}});

        const code = screen.getByRole('textbox', {name:'Code'});
        fireEvent.change(code, {target:{value:'test'}});

        const activeSwitch = screen.getByRole('switch', {name:'Status'});
        fireEvent.click(activeSwitch);

        const saveBtn = screen.getByRole('button', {name:'Save'});
        fireEvent.click(saveBtn);
    });

    it("cancel button render", ()=>{
        customRender(<FormWrapper isVisible={true} setFormBtnActive={jest.fn()}/>);

        const cancelBtn = screen.getByRole('button', {name:'Cancel'});
        fireEvent.click(cancelBtn);
    });

    it("Attribute Level", ()=>{
        customRender(<FormWrapper isVisible={true} onChange={jest.fn()} setAccountTyp={jest.fn()} />);

        const attibuteLevel = screen.getByRole('combobox', {name:'Attribute Level'});
        fireEvent.change(attibuteLevel, {target:{value:'test'}});

    })

    it("handleSelectTreeClick",()=>{
        const props = {
            treeDisabled: true,
            treeFieldNames: {label: 'accountDescription', value: 'accountCode', children: 'subGroup'},
            placeholder: "Select parent",
            handleSelectTreeClick:jest.fn(),
            isVisible:true,
            treeData: [{accountCode: 'UDAII'}],
            treeLine:true,
            treeIcon:true,
            selectedTreeSelectKey:[{id:'123'}],
            defaultValue:{id:'123'}
        }
        customRender(<FormWrapper {...props} />);
    });

    it("accountTyp", ()=>{
        customRender(<FormWrapper isVisible={true} accountTyp={'LDGR'} setFormBtnActive={jest.fn()}/>);

        const debit = screen.getByRole('textbox', {name:'Opening Balance Debit'});
        fireEvent.change(debit, {target:{value:'test'}});

        const credit = screen.getByRole('textbox', {name:'Opening Balance Credit'});
        fireEvent.change(credit, {target:{value:'test'}});
    })
});
