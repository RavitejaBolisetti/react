import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { tableColumn } from '@components/Sales/VehicleReceipt/tableColumn';
import { fireEvent } from '@testing-library/react';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

afterEach(() => {
    jest.restoreAllMocks();
});

const handleButtonClickMock = jest.fn();

describe('tableColumn', () => {
    it('should render the table column correctly', () => {
        const props = {
            handleButtonClick: jest.fn(),
            bindCodeValue: jest.fn(),
            formActionType: '',
        };
        const columns = tableColumn(props);

        render(<div>{columns[1].render('')}</div>);

        render(<div>{columns[2].render('Test')}</div>);
        render(<div>{columns[2].render('')}</div>);

        render(<div>{columns[5].render('Test1')}</div>);
        render(<div>{columns[5].render('')}</div>);
    });
});
describe('tableColumn Function', () => {
    it('should return an array of table columns', () => {
        const columns = tableColumn({
            handleButtonClick: handleButtonClickMock,
            page: 1,
            pageSize: 10,
            width: '',
            tableIconsVisibility: {
                EditIcon: true,
                EyeIcon: false,
                AddIcon: true,
            },
        });

        expect(columns).toHaveLength(7);

        const actionColumn = columns[6];
        expect(actionColumn.title).toBe('Action');
        expect(actionColumn.dataIndex).toBe('');
        expect(actionColumn.width).toBe('12%');

        const record = { grnNumber: '12345' };
        const rowIndex = 0;
        const { container } = render(actionColumn.render(null, record, rowIndex));

        const viewButton = container.querySelector('[data-testid="view"]');
        expect(viewButton).toBeInTheDocument();

        fireEvent.click(viewButton);
        expect(handleButtonClickMock).toHaveBeenCalledWith({
            buttonAction: FROM_ACTION_TYPE.VIEW,
            record,
        });
    });
});
