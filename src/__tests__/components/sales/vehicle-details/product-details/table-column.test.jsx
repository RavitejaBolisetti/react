import React from 'react';
import { render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { tableColumn } from 'components/Sales/VehicleDetail/ProductDetails/tableCoulmn';
import customRender from 'test-utils';

describe('tableColumn', () => {
    it('should render the table column correctly', () => {
        const handleButtonClick = jest.fn();
        const bindCodeValue = jest.fn(() => {});
        const formActionType='';
        const columns = tableColumn(handleButtonClick, formActionType, bindCodeValue);
        expect(columns).toHaveLength(4);

        const record = { duplicateAllowedAtAttributerLevelInd: true };
        render(<div>{columns[0].render(null, record, 1)}</div>);
        render(<div>{columns[1].render(null, record, 2)}</div>);
    });
});
