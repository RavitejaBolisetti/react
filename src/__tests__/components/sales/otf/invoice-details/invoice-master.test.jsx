import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { InvoiceDetailsMaster } from '@components/Sales/OTF/InvoiceDetails/InvoiceDetailsMaster';
import customRender from '@utils/test-utils';

const props = {
    invoiceData: [],
    fetchList: jest.fn(),
    isDataLoaded: false,
    listShowLoading: jest.fn(),
    showGlobalNotification: jest.fn(),
    handleButtonClick: jest.fn(),
    NEXT_ACTION: jest.fn(),
    section: { id: 10, title: 'Invoice Information', displayOnList: true },
    displaySection: { invoiceInformation: true, deliveryInformation: true },
    selectedOrder: { orderStatus: false },
};

describe('OTF Invoice Details render', () => {
    it('should render table details page', async () => {
        customRender(<InvoiceDetailsMaster {...props} />);
        screen.debug();
    });

    it('should render all text', () => {
        customRender(<InvoiceDetailsMaster {...props} />);

        const screenText = screen.getByText('Invoice Information');
        expect(screenText).toBeTruthy();

        const bookedText = screen.getByText('Booked');
        expect(bookedText).toBeTruthy();

        const allotedText = screen.getByText('Allotted');
        expect(allotedText).toBeTruthy();

        const invoicedText = screen.getByText('Invoiced');
        expect(invoicedText).toBeTruthy();

        const deliveredText = screen.getByText('Delivered');
        expect(deliveredText).toBeTruthy();

        const nextBtn = screen.getByRole('button', { name: 'Next' });
        fireEvent.click(nextBtn);
        expect(nextBtn).toBeTruthy();
    });
});
