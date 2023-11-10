import React from 'react';
import RSMApprovalMaster from 'components/Sales/RSMApproval/RSMApprovalMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/sales/rsmApprovalSearch', () => ({
    rsmApprovalSearchDataAction: {},
}));

jest.mock('store/actions/data/sales/rsmApproval', () => ({
    rsmApprovalDataAction: {},
}));

describe('RSMApprovalMaster Component', () => {
    it('should render RSMApproval master component UI', () => {
        customRender(<RSMApprovalMaster setFilterString={jest.fn()} />);
    });
    it('reset button should work', () => {
        customRender(<RSMApprovalMaster setFilterString={jest.fn()} />);

        const advanceFilter = screen.getByRole('button', { name: /Advance Filters/i });
        fireEvent.click(advanceFilter);
        const resetBtn = screen.getByRole('button', { name: /Reset/i });
        fireEvent.click(resetBtn);
    });

    it('test for closing the advance filter', () => {
        customRender(<RSMApprovalMaster setFilterString={jest.fn()} />);

        const advanceFilter = screen.getByRole('button', { name: /Advance Filters/i });
        fireEvent.click(advanceFilter);
        const closeBtn = screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeBtn);
    });
    it('clear button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Sales: {
                    RSMApprovalSearch: { filter: { advanceFilter: 'Test', fromDate: '06/06/2022', toDate: '06/06/2022', key: 'searchParam' } },
                },
            },
        });

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <RSMApprovalMaster fetchList={fetchList} setFilterString={jest.fn()} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();

        const approved = screen.getByRole('button', { name: 'Approved' });
        fireEvent.click(approved);

        const searchBox = screen.getByRole('textbox', { name: '' });
        fireEvent.change(searchBox, { target: { value: 'Kai' } });

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);

        const advanceFilter = screen.getByPlaceholderText(/Search by dealer/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });

        const clearBtn = screen.getByRole('button', { name: /Clear/i });
        fireEvent.click(clearBtn);
    });

    it('test1', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            data: {
                Sales: {
                    RSMApprovalSearch: {
                        data: { paginationData: [{ chassisNumber: 'null', fromDealerCode: 'NB04', fromDealerName: 'ANDHERI', id: 'a1f6d38c-2968-44c8-8844-7617aee831e1', modelDescription: 'XUV700 AX7 L DSL AT 7 SEATER WHT', requestedDate: '2023-10-10', status: null, toDealerCode: 'C230088323', toDealerName: 'SANJAY RAJARAM KHARAMBALE', vehicleAge: 287 }] },
                    },
                },
            },
        });

        const fetchList = jest.fn();
        const fetchDetail = jest.fn();
        const saveData = jest.fn();
        const buttonData = { viewBtn: true };

        customRender(
            <Provider store={mockStore}>
                <RSMApprovalMaster fetchList={fetchList} rejectModalCloseAction={jest.fn()} fetchDetail={fetchDetail} saveData={saveData} setFilterString={jest.fn()} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onErrorAction();

        fetchList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => {
            expect(screen.getByText('ANDHERI')).toBeInTheDocument();
        });

        const viewBtn = screen.getByRole('button', { name: /ai-view/i });
        fireEvent.click(viewBtn);

        const rejectBtn = screen.getAllByRole('button', { name: /reject/i });
        fireEvent.click(rejectBtn[1]);

        const cancelBtn = screen.getByRole('button', { name: /cancel/i });
        fireEvent.click(cancelBtn);

        const closeBtn = screen.getAllByRole('button', { name: /close/i });
        fireEvent.click(closeBtn[1]);
    });

    it('test for onsuccess', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            data: {
                Sales: {
                    RSMApprovalSearch: {
                        data: { paginationData: [{ chassisNumber: 'null', fromDealerCode: 'NB04', fromDealerName: 'ANDHERI', id: '1c5415bc-fcfe-40d8-ad7b-46f5bf74ba41', modelDescription: 'XUV700 AX7 L DSL AT 7 SEATER WHT', requestedDate: '2023-10-10', status: null, toDealerCode: 'C230088323', toDealerName: 'SANJAY RAJARAM KHARAMBALE', vehicleAge: 287, remarks: 'rejection', request: 'R' }] },
                    },
                },
            },
        });

        const fetchList = jest.fn();
        const fetchDetail = jest.fn();
        const saveData = jest.fn();
        const buttonData = { viewBtn: true };
        const res = [{ id: '1c5415bc-fcfe-40d8-ad7b-46f5bf74ba41', remarks: 'rejection', request: 'R' }];

        customRender(
            <Provider store={mockStore}>
                <RSMApprovalMaster fetchList={fetchList} rejectModalCloseAction={jest.fn()} fetchDetail={fetchDetail} saveData={saveData} setFilterString={jest.fn()} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onErrorAction();

        fetchList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => {
            expect(screen.getByText('ANDHERI')).toBeInTheDocument();
        });

        const viewBtn = screen.getByRole('button', { name: /ai-view/i });
        fireEvent.click(viewBtn);

        const rejectBtn = screen.getAllByRole('button', { name: /reject/i });
        fireEvent.click(rejectBtn[1]);

        const textbox = screen.getByRole('textbox', { name: /Rejection Remarks/i });
        fireEvent.change(textbox, { target: { value: 'Kai' } });

        const cancelBtn = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(cancelBtn);

        saveData.mock.calls[0][0].onErrorAction(res);
        saveData.mock.calls[0][0].onSuccessAction(res);

        const closeBtn = screen.getAllByRole('button', { name: /close/i });
        fireEvent.click(closeBtn[1]);
    });
});
