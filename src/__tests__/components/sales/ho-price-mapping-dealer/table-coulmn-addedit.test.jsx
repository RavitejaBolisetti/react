import React from 'react';
import { render, screen } from '@testing-library/react';
import { tableColumnAddEdit } from '@components/Sales/HoPriceMappingDealer/tableColumnAddEdit';

describe('tableColumnAddEdit function', () => {
    it('generates correct columns with a checkbox for editing', () => {
        const mockProps = {
            typeData: {},
            formActionType: { viewMode: false },
            handleCheckBox: jest.fn(),
        };

        const columns = tableColumnAddEdit(mockProps);

        render(
            <table>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column.title}</th>
                        ))}
                    </tr>
                </thead>
            </table>
        );

        expect(columns).toHaveLength(2);

        const checkboxColumn = columns[1];
        expect(checkboxColumn.title).toBe('Select');
        expect(checkboxColumn.dataIndex).toBe('dealerFlag');
        expect(checkboxColumn.width).toBe('30%');
        expect(checkboxColumn.sorter).toBe(false);

         render(checkboxColumn.render('Some Text', {}, 0));
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
    });

    it('generates correct columns for view mode', () => {
        const mockProps = {
            typeData: {},
            formActionType: { viewMode: true },
            handleCheckBox: jest.fn(),
        };

        const columns = tableColumnAddEdit(mockProps);

        expect(columns).toHaveLength(2);

        const viewColumn = columns[1];
        expect(viewColumn.title).toBe('Select');
        expect(viewColumn.dataIndex).toBe('dealerFlag');
        expect(viewColumn.width).toBe('30%');
        expect(viewColumn.sorter).toBe(false);

        render(viewColumn.render('Some Text', {}, 0));
    });
});
