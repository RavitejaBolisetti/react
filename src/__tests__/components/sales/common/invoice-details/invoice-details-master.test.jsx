/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent, act } from '@testing-library/react';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { InvoiceDetailsMaster } from 'components/Sales/Common/InvoiceDetails';

describe('Invoice Detail Master component render', () => {

    it('should render invoice detail master component', async () => {
        customRender(<InvoiceDetailsMaster />);
    });

    it('invoice details collapse should work', async () => {

        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTF: {
                    InvoiceDetail: { isLoaded: true, data: { invoiceDetails: [{ invoiceNumber: 106, invoiceDate: '01/01/2001', invoiceStatus: 'Active' }]} },
                },
            },
        });

        const props={ selectedOrder:{ orderStatus: 'I' }, selectedOrderId: 106 }

        customRender(
            <Provider store={mockStore}>
                <InvoiceDetailsMaster {...props} />
            </Provider>
        );
        
        const invoiceInformation=screen.getByRole('img', { name: 'minus' });
        fireEvent.click(invoiceInformation);
    });

    it('delivery details collapse should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTF: {
                    InvoiceDetail: { isLoaded: true, data: { deliveryDetails: [{ deliveryNoteNumber: 106, deliveryNoteDate: '01/01/2001', deliveryNoteStatus: 'Active' }]} },
                },
            },
        });

        const props={ selectedOrder:{ orderStatus: 'D' }, selectedOrderId: 106 }

        customRender(
            <Provider store={mockStore}>
                <InvoiceDetailsMaster {...props} />
            </Provider>
        );

        const deliveryInformation=screen.getByRole('img', { name: 'plus' });
        fireEvent.click(deliveryInformation);
    });

    it('next button should work', async () => {

        customRender(<InvoiceDetailsMaster handleButtonClick={jest.fn()} />);

        const nextBtn=screen.getByRole('button', { name: 'Next' });
        fireEvent.click(nextBtn);

    });

});