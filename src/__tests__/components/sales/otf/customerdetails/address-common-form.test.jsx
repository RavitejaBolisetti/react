/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { AddressCommonForm } from '@components/Sales/OTF/CustomerDetails/AddressCommonForm';
afterEach(() => {
    jest.restoreAllMocks();
  }); 
describe('address common form Components', () => {
    it('should render form components', () => {
        customRender(<AddressCommonForm />);
    });

    it('should render form input field components', () => {
        customRender(<AddressCommonForm formType="billingCustomer" isvisible={true} />);

        const mobileNo = screen.getByLabelText('Mobile Number');
        expect(mobileNo).toBeInTheDocument();

        const customerid = screen.getByLabelText('Customer ID');
        fireEvent.change(customerid, { target: { value: 'Dmscustomerid' } });
        expect(customerid.value.includes('Dmscustomerid'));

        const customertype = screen.getByLabelText('Customer Type');
        fireEvent.change(customertype, { target: { value: 'Dmscustomertype' } });
        expect(customertype.value.includes('Dmscustomertype'));

        const salutationfield = screen.getByLabelText('Salutation');
        fireEvent.change(salutationfield, { target: { value: 'Dmssalutation' } });
        expect(salutationfield.value.includes('Dmssalutation'));

        const customername = screen.getByLabelText('Customer Name');
        fireEvent.change(customername, { target: { value: 'Dmscustomername' } });
        expect(customername.value.includes('Dmscustomername'));

        const address = screen.getByLabelText('Address');
        fireEvent.change(address, { target: { value: 'Dmsaddress' } });
        expect(address.value.includes('Dmsaddress'));

        const citydistrict = screen.getByLabelText('City/District');
        fireEvent.change(citydistrict, { target: { value: 'Dmscitydistrict' } });
        expect(citydistrict.value.includes('Dmscitydistrict'));

        const state = screen.getByLabelText('State');
        fireEvent.change(state, { target: { value: 'Dmsstate' } });
        expect(state.value.includes('Dmsstate'));

        const pincode = screen.getByLabelText('PIN Code');
        fireEvent.change(pincode, { target: { value: 'Dmspincode' } });
        expect(pincode.value.includes('Dmspincode'));

        const alternatenumber = screen.getByLabelText('Alternate Number');
        fireEvent.change(alternatenumber, { target: { value: 'Dmsalternateno' } });
        expect(alternatenumber.value.includes('Dmsalternateno'));

        const email = screen.getByLabelText('Email');
        fireEvent.change(email, { target: { value: 'Dmsemail' } });
        expect(email.value.includes('Dmsemail'));

        const pan = screen.getByLabelText('PAN');
        fireEvent.change(pan, { target: { value: 'Dmspan' } });
        expect(pan.value.includes('Dmspan'));

        const aadhar = screen.getByLabelText('Aadhar');
        fireEvent.change(aadhar, { target: { value: 'Dmsaadhar' } });
        expect(aadhar.value.includes('Dmsaadhar'));

        const gstin = screen.getByLabelText('GSTIN');
        fireEvent.change(gstin, { target: { value: 'Dmsgstin' } });
        expect(gstin.value.includes('Dmsgstin'));

        const drivinglicense = screen.getByLabelText('Driving License');
        fireEvent.change(drivinglicense, { target: { value: 'Dmsdrivinglicense' } });
        expect(drivinglicense.value.includes('Dmsdrivinglicense'));

        const tradelicence = screen.getByLabelText('Trade Licence');
        fireEvent.change(tradelicence, { target: { value: 'Dmstradelicense' } });
        expect(tradelicence.value.includes('Dmstradelicense'));

        const birthdate = screen.getByLabelText('Birth Date');
        fireEvent.change(birthdate, { target: { value: 'Dmsbirthdate' } });
        expect(birthdate.value.includes('Dmsbirthdate'));
    });
});
