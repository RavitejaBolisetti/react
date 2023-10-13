/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import RsmAsmApprovalMaster from 'components/Sales/RsmAsmApproval/RsmAsmApprovalMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/rsmAsmApproval/rsmAsmApprovalSearch', () => ({
    rsmAsmApprovalSearchDataAction: {},
}));

describe('Rsm Asm Approval Master Component', () => {
    it('should render RSM ASM pproval master component UI', () => {
        customRender(<RsmAsmApprovalMaster setFilterString={jest.fn()} />);
    });

    it('reset button should work', () => {
        customRender(<RsmAsmApprovalMaster setFilterString={jest.fn()} />);
        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const resetBtn = screen.getByRole('button', { name: /Reset/i });
        fireEvent.click(resetBtn);
    });

    it('test for closing the advance filter', () => {
        customRender(<RsmAsmApprovalMaster setFilterString={jest.fn()} />);
        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const closeBtn = screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeBtn);
    });

    it('test for search the advance filter', async () => {
        customRender(<RsmAsmApprovalMaster isVisible={true} setFilterString={jest.fn()} fetchProductList={jest.fn()} />);
        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const searchBtn = screen.getAllByRole('button', { name: /Search/i });
        fireEvent.click(searchBtn[0]);
    });

    it('remove filter button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                RsmAsmApproval: {
                    RsmAsmApprovalSearch: { filter: { advanceFilter: 'Test', fromDate: '06/06/2022', toDate: '06/06/2022', searchParam: 'datatest' }, key: 'searchParam' },
                },
            },
        });
        const fetchList = jest.fn();
        customRender(
            <Provider store={mockStore}>
                <RsmAsmApprovalMaster fetchList={fetchList} setFilterString={jest.fn()} />
            </Provider>
        );
        const advanceFilter = screen.getByPlaceholderText(/Search by Dealer Name/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });
        const removeFilter = screen.getAllByTestId('removeFilter');
        fireEvent.click(removeFilter[0]);
        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();
    });

    it('clear button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                RsmAsmApproval: {
                    RsmAsmApprovalSearch: { filter: { advanceFilter: 'Test', fromDate: '06/06/2022', toDate: '06/06/2022', searchParam: 'datatest' }, key: 'searchParam' },
                },
            },
        });
        const fetchList = jest.fn();
        customRender(
            <Provider store={mockStore}>
                <RsmAsmApprovalMaster fetchList={fetchList} setFilterString={jest.fn()} />
            </Provider>
        );
        const approved = screen.getByRole('button', { name: 'Approved' });
        fireEvent.click(approved);

        const searchBox = screen.getByRole('textbox', { name: '' });
        fireEvent.change(searchBox, { target: { value: 'Kai' } });

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);

        const advanceFilter = screen.getByPlaceholderText(/Search by Dealer Name/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });

        const clearBtn = screen.getByRole('button', { name: /Clear/i });
        fireEvent.click(clearBtn);
    });
});
