/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React from 'react';
import customRender from '@utils/test-utils';
import { render } from 'test-utils';
import { tableColumn } from '@components/Sales/VehiclePurchaseOrder/VehiclePurchaseOrderDetail/tableColumn';

describe('table columns Components', () => {
    it('Should render CheckList Details table colcumn components', () => {
        const props = {
            handleButtonClick: jest.fn(),
            formActionType: { viewMode: true },
        };
        const columns = tableColumn(props);
        customRender(<div>{columns[3].render('Test')}</div>);
    });
});
