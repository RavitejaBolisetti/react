import '@testing-library/jest-dom/extend-expect';
import { VehicleInvoiceMaster } from '@components/Sales/VehicleInvoiceGeneration/VehicleInvoiceMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

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

describe('Vehicle Invoice Generation Master components', () => {
    it('should render components', () => {
        customRender(<VehicleInvoiceMaster />);
    });

    it('reset button should work', () => {
        customRender(<VehicleInvoiceMaster setFilterString={jest.fn()} />);

        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const resetBtn = screen.getByRole('button', { name: /Reset/i });
        fireEvent.click(resetBtn);
    });

    it('apply button should work', async () => {
        customRender(<VehicleInvoiceMaster setFilterString={jest.fn()} />);

        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);

        const fromDate = screen.getByRole('textbox', { name: 'Invoice From Date' });

        fireEvent.click(fromDate);

        const todayForFromDate = await screen.findByText('Today');

        fireEvent.click(todayForFromDate);

        const toDate = screen.getByRole('textbox', { name: 'Invoice To Date' });

        fireEvent.click(toDate);

        const todayToFromDate = await screen.findAllByText('Today');

        fireEvent.click(todayToFromDate[1]);

        const searchBtn = screen.getByRole('button', { name: /apply/i });
        fireEvent.click(searchBtn);
    });

    it('test for closing the advance filter', () => {
        customRender(<VehicleInvoiceMaster />);

        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const closeBtn = screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeBtn);
    });

    it('clear button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleInvoiceGeneration: {
                    VehicleInvoiceSearchList: { filter: { advanceFilter: 'Test', fromDate: '06/06/2022', toDate: '06/06/2022' } },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehicleInvoiceMaster fetchList={jest.fn()} setFilterString={jest.fn()} />
            </Provider>
        );

        const advanceFilter = screen.getByPlaceholderText(/Search/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });

        const clearBtn = screen.getByRole('button', { name: /clear/i });
        fireEvent.click(clearBtn);
    });

    it('should be able to search value', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleInvoiceGeneration: {
                    VehicleInvoiceSearchList: { filter: { advanceFilter: 'Test', fromDate: '06/06/2022', toDate: '06/06/2022', key: 'searchParam' } },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehicleInvoiceMaster fetchList={jest.fn()} setFilterString={jest.fn()} />
            </Provider>
        );

        const advanceFilter = screen.getByPlaceholderText(/Search/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });
        const removeFilter = screen.getAllByTestId('removeFilter');
        fireEvent.click(removeFilter[0]);
    });

    it('query buttons should work', async () => {
        customRender(<VehicleInvoiceMaster />);

        const cancelledBtn = screen.getByRole('button', { name: 'Cancelled' });
        fireEvent.click(cancelledBtn);

        const invoiced = screen.getByRole('button', { name: 'Invoiced' });
        fireEvent.click(invoiced);
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

        const saveAndNext = screen.getByRole('button', { name: /continue/i });
        fireEvent.click(saveAndNext);
    });

    jest.setTimeout(50000);
    it('irn generation should work', async () => {
        const mockStore = createMockStore(mockData);

        const fetchList = jest.fn();
        const irnGeneration = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <VehicleInvoiceMaster fetchList={fetchList} resetDetailData={jest.fn()} irnGeneration={irnGeneration} fetchInvoiceMasterData={jest.fn()} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();

        await waitFor(() => {
            expect(screen.getByText(/106/i)).toBeInTheDocument();
        });

        const viewBtn = screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const closeBtn = screen.getAllByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn[1]);
    });
});
