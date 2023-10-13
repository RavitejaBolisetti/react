import React from 'react';
import { ReceiptMaster } from 'components/Sales/Receipts/ReceiptMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/receipt/receipt', () => ({
    receiptDataActions: {},
}));

jest.mock('store/actions/data/receipt/cancelReceipt', () => ({
    cancelReceiptDataActions: {},
}));

jest.mock('store/actions/data/receipt/receiptDetails', () => ({
    receiptDetailDataActions: {},
}));

describe('Receipts Component', () => {
    it('should render Receipts master component UI', () => {
        customRender(<ReceiptMaster sectionName={'party'} setFilterString={jest.fn()} resetData={jest.fn()} />);

        const openedBtn = screen.getByRole('button', { name: 'Opened' });
        fireEvent.click(openedBtn);

        const apportionBtn = screen.getByRole('button', { name: 'Apportion' });
        fireEvent.click(apportionBtn);

        const cancelledBtn = screen.getByRole('button', { name: 'Cancelled' });
        fireEvent.click(cancelledBtn);

        const leftBtn = screen.getByRole('button', { name: 'left' });
        fireEvent.click(leftBtn);

        const rightBtn = screen.getByRole('button', { name: 'right' });
        fireEvent.click(rightBtn);

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);
    });

    it('should render Receipts master component UI', () => {
        customRender(<ReceiptMaster sectionName={'party'} setFilterString={jest.fn()} resetData={jest.fn()} />);

        const addBtn = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);

        const closeBtn = screen.getByRole('img', { name: /close/i });
        fireEvent.click(closeBtn);
    });

    it('should click on available coulmnheader', () => {
        customRender(<ReceiptMaster setFilterString={jest.fn()} resetData={jest.fn()} />);

        const reciptNo = screen.getByRole('columnheader', { name: 'Receipt No.' });
        fireEvent.click(reciptNo);

        const reciptDate = screen.getByRole('columnheader', { name: 'Receipt Date' });
        fireEvent.click(reciptDate);

        const partySegment = screen.getByRole('columnheader', { name: 'Party Segment' });
        fireEvent.click(partySegment);

        const customerName = screen.getByRole('columnheader', { name: 'Customer/Supplier Name' });
        fireEvent.click(customerName);
    });
    it('reset button should work', () => {
        customRender(<ReceiptMaster setFilterString={jest.fn()} resetData={jest.fn()} />);

        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const resetBtn = screen.getByRole('button', { name: /Reset/i });
        fireEvent.click(resetBtn);
    });

    it('test for closing the advance filter', () => {
        customRender(<ReceiptMaster setFilterString={jest.fn()} resetData={jest.fn()} />);

        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const closeBtn = screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeBtn);
    });
    it('clear button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Receipt: {
                    ReceiptSearchList: { filter: { advanceFilter: 'Test', fromDate: '06/06/2022', toDate: '07/06/2022', receiptType: 'Against Credit Bills', partySegment: 'SUBCONTRACTOR' } },
                    ReceiptDetails: { data: [{ id: '1', value: 'kai' }] },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ReceiptMaster fetchList={jest.fn()} setFilterString={jest.fn()} resetData={jest.fn()} />
            </Provider>
        );

        const advanceFilter = screen.getByPlaceholderText(/Search Receipt No./i);
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
                Receipt: {
                    ReceiptSearchList: { filter: { advanceFilter: 'Test', fromDate: '06/06/2022', key: 'searchParam' } },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ReceiptMaster fetchList={jest.fn()} setFilterString={jest.fn()} resetData={jest.fn()} />
            </Provider>
        );

        const advanceFilter = screen.getByPlaceholderText(/Search Receipt No./i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });
        const removeFilter = screen.getByTestId('removeFilter');
        fireEvent.click(removeFilter);
    });

    it('test for apply button', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Receipt: {
                    ReceiptSearchList: { filter: { advanceFilter: 'Test', fromDate: '06/06/2022', key: 'searchParam' } },
                },
            },
        });

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <ReceiptMaster fetchList={fetchList} setFilterString={jest.fn()} resetData={jest.fn()} />
            </Provider>
        );

        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);

        const fromDate = screen.getByRole('textbox', { name: 'Receipt From Date' });
        fireEvent.click(fromDate);
        const todayForFromDate = await screen.findByText('Today');
        fireEvent.click(todayForFromDate);

        const toDate = screen.getByRole('textbox', { name: 'Receipt To Date' });
        fireEvent.click(toDate);
        const todayToFromDate = await screen.findAllByText('Today');
        fireEvent.click(todayToFromDate[1]);

        const resetBtn = screen.getByRole('button', { name: /apply/i });
        fireEvent.click(resetBtn);

        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();
    });

    it('test1', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            data: {
                Receipt: {
                    ReceiptSearchList: { isLoaded: true, data: { paginationData: [{ receiptNumber: 106, receiptDate: '01/01/2000', partySegment: 'Party', customerName: 'Kai' }] } },
                },
            },
        });

        const fetchList = jest.fn();
        const saveData = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <ReceiptMaster fetchList={fetchList} saveData={saveData} setFilterString={jest.fn()} resetData={jest.fn()} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onErrorAction();

        fetchList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => {
            expect(screen.getByText('Kai')).toBeInTheDocument();
        });

        const viewBtn = screen.getByTestId('view');

        fireEvent.click(viewBtn);

        const cancelBtn = screen.getByRole('button', { name: /cancel receipt/i });
        fireEvent.click(cancelBtn);

        const cancelrecipt = screen.getAllByRole('button', { name: /cancel/i });
        fireEvent.click(cancelrecipt[2]);
    });

    it('test2', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            data: {
                Receipt: {
                    ReceiptSearchList: { isLoaded: true, data: { paginationData: [{ receiptNumber: 106, receiptDate: '01/01/2000', partySegment: 'Party', customerName: 'Kai' }] } },
                },
            },
        });

        const fetchList = jest.fn();
        const saveData = jest.fn();
        const cancelReceipt = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <ReceiptMaster fetchList={fetchList} saveData={saveData} cancelReceipt={cancelReceipt} setFilterString={jest.fn()} resetData={jest.fn()} fetchReceiptDetails={jest.fn()} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onErrorAction();

        fetchList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => {
            expect(screen.getByText('Kai')).toBeInTheDocument();
        });

        const viewBtn = screen.getByTestId('view');

        fireEvent.click(viewBtn);

        const cancelBtn = screen.getByRole('button', { name: /cancel receipt/i });
        fireEvent.click(cancelBtn);

        const textBox = screen.getByRole('textbox', { name: /Cancellation Remark/i });
        fireEvent.change(textBox, { target: { value: 'Test' } });

        const cancelrecipt = screen.getByRole('button', { name: /Submit/i });
        fireEvent.click(cancelrecipt);
    });
});
