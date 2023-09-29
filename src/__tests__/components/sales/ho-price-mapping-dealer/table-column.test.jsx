import React from 'react';
import { render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { tableColumn } from 'components/Sales/HoPriceMappingDealer/tableColumn';

describe('tableColumn', () => {
    it('should render the table column correctly', () => {
        const handleButtonClick = jest.fn();
        const page = 1;
        const pageSize = 10;
        const columns = tableColumn(handleButtonClick, page, pageSize);
        expect(columns).toHaveLength(7);

        render(<div>{columns[4].render('Text')}</div>);
    });
});
