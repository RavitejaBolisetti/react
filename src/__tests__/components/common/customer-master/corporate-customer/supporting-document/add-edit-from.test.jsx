/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import customRender from '@utils/test-utils';
import AddEditForm from '@components/common/CustomerMaster/CorporateCustomer/SupportingDocument/AddEditForm';
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

        const documentType = screen.getByRole('combobox', { value: 'Document Type' });
        fireEvent.change(documentType, { target: { value: 'test' } });

        const fileName = screen.getByRole('textbox', { value: 'File Name' });
        fireEvent.change(fileName, { target: { value: 'test' } });

        const uploadFile = screen.getAllByRole('button', { value: 'Upload File' });
        fireEvent.click(uploadFile[1]);

        const closeCircle = screen.getAllByRole('button', { value: 'close-circle' });
        fireEvent.click(closeCircle[0]);

        const clickDrop = screen.getAllByRole('button', { value: 'Click or drop your file here to upload the signed and scanned customer form. File type should be png, jpg or pdf and max file size to be 5Mb Upload File' });
        fireEvent.click(clickDrop[1]);
    });
});
