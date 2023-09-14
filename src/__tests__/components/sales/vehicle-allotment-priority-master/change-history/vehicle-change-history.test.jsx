/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { ChangeHistory } from '@components/Sales/VehicleAllotmentPriorityMaster/ChangeHistory/vehicleChangeHistory';

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
        customRender(<ChangeHistory {...props} />);
        const closeBtn = screen.getAllByRole('button', { name: 'Close', exact: false });
        fireEvent.click(closeBtn[0]);
        fireEvent.click(closeBtn[1]);
    });
   
});
