/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { VehicleInvoiceMaster } from 'components/Sales';

jest.mock('store/actions/data/invoiceGeneration/vehicleInvoiceGeneration', () => ({
    vehicleInvoiceDataActions: {
        innerDataActions: {
            fetchList: jest.fn(),
        },
    },
}));

jest.mock('store/actions/data/invoiceGeneration/irnGeneration', () => ({
    vehicleIrnGenerationDataActions: {},
}));

jest.mock('store/actions/data/invoiceGeneration/vehicleInvoice', () => ({
    vehicleInvoiceGenerationDataActions: {},
}));

const mockData = {
    auth: { userId: 106 },
    data: {
        ConfigurableParameterEditing: {
            filteredListData: {
                INVOICE_CANCEL_REASON: [{ key: 106, value: 'Reason-1' }],
                INV_SER: [{ key: 'Name', value: 'Name' }],
                YES_NO_FLG: [{ key: 'Yes', value: 'Yes' }],
            },
        },
        VehicleInvoiceGeneration: {
            VehicleInvoiceSearchList: {
                isLoaded: true,
                data: {
                    paginationData: [{ invoiceNumber: '106' }],
                },
                filter: { advanceFilter: true, searchType: 'Name', searchParam: 'Name', fromDate: '01/01/2000', toDate: '01/01/2023', digitalSignature: 'Yes' },
            },
        },
    },
};

describe('Vehicle Invoice Master component render', () => {
    it('should render vehicle invoice master component', async () => {
        customRender(<VehicleInvoiceMaster />);
    });

    jest.setTimeout(50000);
    it('irn generation should work', async () => {
        const mockStore = createMockStore(mockData);

        const fetchList = jest.fn();
        const irnGeneration = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <VehicleInvoiceMaster fetchList={fetchList} irnGeneration={irnGeneration} fetchInvoiceMasterData={jest.fn()} />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText(/106/i)).toBeInTheDocument();
        });

        const viewBtn = screen.getByTestId('view');
        fireEvent.click(viewBtn);

        await waitFor(() => expect(irnGeneration).toHaveBeenCalled());

        irnGeneration.mock.calls[0][0].onSuccess();
        irnGeneration.mock.calls[0][0].onError();

        const closeBtn = screen.getAllByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn[1]);
    });

    it('should render all components', async () => {
        const mockStore = createMockStore(mockData);

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <VehicleInvoiceMaster fetchList={fetchList} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();

        await waitFor(() => {
            expect(screen.getByText(/106/i)).toBeInTheDocument();
        });
    });

    it('add new invoice should work', async () => {
        customRender(<VehicleInvoiceMaster fetchInvoiceMasterData={jest.fn()} resetDetailData={jest.fn()} />);

        const addBtn = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);

        const otfDetailsCollapse = screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(otfDetailsCollapse[1]);

        const bookingNumber = screen.getByRole('textbox', { name: 'Booking Number' });
        fireEvent.change(bookingNumber, { target: { value: 'Kai' } });

        const searchBtn = screen.getAllByRole('button', { name: 'search' });
        fireEvent.click(searchBtn[1]);

        const minusCollapseBtns = screen.getAllByRole('img', { name: 'minus' });
        fireEvent.click(minusCollapseBtns[1]);

        const saveAndNext = screen.getByRole('button', { name: 'Continue' });
        fireEvent.click(saveAndNext);
    });

    it('query buttons should work', async () => {
        customRender(<VehicleInvoiceMaster />);

        const cancelledBtn = screen.getByRole('button', { name: 'Cancelled' });
        fireEvent.click(cancelledBtn);

        const invoiced = screen.getByRole('button', { name: 'Invoiced' });
        fireEvent.click(invoiced);
    });

    jest.setTimeout(20000);
    it('cancel invoice should work', async () => {
        const mockStore = createMockStore(mockData);

        const fetchList = jest.fn();
        const cancelInvoice = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <VehicleInvoiceMaster fetchList={fetchList} cancelInvoice={cancelInvoice} onErrorAction={jest.fn()} fetchInvoiceMasterData={jest.fn()} resetDetailData={jest.fn()} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();

        await waitFor(() => {
            expect(screen.getByText(/106/i)).toBeInTheDocument();
        });

        const viewBtn = screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const cancelInvoiceBtn = screen.getByRole('button', { name: 'Cancel Invoice' });
        fireEvent.click(cancelInvoiceBtn);

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);

        fireEvent.click(cancelInvoiceBtn);

        const reasonForCancellation = screen.getByRole('combobox', { name: 'Reason for Cancellation' });
        fireEvent.change(reasonForCancellation, { target: { value: 'Reason-1' } });

        const submitCancelReq = screen.getByRole('button', { name: 'Submit' });
        fireEvent.click(submitCancelReq);

        fireEvent.click(screen.getByText('Reason-1'));

        fireEvent.click(submitCancelReq);

        await waitFor(() => expect(cancelInvoice).toHaveBeenCalled());
        cancelInvoice.mock.calls[0][0].onSuccess();
        cancelInvoice.mock.calls[0][0].onError();
    });

    it('advance search should work', async () => {
        const mockStore = createMockStore(mockData);

        customRender(
            <Provider store={mockStore}>
                <VehicleInvoiceMaster fetchList={jest.fn()} setFilterString={jest.fn()} />
            </Provider>
        );

        const searchType = screen.getByRole('combobox', { name: '' });
        fireEvent.change(searchType, { target: { value: 'Name' } });

        const searchBox = screen.getByRole('textbox', { name: '' });
        fireEvent.change(searchBox, { target: { value: 'Kai' } });

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);

        const clearBtn = screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(clearBtn);
    });

    it('advanced filters should work', async () => {
        customRender(<VehicleInvoiceMaster setFilterString={jest.fn()} />);

        const advancedFilters = screen.getByRole('button', { name: 'Advanced Filters' });
        fireEvent.click(advancedFilters);

        const resetBtn = screen.getByRole('button', { name: 'Reset' });
        fireEvent.click(resetBtn);

        const invoiceFromDate = screen.getByRole('textbox', { name: 'Invoice From Date' });
        fireEvent.click(invoiceFromDate);

        const fromDate = screen.getByText('13');
        fireEvent.click(fromDate);

        const invoiceToDate = screen.getByRole('textbox', { name: 'Invoice To Date' });
        fireEvent.click(invoiceToDate);

        const toDate = screen.getAllByText('14');
        fireEvent.click(toDate[1]);

        const applyBtn = screen.getByRole('button', { name: 'Apply' });
        fireEvent.click(applyBtn);
    });

    it('collapse should work with otf details in invoice details', async () => {
        const mockStore = createMockStore(mockData);

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <VehicleInvoiceMaster fetchList={fetchList} fetchInvoiceMasterData={jest.fn()} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();

        await waitFor(() => {
            expect(screen.getByText(/106/i)).toBeInTheDocument();
        });

        const viewBtn = screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const plusCollapseBtns = screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(plusCollapseBtns[1]);

        const minusCollapseBtns = screen.getByRole('img', { name: 'minus' });
        fireEvent.click(minusCollapseBtns);
    });
});
