import React from 'react';
import RSMApprovalMaster from 'components/Sales/RSMApproval/RSMApprovalMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/sales/rsmApprovalSearch', () => ({
    rsmApprovalSearchDataAction: {},
}));

describe('RSMApprovalMaster Component', () => {
    it('should render RSMApproval master component UI', () => {
        customRender(<RSMApprovalMaster setFilterString={jest.fn()} />);
    });
    it('reset button should work', () => {
        customRender(<RSMApprovalMaster setFilterString={jest.fn()} />);

        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const resetBtn = screen.getByRole('button', { name: /Reset/i });
        fireEvent.click(resetBtn);
    });

    it('test for closing the advance filter', () => {
        customRender(<RSMApprovalMaster setFilterString={jest.fn()} />);

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
});
