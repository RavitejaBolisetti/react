import '@testing-library/jest-dom/extend-expect';
import { VehicleInvoiceMaster } from '@components/Sales/VehicleInvoiceGeneration/VehicleInvoiceMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/invoiceGeneration/irnGeneration', () => ({
    vehicleIrnGenerationDataActions: {},
}));

jest.mock('store/actions/data/sales/vehicleInvoiceGeneration', () => ({
    vehicleInvoiceGenerationDataActions: {},
}));

jest.mock('store/actions/data/otf/salesConsultant', () => ({
    salesConsultantActions: {},
}));

jest.mock('store/actions/data/otf/vehicleDetails', () => ({
    otfvehicleDetailsDataActions: {},
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
                    paginationData: [{ bookingNumber: 'OTF23D002075', customerName: 'SHAHID', digitalSignature: 'N', id: '1a6cc630-db19-480e-a5eb-59aa5ed2fcf1', invoiceDate: '2023-10-25', invoiceNumber: 'INV24D010001', invoiceStatus: 'I', mobileNumber: '9820767616', modelDescription: 'XUV700 AX7 DSL AT 7 SEATER BLK', otfId: '61c55e70-600c-4253-9725-3890e5f641a5', otfNumber: 'OTF23D002075' }],
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
        customRender(<VehicleInvoiceMaster setFilterString={jest.fn()} />);

        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const closeBtn = screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeBtn);
    });

    it('clear button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Sales: {
                    VehicleInvoiceGeneration: { filter: { advanceFilter: 'Test', fromDate: '06/06/2022', toDate: '06/06/2022' } },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehicleInvoiceMaster advanceFilter={true} fetchList={jest.fn()} setFilterString={jest.fn()} fetchSalesConsultant={jest.fn()} />
            </Provider>
        );

        const advanceFilter = screen.getByPlaceholderText(/Search/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });
        const removeFilter = screen.getAllByTestId('removeFilter');
        fireEvent.click(removeFilter[0]);

        const clearBtn = screen.getByRole('button', { name: /Clear/i });
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
                <VehicleInvoiceMaster fetchList={jest.fn()} setFilterString={jest.fn()} fetchSalesConsultant={jest.fn()} />
            </Provider>
        );

        const advanceFilter = screen.getByPlaceholderText(/Search/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });
        const removeFilter = screen.getByRole('img', { name: /close-circle/i });
        fireEvent.click(removeFilter);
    });

    it('query buttons should work', async () => {
        customRender(<VehicleInvoiceMaster setFilterString={jest.fn()} />);

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

    it('Should click on view button and close Action call', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            data: {
                Sales: {
                    VehicleInvoiceGeneration: {
                        data: {
                            paginationData: [
                                {
                                    bookingNumber: 'OTF23D002075',
                                    customerName: 'SHAHID',
                                    digitalSignature: 'N',
                                    id: '1a6cc630-db19-480e-a5eb-59aa5ed2fcf1',
                                    invoiceDate: '2023-10-25',
                                    invoiceNumber: 'INV24D010001',
                                    invoiceStatus: 'I',
                                    mobileNumber: '9820767616',
                                    modelDescription: 'XUV700 AX7 DSL AT 7 SEATER BLK',
                                    otfId: '61c55e70-600c-4253-9725-3890e5f641a5',
                                    otfNumber: 'OTF23D002075',
                                },
                            ],
                        },
                    },
                },
            },
        });

        const fetchList = jest.fn();
        const irnGeneration = jest.fn();
        const fetchVehcileDetail = jest.fn();
        const fetchInvoiceMasterData = jest.fn();
        const fetchOTFDetail = jest.fn();
        const fetchSalesConsultant = jest.fn();
        const fetchData = jest.fn();
        const saveData = jest.fn();
        const buttonData = { viewBtn: true };

        customRender(
            <Provider store={mockStore}>
                <VehicleInvoiceMaster fetchList={fetchList} buttonData={buttonData} saveData={saveData} fetchData={fetchData} fetchSalesConsultant={fetchSalesConsultant} fetchVehcileDetail={fetchVehcileDetail} fetchOTFDetail={fetchOTFDetail} fetchInvoiceMasterData={fetchInvoiceMasterData} resetDetailData={jest.fn()} irnGeneration={irnGeneration} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onErrorAction();

        fetchList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => {
            expect(screen.getByText('SHAHID')).toBeInTheDocument();
        });

        const viewBtn = screen.getByRole('button', { name: /ai-view/i });

        fireEvent.click(viewBtn);

        const closeBtn = screen.getAllByRole('button', { name: /close/i });
        fireEvent.click(closeBtn[1]);
    });

    it('test2', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            data: {
                Sales: {
                    VehicleInvoiceGeneration: {
                        data: {
                            paginationData: [
                                {
                                    bookingNumber: 'OTF23D002075',
                                    customerName: 'SHAHID',
                                    digitalSignature: 'N',
                                    id: '1a6cc630-db19-480e-a5eb-59aa5ed2fcf1',
                                    invoiceDate: '2023-10-25',
                                    invoiceNumber: 'INV24D010001',
                                    invoiceStatus: 'I',
                                    mobileNumber: '9820767616',
                                    modelDescription: 'XUV700 AX7 DSL AT 7 SEATER BLK',
                                    otfId: '61c55e70-600c-4253-9725-3890e5f641a5',
                                    otfNumber: 'OTF23D002075',
                                },
                            ],
                        },
                    },
                },
            },
        });

        const fetchList = jest.fn();
        const irnGeneration = jest.fn();
        const fetchVehcileDetail = jest.fn();
        const fetchInvoiceMasterData = jest.fn();
        const fetchOTFDetail = jest.fn();
        const fetchSalesConsultant = jest.fn();
        const fetchData = jest.fn();
        const saveData = jest.fn();
        const buttonData = { viewBtn: true };

        customRender(
            <Provider store={mockStore}>
                <VehicleInvoiceMaster fetchList={fetchList} buttonData={buttonData} saveData={saveData} fetchData={fetchData} fetchSalesConsultant={fetchSalesConsultant} fetchVehcileDetail={fetchVehcileDetail} fetchOTFDetail={fetchOTFDetail} fetchInvoiceMasterData={fetchInvoiceMasterData} resetDetailData={jest.fn()} irnGeneration={irnGeneration} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onErrorAction();

        fetchList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => {
            expect(screen.getByText('SHAHID')).toBeInTheDocument();
        });

        const viewBtn = screen.getByRole('button', { name: /ai-view/i });

        fireEvent.click(viewBtn);

        const cancelBtn = screen.getByRole('button', { name: /print form 21/i });
        fireEvent.click(cancelBtn);

        const closeBtn = screen.getAllByRole('img', { name: /close/i });
        fireEvent.click(closeBtn[1]);
    });
    it('test3', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            data: {
                Sales: {
                    VehicleInvoiceGeneration: {
                        data: {
                            paginationData: [
                                {
                                    bookingNumber: 'OTF23D002075',
                                    customerName: 'SHAHID',
                                    digitalSignature: 'N',
                                    id: '1a6cc630-db19-480e-a5eb-59aa5ed2fcf1',
                                    invoiceDate: '2023-10-25',
                                    invoiceNumber: 'INV24D010001',
                                    invoiceStatus: 'I',
                                    mobileNumber: '9820767616',
                                    modelDescription: 'XUV700 AX7 DSL AT 7 SEATER BLK',
                                    otfId: '61c55e70-600c-4253-9725-3890e5f641a5',
                                    otfNumber: 'OTF23D002075',
                                },
                            ],
                        },
                    },
                },
            },
        });

        const fetchList = jest.fn();
        const irnGeneration = jest.fn();
        const fetchVehcileDetail = jest.fn();
        const fetchInvoiceMasterData = jest.fn();
        const fetchOTFDetail = jest.fn();
        const fetchSalesConsultant = jest.fn();
        const fetchData = jest.fn();
        const saveData = jest.fn();
        const buttonData = { viewBtn: true };

        customRender(
            <Provider store={mockStore}>
                <VehicleInvoiceMaster fetchList={fetchList} buttonData={buttonData} saveData={saveData} fetchData={fetchData} fetchSalesConsultant={fetchSalesConsultant} fetchVehcileDetail={fetchVehcileDetail} fetchOTFDetail={fetchOTFDetail} fetchInvoiceMasterData={fetchInvoiceMasterData} resetDetailData={jest.fn()} irnGeneration={irnGeneration} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onErrorAction();

        fetchList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => {
            expect(screen.getByText('SHAHID')).toBeInTheDocument();
        });

        const viewBtn = screen.getByRole('button', { name: /ai-view/i });

        fireEvent.click(viewBtn);

        const cancelBtn = screen.getByRole('button', { name: /print invoice/i });
        fireEvent.click(cancelBtn);

        const closeBtn = screen.getAllByRole('img', { name: /close/i });
        fireEvent.click(closeBtn[1]);
    });
});
