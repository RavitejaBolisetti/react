/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import customRender from '@utils/test-utils';
import { AddEditForm } from '@components/common/CustomerMaster/CorporateCustomer/CompanyProfile/AddEditForm';
import { fireEvent, screen } from '@testing-library/react';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myMock = {
        ...form,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <AddEditForm form={myMock} {...props} />;
};

describe('add edit form', () => {
    it('should render add edit form component', () => {
        customRender(<FormWrapper appCategoryData={['APP_CAT']} setCustomerCategory={jest.fn()} />);

        const minusBtn = screen.getAllByRole('img', { name: 'minus' });
        fireEvent.click(minusBtn[0]);
        fireEvent.click(minusBtn[1]);
    });

    it('should able to select option', async () => {
        const appCategoryData = {
            APP_CAT: [
                { id: '1', value: 'test1' },
                { id: '12', value: 'test12' },
            ],
            APP_SUB_CAT: [
                { id: '12', value: 'test12' },
                { id: '123', value: 'test123' },
            ],
            CUS_CAT: [
                { id: '121', value: 'test121' },
                { id: '1234', value: 'test1234' },
            ],
        };
        customRender(<AddEditForm appCategoryData={appCategoryData} setactiveKey={jest.fn()} setCustomerCategory={jest.fn()} />);

        const applicationCategorization = screen.getByRole('combobox', { name: 'Usage/Application Categorization' });
        fireEvent.change(applicationCategorization, { target: { value: 'test1' } });
        const subCategory = screen.getByRole('combobox', { name: 'Usage/Application Sub-Category' });
        fireEvent.change(subCategory, { target: { value: 'test12' } });
        const customerCategory = screen.getByRole('combobox', { name: 'Customer Category' });
        fireEvent.change(customerCategory, { target: { value: 'test121' } });
    });
});
