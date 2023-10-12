import React from 'react';
import { AddEditForm } from '@components/Sales/Common/Referrals/AddEditForm';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();

    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
    };
    return <AddEditForm form={myFormMock} {...props} />;
};

describe('Referrals Component', () => {
    it('Should render referrals add edit form components', ()=>{
        const formData = { dob: "09/09/1999", dateOfBirth: '09/09/1992' }
        customRender(<FormWrapper formData={formData} setFieldsValue={jest.fn()} />)
    })
})
