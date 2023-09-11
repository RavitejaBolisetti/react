import React from 'react';
import { screen } from '@testing-library/react';
import { ViewDetail } from '@components/Sales/OTF/OtfDetails/ViewDetail';
import customRender from '@utils/test-utils';

beforeEach(() => {
    jest.clearAllMocks();
});

describe('OTF View Details Component render', () => {
    it('should render view details page', async () => {
        customRender(<ViewDetail />);
    });

    it('should render all text components', async () => {
        customRender(<ViewDetail />);
        const initialDate = screen.getByText('Initial Promise Delivery Date');
        expect(initialDate).toBeTruthy();

        const expectedDate = screen.getByText('Cust. Expected Delivery Date');
        expect(expectedDate).toBeTruthy();

        const boolingAmt = screen.getByText('Booking Amount');
        expect(boolingAmt).toBeTruthy();

        const salesConsultant = screen.getByText('Sales Consultant');
        expect(salesConsultant).toBeTruthy();

        const specialReq = screen.getByText('Special Request');
        expect(specialReq).toBeTruthy();

        const placeOf = screen.getByText('Place Of Registration');
        expect(placeOf).toBeTruthy();

        const deliveryAt = screen.getByText('Delivery At');
        expect(deliveryAt).toBeTruthy();

        const referal = screen.getByText('Referral');
        expect(referal).toBeTruthy();

        const mitraType = screen.getByText('Influencer/Mitra Type');
        expect(mitraType).toBeTruthy();

        const mitraName = screen.getByText('Influencer/Mitra Name');
        expect(mitraName).toBeTruthy();

        const payment = screen.getByText('Mode Of Payment');
        expect(payment).toBeTruthy();

        const loyaltyScheme = screen.getByText('Loyality Scheme');
        expect(loyaltyScheme).toBeTruthy();
    });
});
