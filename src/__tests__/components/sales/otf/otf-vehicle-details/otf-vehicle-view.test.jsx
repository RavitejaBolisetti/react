import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { ViewDetail } from '@components/Sales/OTF/VehicleDetails/ViewDetail';
import customRender from '@utils/test-utils';

const props = {
    formData: {},
    isLoading: false,
    activeKey: [],
    onChange: jest.fn(),
    tooltTipText: undefined,
};
describe('Booking finance view Details render', () => {
    it('should render view details page', async () => {
        customRender(<ViewDetail {...props} />);
        screen.debug();
    });

    it('should render text fields', async () => {
        customRender(<ViewDetail {...props} />);

        const vehicleInfo = screen.getByText('Vehicle Information');
        fireEvent.click(vehicleInfo);
        expect(vehicleInfo).toBeTruthy();

        const taxDetails = screen.getByText('Tax Details');
        fireEvent.click(taxDetails);
        expect(taxDetails).toBeTruthy();

        const charges = screen.getByText('Optional Services');
        fireEvent.click(charges);
        expect(charges).toBeTruthy();

        const plusBtn = screen.getAllByRole('img', { name: /plus/i });
        fireEvent.click(plusBtn[0]);
        fireEvent.click(plusBtn[1]);
        fireEvent.click(plusBtn[2]);
    });
});
