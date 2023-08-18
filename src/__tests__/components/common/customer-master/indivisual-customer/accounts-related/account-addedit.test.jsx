import React from 'react';
import customRender from '@utils/test-utils';

import { screen } from '@testing-library/react';
import { AddEditForm } from '@components/common/CustomerMaster/IndividualCustomer/AccountRelated/AddEditForm';

describe('AddEditFormMain', () => {
    it('should render Label text', async () => {
        customRender(<AddEditForm />);

        const creditLimit = screen.getByText('Credit Limit');
        expect(creditLimit).toBeTruthy();

        const limitDays = screen.getByText('Credit Limit Days');
        expect(limitDays).toBeTruthy();

        const outstandingAmt = screen.getByText('Outstanding Amount');
        expect(outstandingAmt).toBeTruthy();

        const partsDiscount = screen.getByText('Parts Discount %');
        expect(partsDiscount).toBeTruthy();

        const labourDiscount = screen.getByText('Labour Discount %');
        expect(labourDiscount).toBeTruthy();

        const remarks = screen.getByText('Remarks');
        expect(remarks).toBeTruthy();

        const vipDealer = screen.getByText('VIP Dealer');
        expect(vipDealer).toBeTruthy();
    });
});
