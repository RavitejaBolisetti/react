/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { AddEditForm } from '@components/Sales/Common/CustomerDetails/AddEditForm';
import { Form } from 'antd';

const bookingCustomer = true;

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn(),
        resetData: jest.fn(),
        validateFields: jest.fn(),
    };
    return <AddEditForm form={myFormMock} {...props} />;
};

describe('Add Edit Form Components', () => {
    it('should Add Edit Form Component', () => {
        customRender(<FormWrapper typeData={['GENDER']} fnSetData={jest.fn()} />);
    });

    it('should check panel title available', () => {
        customRender(<FormWrapper typeData={['GENDER']} fnSetData={jest.fn()} />);
        const bookingcustomer = screen.getByText('Booking Customer');
        expect(bookingcustomer).toBeInTheDocument();
        const billingcustomer = screen.getByText('Billing Customer');
        expect(billingcustomer).toBeInTheDocument();
    });

    it('should click on checkbox when user click', () => {
        customRender(<FormWrapper formType="billingCustomer" fnSetData={jest.fn()} typeData={['GENDER']} activeKey={[1, 2]} setActiveKey={jest.fn()} setSameAsBookingCustomer={jest.fn()} />);
        const checkbox = screen.getByRole('checkbox', { name: 'Same as Booking Customer' });
        fireEvent.click(checkbox);
        // expect(checkbox).toBeChecked();
    });

    it('check enter mobile number is valid or not', () => {
        customRender(<FormWrapper formType="billingCustomer" fnSetData={jest.fn()} typeData={['GENDER']} activeKey={[1, 2]} setActiveKey={jest.fn()} setSameAsBookingCustomer={jest.fn()} />);
        const mobilenumber = screen.getAllByRole('textbox', { Name: 'Mobile Number' });

        fireEvent.change(mobilenumber[0], { target: { value: '7068000000' } });
        fireEvent.change(mobilenumber[1], { target: { value: '7068000000' } });
    });

    it('should render form input field components', () => {
        customRender(<FormWrapper activeKey={[1, 2]} fnSetData={jest.fn()} typeData={['GENDER']} setActiveKey={jest.fn()} formData={bookingCustomer} />);
        const calendarinput = screen.getAllByRole('img', { Name: 'calendar' });
        fireEvent.click(calendarinput[0]);
        fireEvent.click(calendarinput[1]);
    });
});
