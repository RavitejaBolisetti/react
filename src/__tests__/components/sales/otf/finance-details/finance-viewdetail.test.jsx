import React from 'react';
import { ViewDetail } from '@components/Sales/OTF/FinananceDetails/ViewDetail';
import customRender from '@utils/test-utils';

beforeEach(() => {
    jest.clearAllMocks();
});

describe('OTF finance view Details render', () => {
    it('should render view details page', async () => {
        const checkFinanceType = { key: 'cash', value: '1' };
        customRender(<ViewDetail checkFinanceType={checkFinanceType} />);
    });
});
