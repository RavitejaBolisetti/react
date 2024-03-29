/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';
import InvoiceCancellationMaster from 'components/Sales/DeliveryNoteInvoiceCancellation/InvoiceCancellationMaster';
import customRender from '@utils/test-utils';

jest.mock('store/actions/data/sales/deliveryNoteInvoiceCancellation', () => ({
    deliveryNoteInvoiceCancellationDataAction: {},
}));

afterEach(() => {
    jest.restoreAllMocks();
});

const data = {
    pageSize: 10,
    pageNumber: 1,
    totalRecords: 2,
    paginationData: [{ id: '617fa4fa-b3e3-4027-aaa0-aecb0704ef9e', requestType: 'DNCA', requestNumber: 'REQ003', invoiceId: 'INV11000004', requestStatus: 'O', invoiceDate: '2011-02-18', requestDate: '2021-12-07', dealerName: null, status: 'Pending' }],
};

describe('InvoiceCancellationMaster Component', () => {
    it('should render InvoiceCancellationMaster component UI', () => {
        customRender(<InvoiceCancellationMaster setFilterString={jest.fn()} />);
    });

    it('pending, approved, and rejected buttons should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Sales: {
                    DeliveryNoteInvoice: { isDetailLoaded: true, data: data },
                },
            },
        });

        const fetchList = jest.fn();
        const saveData = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <InvoiceCancellationMaster fetchList={fetchList} fetchDetail={jest.fn()} saveData={saveData} setFilterString={jest.fn()} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onErrorAction();
        fetchList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => {
            expect(screen.getByText('INV11000004')).toBeInTheDocument();
        });

        const editBtn = screen.getByTestId('view');
        fireEvent.click(editBtn);

        const cancelReq = screen.getByRole('button', { name: 'Cancel Request' });
        fireEvent.click(cancelReq);

        const yesBtn = screen.getByRole('button', { name: /yes, cancel/i });
        fireEvent.click(yesBtn);

        await waitFor(() => {
            expect(saveData).toHaveBeenCalled();
        });
        saveData.mock.calls[0][0].onError();
        saveData.mock.calls[0][0].onSuccess();

        const cancelBtn = screen.getAllByRole('button', { name: 'Close' });
        fireEvent.click(cancelBtn[1]);

        const pending = screen.getByRole('button', { name: 'Pending' });
        fireEvent.click(pending);
        const approved = screen.getByRole('button', { name: 'Approved' });
        fireEvent.click(approved);
        const rejected = screen.getByRole('button', { name: 'Rejected' });
        fireEvent.click(rejected);
    });

    it('Advance Filters, search, and close buttons should work', () => {
        customRender(<InvoiceCancellationMaster setFilterString={jest.fn()} />);
        const advanceFilters = screen.getByRole('button', { name: 'Advance Filters' });
        fireEvent.click(advanceFilters);
        const searchBtn = screen.getByTestId('apply');
        fireEvent.click(searchBtn);
        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
    });

    it('search should work with remove filter', () => {
        customRender(<InvoiceCancellationMaster setFilterString={jest.fn()} />);
        const searchBox = screen.getByRole('textbox', { name: '' });
        fireEvent.change(searchBox, { target: { value: 'Test' } });
        const searchBtn = screen.getByTestId('search');
        fireEvent.click(searchBtn);
    });

    it('search should work with clear button', () => {
        customRender(<InvoiceCancellationMaster setFilterString={jest.fn()} />);
        const searchBox = screen.getByRole('textbox', { name: '' });
        fireEvent.change(searchBox, { target: { value: 'REQ003' } });
        // const searchBtn = screen.getByTestId('apply')
        // fireEvent.click(searchBtn);
    });

    it('Advance Filters should work', async () => {
        customRender(<InvoiceCancellationMaster setFilterString={jest.fn()} />);
        const advanceFilters = screen.getByRole('button', { name: 'Advance Filters' });
        fireEvent.click(advanceFilters);

        const fromDate = screen.getByRole('textbox', { name: 'From Date' });
        fireEvent.click(fromDate);
        const todayForFromDate = await screen.findByText('Today');
        fireEvent.click(todayForFromDate);

        const toDate = screen.getByRole('textbox', { name: 'To Date' });
        fireEvent.click(toDate);
        const todayToFromDate = await screen.findAllByText('Today');
        fireEvent.click(todayToFromDate[1]);

        const searchBtn = screen.getByTestId('apply');
        fireEvent.click(searchBtn);
    });
});
