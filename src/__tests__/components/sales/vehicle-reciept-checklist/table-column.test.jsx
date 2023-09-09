import React from 'react';
import { render } from '@testing-library/react';
import { tableColumn } from '@components/Sales/VehicleRecieptChecklist/tableColumn';

describe('Vehicle Reciept Master table colcumn container', () => {
    it('Should render table colcumn components', () => {
        const props = {
            handleButtonClick: jest.fn(),
            page: 1,
            pageSize: 12,
            actionButtonVisibility: true,
        };

        const columns = tableColumn(props);
        render(<div>{columns[1].render('Test')}</div>);
    });
});
