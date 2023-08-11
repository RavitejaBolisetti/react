import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { InvoiceDetailsMaster } from '@components/Sales/OTF/InvoiceDetails/InvoiceDetailsMaster';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

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
    });

    it('should render all text', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTF: {
                    InvoiceDetail: {
                        data: [{ name: '1' }, { name: '2' }],
                        isLoaded: false,
                    },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <InvoiceDetailsMaster NEXT_ACTION={jest.fn()} selectedOrder={true} onChange={jest.fn()} {...props} />
            </Provider>
        );

        const screenText = screen.getByText('Invoice Information');
        expect(screenText).toBeTruthy();

        const bookedText = screen.getAllByText('Booked');
        expect(bookedText).toBeTruthy();

        const allotedText = screen.getAllByText('Allotted');
        expect(allotedText).toBeTruthy();

        const invoicedText = screen.getAllByText('Invoiced');
        expect(invoicedText).toBeTruthy();

        const deliveredText = screen.getAllByText('Delivered');
        expect(deliveredText).toBeTruthy();

        const nextBtn = screen.getAllByRole('button', { name: 'Next' });
        expect(nextBtn).toBeTruthy();
    });
});
