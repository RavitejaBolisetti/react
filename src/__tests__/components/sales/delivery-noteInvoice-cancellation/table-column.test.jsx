import React from 'react';
import { render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { tableColumn } from 'components/Sales/DeliveryNoteInvoiceCancellation/tableColumn';

describe('tableColumn', () => {
    it('should render the table column correctly', () => {
        const handleButtonClick = jest.fn();
        const typeData={
        }
        const columns = tableColumn(handleButtonClick, typeData);
        expect(columns).toHaveLength(7);

        render(<div>{columns[0].render(null, 'Test')}</div>);
        render(<div>{columns[1].render(null, 'Test')}</div>);
        render(<div>{columns[3].render('Test')}</div>);
    });
});
