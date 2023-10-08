import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { ThankYouMaster } from '@components/Sales/VehicleDeliveryNote/ThankYou/ThankYouMaster';
import customRender from '@utils/test-utils';

describe('ThankYouMaster Component', () => {
    const mockHandlePrintDownload = jest.fn();
    const record = { id: '123' };
    const selectedOrder = { orderStatus: 'I' };

    it('should render ThankYouMaster component with correct content', () => {
        customRender(<ThankYouMaster handlePrintDownload={mockHandlePrintDownload} record={record} selectedOrder={selectedOrder} soldByDealer={true} />);

        expect(screen.getByText('Delivery Note No.:')).toBeInTheDocument();
        expect(screen.getByText('Do you want to Print or download this Delivery Note')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Download/Print Note Note' })).toBeInTheDocument();
    });

    it('should call handlePrintDownload function when Download/Print Note button is clicked', () => {
        customRender(<ThankYouMaster handlePrintDownload={mockHandlePrintDownload} record={record} selectedOrder={selectedOrder} soldByDealer={true} />);

        const downloadPrintButton = screen.getByRole('button', { name: 'Download/Print Note Note' });
        fireEvent.click(downloadPrintButton);

        expect(mockHandlePrintDownload).toHaveBeenCalledWith(record);
    });
});
