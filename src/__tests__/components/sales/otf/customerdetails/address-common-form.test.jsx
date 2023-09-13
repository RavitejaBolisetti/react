/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { AddressCommonForm } from '@components/Sales/Common/CustomerDetails/AddressCommonForm';

describe('address common form Components', () => {
    it('should render form components', () => {
        customRender(<AddressCommonForm typeData={['GENDER']} />);
    });

    it('should render form input field components', () => {
        customRender(<AddressCommonForm formType="billingCustomer" typeData={['GENDER']} isvisible={true} />);

        const mobileNo = screen.getByLabelText('Mobile Number');
        expect(mobileNo).toBeInTheDocument();

        const customerid = screen.getByLabelText('Customer ID');
        fireEvent.change(customerid, { target: { value: 'Dmscustomerid' } });

        const customername = screen.getByLabelText('Customer Name');
        fireEvent.change(customername, { target: { value: 'Dmscustomername' } });

        const address = screen.getByLabelText('Address');
        fireEvent.change(address, { target: { value: 'Dmsaddress' } });

        const citydistrict = screen.getByLabelText('City/District');
        fireEvent.change(citydistrict, { target: { value: 'Dmscitydistrict' } });

        const state = screen.getByLabelText('State');
        fireEvent.change(state, { target: { value: 'Dmsstate' } });

        const pincode = screen.getByLabelText('PIN Code');
        fireEvent.change(pincode, { target: { value: 'Dmspincode' } });

        const alternatenumber = screen.getByLabelText('Alternate Number');
        fireEvent.change(alternatenumber, { target: { value: 'Dmsalternateno' } });

        const email = screen.getByLabelText('Email');
        fireEvent.change(email, { target: { value: 'Dmsemail' } });

        const pan = screen.getByLabelText('PAN');
        fireEvent.change(pan, { target: { value: 'Dmspan' } });

        const gstin = screen.getByLabelText('GSTIN');
        fireEvent.change(gstin, { target: { value: 'Dmsgstin' } });

        const birthdate = screen.getByLabelText('Birth Date');
        fireEvent.change(birthdate, { target: { value: 'Dmsbirthdate' } });
    });
});
