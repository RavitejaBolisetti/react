import React from 'react';
import { screen } from '@testing-library/react';
import { InvoiceDetailsMaster } from '@components/Sales/OTF/InvoiceDetails/InvoiceDetailsMaster';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

beforeEach(() => {
    jest.clearAllMocks();
});

const props = {
    invoiceData: [],
    fetchList: jest.fn(),
    isDataLoaded: false,
    listShowLoading: jest.fn(),
    showGlobalNotification: jest.fn(),
    handleButtonClick: jest.fn(),
    userId: '12',
    NEXT_ACTION: jest.fn(),
    section: { id: 10, title: 'Invoice Information', displayOnList: true },
    displaySection: { invoiceInformation: true, deliveryInformation: true },
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
                        isLoaded: true,
                        data: [{ name: '1' }, { name: '2' }],
                    },
                },
            },
        });
        const selectedOrder = { orderStatus: true };

        customRender(
            <Provider store={mockStore}>
                <InvoiceDetailsMaster NEXT_ACTION={jest.fn()} selectedOrder={selectedOrder} selectedOrderId={'123'} userId={'123'} onChange={jest.fn()} onFinish={jest.fn()} {...props} />
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
