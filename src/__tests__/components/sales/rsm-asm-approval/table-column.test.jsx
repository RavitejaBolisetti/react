/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { tableColumn } from '@components/Sales/RsmAsmApproval/tableColumn';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('tableColumn', () => {
    it('should render the table column correctly', () => {
        const props = {
            handleButtonClick: jest.fn(),
        };
        const columns = tableColumn(props);
        render(<div>{columns[0].render('Test')}</div>);
        render(<div>{columns[1].render('Test')}</div>);
        render(<div>{columns[3].render('Test')}</div>);
        render(<div>{columns[5].render('Test')}</div>);
    });
});
