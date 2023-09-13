import React from 'react';
import { render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { tableColumn }  from 'components/Sales/OTF/OTFAllotment/tableColumn';

describe('tableColumn', () => {
    it('should render the table column correctly', () => {
        const handleButtonClick = jest.fn();
        const page = 1;
        const pageSize = 10;
        const columns = tableColumn(handleButtonClick, page, pageSize);
        expect(columns).toHaveLength(6);

        const record = { duplicateAllowedAtAttributerLevelInd: true };
        render(<div>{columns[4].render(null, record)}</div>);
        render(<div>{columns[5].render(null, record)}</div>);
    });
});
