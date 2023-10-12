/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { tableColumnAddEdit } from '@components/Sales/crmSchemeEnrolment/tableColumnAddEdit';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('tableColumn', () => {
    it('should render the table column correctly', () => {
        // const typeData = {
        //     PARAM_MASTER: {
        //         YES_NO_FLG: { key: '123', type: 'test123' },
        //     },
        // };
        const props = {
            handleCheckBox: jest.fn(),
            formActionType: {
                viewMode: true,
            },
            PARAM_MASTER: {
                YES_NO_FLG: { key: '123', type: 'test123' },
            },
        };

        const columns = tableColumnAddEdit(props);
        render(<div>{columns[1].render('Test')}</div>);
    });
});
