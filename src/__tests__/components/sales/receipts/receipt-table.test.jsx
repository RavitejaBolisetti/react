import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { tableColumn } from '@components/Sales/Receipts/tableColumn';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('tableColumn', () => {
    it('should render the table column correctly', () => {
        const props = {
            handleButtonClick: jest.fn(),
            bindCodeValue: jest.fn(),
            formActionType: '',
        };
        const columns = tableColumn(props);

        render(<div>{columns[1].render('Test')}</div>);
    });
});
