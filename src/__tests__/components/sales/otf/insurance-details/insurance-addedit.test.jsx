import React from 'react';
import { screen } from '@testing-library/react';
import { AddEditForm } from '@components/Sales/OTF/InsuranceDetails/AddEditForm';
import customRender from '@utils/test-utils';

describe('OTF Finance Details Component render', () => {
    it('should render addedit form', async () => {
        customRender(<AddEditForm />);
    });

    it('should render all text fields', () => {
        customRender(<AddEditForm />);

        const insuranceCompany = screen.getByText('Insurance Company');
        expect(insuranceCompany).toBeTruthy();

        const coverNote = screen.getByText('Insurance Cover Note');
        expect(coverNote).toBeTruthy();

        const insuranceAmt = screen.getByText('Insurance Amount');
        expect(insuranceAmt).toBeTruthy();

        const date = screen.getByText('Date');
        expect(date).toBeTruthy();

        const registrationNo = screen.getByText('Registration Number');
        expect(registrationNo).toBeTruthy();
    });
});
