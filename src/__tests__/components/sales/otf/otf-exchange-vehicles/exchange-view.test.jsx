/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { ViewDetail } from '@components/Sales/Common/ExchangeVehicles/ViewDetail';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('ViewDetails Component Should Render', () => {
    it('should veiw detail main component rendr', () => {
        customRender(<ViewDetail styles={{}} />);

        const exchange = screen.getByRole('row', { name: 'Exchange' });
        expect(exchange).toBeTruthy();

        const no = screen.getByRole('row', { name: 'No' });
        expect(no).toBeTruthy();

        const exchangeColumn = screen.getByRole('columnheader', { name: 'Exchange' });
        expect(exchangeColumn).toBeTruthy();

        const noCell = screen.getByRole('cell', { name: 'No' });
        expect(noCell).toBeTruthy();
    });
});
