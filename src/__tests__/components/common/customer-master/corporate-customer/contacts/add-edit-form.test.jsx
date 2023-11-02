/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import customRender from '@utils/test-utils';
import AddEditForm from '@components/common/CustomerMaster/CorporateCustomer/Contacts/AddEditForm';
import { fireEvent, screen } from '@testing-library/react';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myMock = {
        ...form,
        resetFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        setFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <AddEditForm form={myMock} {...props} />;
};

describe('add edit form component', () => {
    it('should render add edit form component', () => {
        customRender(<FormWrapper />);
        const uploadFile = screen.getAllByRole('button', { name: 'Upload File' });
        fireEvent.click(uploadFile[0]);
        const sendOTP = screen.getAllByRole('button', { name: 'Send OTP' });
        fireEvent.click(sendOTP[0]);
        const saveBtn = screen.getAllByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn[0]);
        const profilePicture = screen.getAllByRole('button', { name: 'Upload Your Profile Picture File type should be .png and .jpg and max file size to be 5MB Upload File' });
        fireEvent.click(profilePicture[0]);

        const resetBtn = screen.getAllByRole('button', { name: 'Reset' });
        fireEvent.click(resetBtn[0]);
    });

    it('should render texbox', () => {
        customRender(<FormWrapper resetFields={jest.fn()} />);

        const mobileNumber = screen.getByRole('textbox', { name: 'Mobile Number' });
        fireEvent.click(mobileNumber);
        const alternateMobileNumber = screen.getByRole('textbox', { name: 'Alternate Mobile Number' });
        fireEvent.click(alternateMobileNumber);
        const designation = screen.getByRole('textbox', { name: 'Designation' });
        fireEvent.click(designation);
        const firstName = screen.getByRole('textbox', { name: 'First Name' });
        fireEvent.click(firstName);
        const middleName = screen.getByRole('textbox', { name: 'Middle Name' });
        fireEvent.click(middleName);
    });

    it('checkbox and combobox should work', () => {
        customRender(<FormWrapper />);

        const markAsDefault = screen.getByRole('checkbox', { name: 'Mark As Default' });
        fireEvent.click(markAsDefault);

        const purposeofContact = screen.getByRole('combobox', { name: 'Purpose of Contact' });
        fireEvent.change(purposeofContact, { target: { value: 'dealing' } });

        const gender = screen.getByRole('combobox', { name: 'Gender' });
        fireEvent.change(gender, { target: { value: 'male' } });

        const title = screen.getByRole('combobox', { name: 'Title' });
        fireEvent.change(title, { target: { value: 'male' } });
    });
});
