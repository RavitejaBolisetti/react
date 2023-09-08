/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/FinancialAccounting/AccountCategory/AddEditForm';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) =>{
    const [form] = Form.useForm();
    const myMock = {
        ...form,
        setFieldsValue:jest.fn()
    }

    return <AddEditForm form={myMock} {...props} />
}

describe("AddEditForm render", ()=>{

    it("should render when viewMode=false",()=>{
        const formActionType = { addMode: false, editMode: true, viewMode: false };

        customRender(<FormWrapper isVisible={true} formActionType={formActionType} handleFormValueChange={jest.fn()} handleFormFieldChange ={jest.fn()} setButtonData={jest.fn()} />);

        const descText = screen.getByRole('textbox', {name:'Description'});
        fireEvent.change(descText, { target:{value:'test'} });

        const switchInput = screen.getByRole('switch', {name:'Status'});
        fireEvent.click(switchInput);
    });

}) 