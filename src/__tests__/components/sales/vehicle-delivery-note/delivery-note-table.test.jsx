import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { tableColumn } from '@components/Sales/VehicleDeliveryNote/tableColumn';

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

        render(<div>{columns[3].render('')}</div>);

        render(<div>{columns[4].render('Test')}</div>);
    });
});
