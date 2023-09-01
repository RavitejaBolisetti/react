import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { tableColumn } from 'components/Sales/VehicleDetail/ProductDetails/tableCoulmn';
import customRender from 'test-utils';

describe('tableColumn', () => {
    it('should render the table column correctly', () => {
        const props = {
            handleButtonClick: jest.fn(),
            bindCodeValue: jest.fn(),
            formActionType: '',
        };
        const columns = tableColumn(props);
        expect(columns).toHaveLength(4);

        const record = { duplicateAllowedAtAttributerLevelInd: true };
        render(<div>{columns[0].render('Test', record, 1)}</div>);
        render(<div>{columns[1].render('Test', record, 2)}</div>);
    });
});
