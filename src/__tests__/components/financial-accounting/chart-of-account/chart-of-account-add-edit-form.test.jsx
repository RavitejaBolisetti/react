/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen, act } from '@testing-library/react';
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
    it("switch render", ()=>{
        customRender(<FormWrapper isVisible={true} setFormBtnActive={jest.fn()}/>);

        const activeSwitch = screen.getByRole('switch', {name:'Status'});
        fireEvent.click(activeSwitch);
    });
});
