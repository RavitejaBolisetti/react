/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { AddEditForm } from '@components/Sales/OTF/CustomerDetails/AddEditForm';


const setActiveKey =true;

describe('Add Edit Form Components', () => {
    it('should Add Edit Form Component', () => {
        customRender(<AddEditForm />);
        screen.debug()
    });

    it('should check panel title available', () => {
        customRender(<AddEditForm />);
        const bookingcustomer = screen.getByText("Booking Customer");
        expect.toBeInTheDocument(bookingcustomer);
        const billingcustomer = screen.getByText("Billing Customer");
        expect.toBeInTheDocument(billingcustomer);
    })
       
    it('is collapse open on click of Edit btn', () => {
        customRender(<AddEditForm activeKey={[1,2]} setActiveKey={jest.fn()} />);
        const editIconBtn = screen.getAllByText('Edit');
        fireEvent.click(editIconBtn[0]); 
        fireEvent.click(editIconBtn[1]); 
    });
 
});


