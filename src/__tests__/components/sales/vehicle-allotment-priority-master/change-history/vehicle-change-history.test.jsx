/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { ChangeHistory } from '@components/Sales/VehicleAllotmentPriorityMaster/ChangeHistory/vehicleChangeHistory';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('vehicle allotment component render', () => {
    const props = {
        fetchOTFChangeHistory: jest.fn(),
        onCloseAction: jest.fn(),
        listShowChangeHistoryLoading: jest.fn(),
        isChangeHistoryLoading: false,
        isChangeHistoryLoaded: true,
        selectedOrderId: '123',
        isVisible: true,
        isChangeHistoryContainer: false,
        handleTableChange: jest.fn(),
    };

    it('should render vehicle allotment ChangeHistory component', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTF: {
                    OtfSearchList: { otfData: [{ name: 'test' }], changeHistoryData: [{ name: 'test' }] },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ChangeHistory {...props} />
            </Provider>
        );

        const closeBtn = screen.getAllByRole('button', { name: 'Close', exact: false });
        fireEvent.click(closeBtn[0]);
        fireEvent.click(closeBtn[1]);

        const closedBtn = screen.getByRole('img', { name: 'close', exact: false });
        fireEvent.click(closedBtn);
    });

    it('should render vehicle allotment ChangeHistory columnheader text', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTF: {
                    OtfSearchList: { otfData: [{ name: 'test' }], changeHistoryData: [{ name: 'test' }] },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ChangeHistory {...props} />
            </Provider>
        );

        const srlText = screen.getByRole('columnheader', { name: 'Srl.' });
        fireEvent.click(srlText);
        const modifiedBy = screen.getByRole('columnheader', { name: 'Modified By' });
        fireEvent.click(modifiedBy);
        const fieldName = screen.getByRole('columnheader', { name: 'Field Name' });
        fireEvent.click(fieldName);
        const oldValue = screen.getByRole('columnheader', { name: 'Old Value' });
        fireEvent.click(oldValue);
        const newValue = screen.getByRole('columnheader', { name: 'New Value' });
        fireEvent.click(newValue);
        const noData = screen.getByRole('cell', { name: 'No data' });
        fireEvent.click(noData);
        const modifiedDate = screen.getByRole('row', { name: 'Srl. Modified Date & Time Modified By Field Name Old Value New Value' });
        fireEvent.click(modifiedDate);
    });
});
