/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { AddEditForm } from '@components/Sales/OTF/CustomerDetails/AddEditForm';

const setActiveKey = true;
const bookingCustomer = true;

describe('Add Edit Form Components', () => {
    it('should Add Edit Form Component', () => {
        customRender(<AddEditForm />);
        screen.debug();
    });

    it('should check panel title available', () => {
        customRender(<AddEditForm />);
        const bookingcustomer = screen.getByText('Booking Customer');
        expect(bookingcustomer).toBeInTheDocument();
        const billingcustomer = screen.getByText('Billing Customer');
        expect(billingcustomer).toBeInTheDocument();
    });

    it('is collapse open on click of Edit btn', () => {
        customRender(<AddEditForm activeKey={[1, 2]} setActiveKey={jest.fn()} />);
        const editIconBtn = screen.getAllByText('Edit');
        fireEvent.click(editIconBtn[0]);
        fireEvent.click(editIconBtn[1]);
    });

    it('it should click on checkbox when user click', () => {
        customRender(<AddEditForm formType="billingCustomer" activeKey={[1, 2]} setActiveKey={jest.fn()} setSameAsBookingCustomer={jest.fn()} />);
        const checkbox = screen.getByRole('checkbox', { name: 'Same as Booking Customer' });
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
    });

    it('check enter mobile number is valid or not', () => {
        customRender(<AddEditForm formType="billingCustomer" activeKey={[1, 2]} setActiveKey={jest.fn()} setSameAsBookingCustomer={jest.fn()} />);
        const mobilenumber = screen.getAllByRole('textbox', { Name: 'Mobile Number' });

        fireEvent.change(mobilenumber[0], { target: { value: '7068000000' } });
        fireEvent.change(mobilenumber[1], { target: { value: '7068000000' } });
    });

    it('should render form input field components', () => {
        customRender(<AddEditForm activeKey={[1, 2]} setActiveKey={jest.fn()} formData={bookingCustomer} />);
        const calendarinput = screen.getAllByRole('img', { Name: 'calendar' });
        fireEvent.click(calendarinput[0]);
        fireEvent.click(calendarinput[1]);
    });
});
