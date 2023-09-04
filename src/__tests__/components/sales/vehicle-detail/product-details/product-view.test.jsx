import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ViewDetail } from '@components/Sales/VehicleDetail/ProductDetails/ViewDetails';

describe('ViewDetail Component', () => {
    const mockFormData = {
        productAttributeDetail: {
            productDivision: 'Division A',
            modelFamily: 'Family X',
        },
        connectedVehicle: [
            {
                tcuId: 'TCU001',
                esimNo: 'ESIM123',
            },
        ],
    };

    it('should render view Details', () => {
        render(<ViewDetail formData={mockFormData} bindStatus={jest.fn()} />);

        const expandIcon = screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(expandIcon[0]);
        fireEvent.click(expandIcon[1]);
        const expandIcon1 = screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(expandIcon1[0]);
        fireEvent.click(expandIcon1[1]);
        fireEvent.click(expandIcon1[2]);
    });
});
