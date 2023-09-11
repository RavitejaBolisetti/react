import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { tableColumn } from '@components/Sales/RSMApproval/tableColumn';

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
        render(<div>{columns[5].render('Test')}</div>);
    });
});
