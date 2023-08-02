import React from 'react';
import { screen } from '@testing-library/react';
import { AddEditForm } from '@components/Sales/OTF/OtfDetails/AddEditForm';
import customRender from '@utils/test-utils';

const props = {
    formActionType: { editMode: 'true' },
    formData: {
        exchange: 1,
    },
};

describe('AddEdit Component render', () => {
    it('should render addedit page', async () => {
        customRender(<AddEditForm {...props} typeData={('SALE_TYP', 'PRC_TYP')} />);
    });

    it('should render all text components', async () => {
        customRender(<AddEditForm typeData="SALE_TYP" />);
        const initialDate = screen.getByText('Initial Promise Delivery Date');
        expect(initialDate).toBeTruthy();

        const expectedDate = screen.getByText('Cust. Expected Delivery Date');
        expect(expectedDate).toBeTruthy();

        const saleType = screen.getByText('Sale Type');
        expect(saleType).toBeTruthy();

        const priceType = screen.getByText('Price Type');
        expect(priceType).toBeTruthy();

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

        const exchange = screen.getByText('Exchange');
        expect(exchange).toBeTruthy();

        const loyaltyScheme = screen.getByText('Loyality Scheme');
        expect(loyaltyScheme).toBeTruthy();
    });
});
