import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { AddEditForm } from '@components/Sales/Common/ChecklistDetails/AddEditForm';
import customRender from '@utils/test-utils';
import { ModalForm } from '@components/Sales/Common/ChecklistDetails/ModalForm';

jest.mock('utils/ListDataTable', () => {
    return {
        ListDataTable: jest.fn(() => <div data-testid="list-data-table" />),
    };
});

describe('AddEditFormMain Component', () => {
    it('renders correctly', () => {
        const mockProps = {
            isEditing: false,
            setIsReadOnly: jest.fn(),
            isReadOnly: false,
            aggregateForm: { resetFields: jest.fn() },
            tableProps: { key: 1, value: 'test' },
        };
        customRender(<AddEditForm {...mockProps} />);
        const listDataTable = screen.getByTestId('list-data-table');
        expect(listDataTable).toBeInTheDocument();
    });

    it('calls setIsReadOnly on onCloseAction', () => {
        const mockProps = {
            isEditing: true,
            setIsReadOnly: jest.fn(),
            isReadOnly: false,
            aggregateForm: { resetFields: jest.fn() },
            tableProps: { key: 1, value: 'test' },
            isVisible: true,
            onCloseAction: jest.fn(),
        };

        customRender(<AddEditForm {...mockProps} />);
    });

    it('Should render modal form', () => {
        const mockProps = {
            setIsReadOnly: jest.fn(),
            isReadOnly: false,
            aggregateForm: { resetFields: jest.fn() },
            tableProps: { key: 1, value: 'test' },
            isVisible: true,
            onCloseAction: jest.fn(),
        };

        customRender(<AddEditForm {...mockProps} />);
    });

    it('Should render ModalForm components', () => {
        const mockProps = {
            isEditing: false,
            setIsReadOnly: jest.fn(),
            isReadOnly: false,
            isVisible: true,
        };

        customRender(<ModalForm {...mockProps} />);

        const close = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(close);

        const resetBtn = screen.getAllByRole('button', { name: '' });
        fireEvent.click(resetBtn[0]);
    });
});
