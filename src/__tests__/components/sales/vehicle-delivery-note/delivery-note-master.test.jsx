import '@testing-library/jest-dom/extend-expect';
import { VehicleDeliveryNoteMaster } from '@components/Sales/VehicleDeliveryNote/VehicleDeliveryNoteMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/vehicleDeliveryNote/vehicleDeliveryNote', () => ({
    vehicleDeliveryNoteDataActions: {},
}));

describe('Vehicle Delivery Note Master components', () => {
    it('should render components', () => {
        customRender(<VehicleDeliveryNoteMaster />);

        const pendingBtn = screen.getAllByRole('button', { name: /Pending/i });
        fireEvent.click(pendingBtn[0]);

        const generatedBtn = screen.getAllByRole('button', { naem: /Generated/i });
        fireEvent.click(generatedBtn[0]);

        const cancelledBtn = screen.getAllByRole('button', { naem: /Cancelled/i });
        fireEvent.click(cancelledBtn[0]);
    });
    it('On successAction and On closeAction should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleDeliveryNote: {
                    VehicleDeliveryNoteSearchList: { filter: { advanceFilter: 'Test', invoiceFromDate: '06/06/2022', invoiceToDate: '06/06/2022', deliveryNoteFromDate: '06/06/2022', deliveryNoteToDate: '06/06/2022', key: 'searchParam' } },
                },
            },
        });

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <VehicleDeliveryNoteMaster fetchList={fetchList} setFilterString={jest.fn()} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();
    });

    it('reset button should work', () => {
        customRender(<VehicleDeliveryNoteMaster setFilterString={jest.fn()} />);

        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const resetBtn = screen.getByRole('button', { name: /Reset/i });
        fireEvent.click(resetBtn);
    });

    it('test for closing the advance filter', () => {
        customRender(<VehicleDeliveryNoteMaster />);

        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const closeBtn = screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeBtn);

        const addBtn = screen.getByRole('button', { name: /Add/i });
        fireEvent.click(addBtn);
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
                <VehicleDeliveryNoteMaster fetchList={jest.fn()} setFilterString={jest.fn()} />
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
                <VehicleDeliveryNoteMaster fetchList={jest.fn()} setFilterString={jest.fn()} />
            </Provider>
        );

        const advanceFilter = screen.getByPlaceholderText(/Search/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });
        const removeFilter = screen.getAllByTestId('removeFilter');
        fireEvent.click(removeFilter[0]);
    });
});
