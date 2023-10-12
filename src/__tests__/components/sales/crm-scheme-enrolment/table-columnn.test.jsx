/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { tableColumn } from '@components/Sales/crmSchemeEnrolment/tableColumn';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('tableColumn', () => {
    it('should render the table column correctly', () => {
        const props = {
            handleButtonClick: jest.fn(),
        };
        const columns = tableColumn(props);
        render(<div>{columns[1].render('Test')}</div>);
    });
});
