import '@testing-library/jest-dom/extend-expect';
import { VehicleDeliveryNoteMaster } from 'components/Sales/VehicleDeliveryNote/VehicleDeliveryNoteMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/vehicleDeliveryNote/vehicleDeliveryNote', () => ({
    vehicleDeliveryNoteDataActions: {},
}));

describe('Vehicle Delivery Note Master components', () => {

    it('view and close button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleDeliveryNote: {
                    VehicleDeliveryNoteSearchList: { data: { deliveryNoteDetails: [{ vehicleSoldByDealer: true, customerName: 'Kai', modelGroup: 'Model', vehicleDeliveryNote: 'Vehicle', invoiceId: 106 }] }, filter: { advanceFilter: 'Test', invoiceFromDate: '06/06/2022', invoiceToDate: '06/06/2022', deliveryNoteFromDate: '06/06/2022', deliveryNoteToDate: '06/06/2022', key: 'searchParam' } },
                },
            },
        });

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <VehicleDeliveryNoteMaster fetchList={fetchList} setFilterString={jest.fn()} resetDeliveryNoteMasterData={jest.fn()} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onErrorAction();
        fetchList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => { expect(screen.getByText('Kai')).toBeInTheDocument() });

        const cancelledBtn = screen.getByRole('button', { name: /Cancelled/i });
        fireEvent.click(cancelledBtn);

        const viewBtn=screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const closeBtn=screen.getAllByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn[1]);

        fireEvent.click(viewBtn);

        const nextBtn=screen.getByRole('button', { name: 'Next' });
        fireEvent.click(nextBtn);
        
    });

    it('print delivery note button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleDeliveryNote: {
                    VehicleDeliveryNoteSearchList: { data: { deliveryNoteDetails: [{deliveryNoteStatus: 'D', vehicleSoldByDealer: true, customerName: 'Kai', modelGroup: 'Model', vehicleDeliveryNote: 'Vehicle', invoiceId: 106}] }, filter: { advanceFilter: 'Test', invoiceFromDate: '06/06/2022', invoiceToDate: '06/06/2022', deliveryNoteFromDate: '06/06/2022', deliveryNoteToDate: '06/06/2022', key: 'searchParam' } },
                },
            },
        });

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <VehicleDeliveryNoteMaster fetchDeliveryNoteMasterData={jest.fn()} fetchList={fetchList} setFilterString={jest.fn()} resetDeliveryNoteMasterData={jest.fn()} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onErrorAction();
        fetchList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => { expect(screen.getByText('Kai')).toBeInTheDocument() });

        const cancelledBtn = screen.getByRole('button', { name: /Generated/i });
        fireEvent.click(cancelledBtn);

        const viewBtn=screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const printDelivery=screen.getByRole('button', { name: 'Print Delivery Note' });
        fireEvent.click(printDelivery);

        const cancelDelivery=screen.getByRole('button', { name: 'Cancel Delivery Note' });
        fireEvent.click(cancelDelivery);
        
    });

    it('cancel delivery note button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleDeliveryNote: {
                    VehicleDeliveryNoteSearchList: { data: { deliveryNoteDetails: [{deliveryNoteStatus: 'D', vehicleSoldByDealer: true, customerName: 'Kai', modelGroup: 'Model', vehicleDeliveryNote: 'Vehicle', invoiceId: 106}] }, filter: { advanceFilter: 'Test', invoiceFromDate: '06/06/2022', invoiceToDate: '06/06/2022', deliveryNoteFromDate: '06/06/2022', deliveryNoteToDate: '06/06/2022', key: 'searchParam' } },
                },
            },
        });

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <VehicleDeliveryNoteMaster fetchDeliveryNoteMasterData={jest.fn()} fetchList={fetchList} setFilterString={jest.fn()} resetDeliveryNoteMasterData={jest.fn()} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onErrorAction();
        fetchList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => { expect(screen.getByText('Kai')).toBeInTheDocument() });

        const cancelledBtn = screen.getByRole('button', { name: /Generated/i });
        fireEvent.click(cancelledBtn);

        const viewBtn=screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const cancelDelivery=screen.getByRole('button', { name: 'Cancel Delivery Note' });
        fireEvent.click(cancelDelivery);
        
    });

    it('add and continue button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleDeliveryNote: {
                    VehicleDeliveryNoteSearchList: { data: { deliveryNoteDetails: [{ vehicleSoldByDealer: true, customerName: 'Kai', modelGroup: 'Model', vehicleDeliveryNote: 'Vehicle', invoiceId: 106 }] }, filter: { advanceFilter: 'Test', invoiceFromDate: '06/06/2022', invoiceToDate: '06/06/2022', deliveryNoteFromDate: '06/06/2022', deliveryNoteToDate: '06/06/2022', key: 'searchParam' } },
                },
            },
        });

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <VehicleDeliveryNoteMaster fetchList={fetchList} setFilterString={jest.fn()} resetDeliveryNoteMasterData={jest.fn()} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onErrorAction();
        fetchList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => { expect(screen.getByText('Kai')).toBeInTheDocument() });

        const plusBtn=screen.getByRole('button', { name: 'fa-add' });
        fireEvent.click(plusBtn);

        const continueBtn=screen.getByRole('button', { name: 'Continue' });
        fireEvent.click(continueBtn);
        
    });

    it('add button should work', () => {
        customRender(<VehicleDeliveryNoteMaster setFilterString={jest.fn()} resetDeliveryNoteMasterData={jest.fn()} />);

        const pendingBtn = screen.getByRole('button', { name: /Pending/i });
        fireEvent.click(pendingBtn);

        const generatedBtn = screen.getByRole('button', { name: /Generated/i });
        fireEvent.click(generatedBtn);

        const cancelledBtn = screen.getByRole('button', { name: /Cancelled/i });
        fireEvent.click(cancelledBtn);
    });

    it('reset button should work', () => {
        customRender(<VehicleDeliveryNoteMaster setFilterString={jest.fn()} resetDeliveryNoteMasterData={jest.fn()} />);

        const advanceFilter = screen.getByRole('button', { name: /Advance Filters/i });
        fireEvent.click(advanceFilter);
        const resetBtn = screen.getByRole('button', { name: /Reset/i });
        fireEvent.click(resetBtn);
    });

    it('test for closing the advance filter', () => {
        customRender(<VehicleDeliveryNoteMaster resetDeliveryNoteMasterData={jest.fn()} setFilterString={jest.fn()} />);

        const advanceFilter = screen.getByRole('button', { name: /Advance Filters/i });
        fireEvent.click(advanceFilter);
        const closeBtn = screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeBtn);
    });

    it('clear button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleDeliveryNote: {
                    VehicleDeliveryNoteSearchList: { filter: { advanceFilter: 'Test', invoiceFromDate: '06/06/2022', invoiceToDate: '06/06/2022', deliveryNoteFromDate: '06/06/2022', deliveryNoteToDate: '06/06/2022', key: 'searchParam' } },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehicleDeliveryNoteMaster fetchList={jest.fn()} setFilterString={jest.fn()} resetDeliveryNoteMasterData={jest.fn()} />
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
                VehicleDeliveryNote: {
                    VehicleDeliveryNoteSearchList: { filter: { advanceFilter: 'Test', invoiceFromDate: '06/06/2022', invoiceToDate: '06/06/2022', deliveryNoteFromDate: '06/06/2022', deliveryNoteToDate: '06/06/2022', key: 'searchParam' } },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehicleDeliveryNoteMaster fetchList={jest.fn()} setFilterString={jest.fn()} resetDeliveryNoteMasterData={jest.fn()} />
            </Provider>
        );

        const advanceFilter = screen.getByPlaceholderText(/Search/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });
        const removeFilter = screen.getAllByTestId('removeFilter');
        fireEvent.click(removeFilter[0]);
    });

    it('Advance Filters should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleDeliveryNote: {
                    VehicleDeliveryNoteSearchList: { filter: { advanceFilter: 'Test', invoiceFromDate: '06/06/2022', invoiceToDate: '06/06/2022', deliveryNoteFromDate: '06/06/2022', deliveryNoteToDate: '06/06/2022', key: 'searchParam' } },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehicleDeliveryNoteMaster fetchList={jest.fn()} setFilterString={jest.fn()} resetDeliveryNoteMasterData={jest.fn()} />
            </Provider>
        );

        const advanceFilter = screen.getByRole('button', { name: /Advance Filters/i });
        fireEvent.click(advanceFilter);

        const fromDate = screen.getByRole('textbox', { name: 'Invoice From Date' });
        fireEvent.click(fromDate);
        const todayForFromDate = await screen.findByText('Today');
        fireEvent.click(todayForFromDate);

        const toDate = screen.getByRole('textbox', { name: 'Invoice To Date' });
        fireEvent.click(toDate);
        const todayToFromDate = await screen.findAllByText('Today');
        fireEvent.click(todayToFromDate[1]);

        const resetBtn = screen.getByRole('button', { name: /apply/i });
        fireEvent.click(resetBtn);
    });
});
