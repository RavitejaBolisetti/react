import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { CustomerListModal } from 'components/utils/CustomerListModal';
import customRender from '@utils/test-utils';

const data=[{"customerId":"CUS1687755835789","customerName":"Neha Gaur","customerType":"IND","customerTypeName":null,"mobileNumber":"6608601111","emailId":"raj.singh@gmail.com","membershipType":null,"membershipTypeName":null,"profilePicDocId":null,"registrationNumber":"REG00123110053C","chassisNumber":"MAKGF1F57A9193179","dateOfBirth":"","make":null,"modelGroup":"Mahindra Thar","variant":"XUV1000"}];

describe('Customer List Modal Component', () => {

    it('should render customer list modal component', () => {
        customRender(<CustomerListModal isVisible={true} />);
    });

    it('view details button should work', () => {
        customRender(<CustomerListModal isVisible={true} data={data} handleSelectedData={jest.fn()} setSelectedRowData={jest.fn()} />);
        const selectItem=screen.getByRole('radio', { name: '' });
        fireEvent.click(selectItem);
        const viewDetails=screen.getByRole('button', { name: 'View Details' });
        fireEvent.click(viewDetails);
    });

});