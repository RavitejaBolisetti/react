import '@testing-library/jest-dom/extend-expect';
import { VehicleReceiptMaster } from '@components/Sales/VehicleReceipt/VehicleReceiptMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Term Condition Manufacturer Master components', () => {
    it('should render components', () => {
        customRender(<VehicleReceiptMaster />);
    });

    it('should click buttons', () => {
        customRender(<VehicleReceiptMaster sectionName={'vehicle'} ADD_ACTION={true} handleButtonClick={jest.fn()} setSearchValue={jest.fn()} />);

        const inTransit = screen.getByRole('button', { name: 'In-Transit' });
        fireEvent.click(inTransit);

        const partialBtn = screen.getByRole('button', { name: 'Partially Received' });
        fireEvent.click(partialBtn);

        const recivedBtn = screen.getByRole('button', { name: 'Received' });
        fireEvent.click(recivedBtn);

        const returnedBtn = screen.getByRole('button', { name: 'Returned' });
        fireEvent.click(returnedBtn);

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);

        const leftBtn = screen.getByRole('button', { name: 'left' });
        fireEvent.click(leftBtn);

        const rightBtn = screen.getByRole('button', { name: 'right' });
        fireEvent.click(rightBtn);

        const adFilter = screen.getByRole('button', { name: 'Advanced Filters' });
        fireEvent.click(adFilter);
    });

    it('reset button should work', () => {
        customRender(<VehicleReceiptMaster />);

        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const resetBtn = screen.getByRole('button', { name: /Reset/i });
        fireEvent.click(resetBtn);
    });

    it('test for closing the advance filter', () => {
        customRender(<VehicleReceiptMaster />);

        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const closeBtn = screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeBtn);
    });

    it('clear button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleReceipt: {
                    VehicleReceiptSearch: { filter: { advanceFilter: 'Test', grnFromDate: '06/06/2022' } },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehicleReceiptMaster />
            </Provider>
        );

        const advanceFilter = screen.getByPlaceholderText(/Search GRN No./i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });

        const clearBtn = screen.getByRole('button', { name: /Clear/i });
        fireEvent.click(clearBtn);
    });

    it('should be able to search value', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleReceipt: {
                    VehicleReceiptSearch: { filter: { advanceFilter: 'Test', grnFromDate: '06/06/2022', key: 'searchParam' } },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehicleReceiptMaster />
            </Provider>
        );

        const advanceFilter = screen.getByPlaceholderText(/Search GRN No./i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });
        const removeFilter = screen.getByTestId('removeFilter');
        fireEvent.click(removeFilter);
    });

    it('test for apply button', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleReceipt: {
                    VehicleReceiptSearch: { filter: { advanceFilter: 'Test', grnFromDate: '06/06/2022', grnToDate: '06/06/2022', grnType: 'kai', key: 'searchParam' } },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehicleReceiptMaster />
            </Provider>
        );

        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);

        const fromDate = screen.getByRole('textbox', { name: 'GRN From Date' });
        fireEvent.click(fromDate);
        const todayForFromDate = await screen.findByText('Today');
        fireEvent.click(todayForFromDate);

        const toDate = screen.getByRole('textbox', { name: 'GRN To Date' });
        fireEvent.click(toDate);
        const todayToFromDate = await screen.findAllByText('Today');
        fireEvent.click(todayToFromDate[1]);

        const resetBtn = screen.getByRole('button', { name: /apply/i });
        fireEvent.click(resetBtn);
    });
});
