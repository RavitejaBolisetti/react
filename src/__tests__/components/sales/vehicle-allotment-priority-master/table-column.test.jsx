/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen } from '@testing-library/react';
import { tableColumn } from '@components/Sales/VehicleAllotmentPriorityMaster/tableColumn';

describe('table columns Components', () => {
    it('Should render CheckList Details table column components', () => {
        const props = {
            handleButtonClick: jest.fn(),
            formActionType: { viewMode: true },
        };
        const columns = tableColumn(props);
        customRender(<div>{columns[2].render('Test')}</div>);
        customRender(<div>{columns[3].render('text')}</div>);
    });
});
