import React from 'react';
import { ViewDetail } from '@components/Sales/Common/FinananceDetails/ViewDetail';
import customRender from '@utils/test-utils';

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Booking finance view Details render', () => {
    it('should render view details page', async () => {
        const checkFinanceType = { key: 'cash', value: '1' };
        customRender(<ViewDetail checkFinanceType={checkFinanceType} />);
    });
});
