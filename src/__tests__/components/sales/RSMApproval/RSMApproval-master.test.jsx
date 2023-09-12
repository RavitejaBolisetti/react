import React from 'react';
import RSMApprovalMaster from 'components/Sales/RSMApproval/RSMApprovalMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('RSMApprovalMaster Component', () => {
    it('should render RSMApproval master component UI', () => {
        customRender(<RSMApprovalMaster />);
    });
    it('reset button should work', () => {
        customRender(<RSMApprovalMaster />);

        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const resetBtn = screen.getByRole('button', { name: /Reset/i });
        fireEvent.click(resetBtn);
    });

    it('test for closing the advance filter', () => {
        customRender(<RSMApprovalMaster />);

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
        customRender(
            <Provider store={mockStore}>
                <RSMApprovalMaster />
            </Provider>
        );

        const advanceFilter = screen.getByPlaceholderText(/Search by dealer/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });

        const clearBtn = screen.getByRole('button', { name: /Clear/i });
        fireEvent.click(clearBtn);
    });
});
