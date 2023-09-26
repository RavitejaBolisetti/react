import React from 'react';
import { screen } from '@testing-library/react';
import { ViewDetail } from '@components/Sales/Common/InsuranceDetails/ViewDetail';
import customRender from '@utils/test-utils';

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Booking Insurance view Details render', () => {
    it('should render view details page', async () => {
        customRender(<ViewDetail />);
    });

    it('should render all text', async () => {
        customRender(<ViewDetail />);

        const insuranceCompany = screen.getByText('Insurance Company');
        expect(insuranceCompany).toBeTruthy();

        const coverNote = screen.getByText('Insurance Cover Note');
        expect(coverNote).toBeTruthy();

        const insuranceAmt = screen.getByText('Insurance Amount');
        expect(insuranceAmt).toBeTruthy();

        const registrationNo = screen.getByText('Registration Number');
        expect(registrationNo).toBeTruthy();
    });
});
