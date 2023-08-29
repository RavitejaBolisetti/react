import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { AggregateAddEditForm } from '@components/Sales/VehicleDetail/ProductDetails/AggregateAddEditForm'; // Import your component
import customRender from '@utils/test-utils';

describe('AdvanceForm', () => {
    const mockAggregateForm = {
        validateFields: jest.fn().mockResolvedValue(),
        resetFields: jest.fn(),
    };
    const mockProps = {
        AdvanceformData: {},
        setAdvanceformData: jest.fn(),
        handleCancel: jest.fn(),
        handleFormValueChange: jest.fn(),
        optionsServiceModified: [],
        setoptionsServiceModified: jest.fn(),
        aggregateForm: mockAggregateForm,
        setAdvanceSearchVisible: jest.fn(),
        isVisible: true,
        setisEditing: jest.fn(),
        isEditing: false,
        itemOptions: [],
        setitemOptions: jest.fn(),
        makeOptions: [],
        MakefieldNames: [],
        ItemFieldNames: [],
    };
    it('submits form data when Save button is clicked', async () => {
        customRender(<AggregateAddEditForm mockProps={mockProps} />);

        const item = screen.getByRole('combobox', { name: 'Item' });
        fireEvent.change(item, { target: { value: 'hello' } });

        const make = screen.getByRole('combobox', { name: 'Make' });
        fireEvent.change(make, { target: { value: 'helo' } });

        const serialNo = screen.getByRole('textbox', { name: 'Serial No.' });
        fireEvent.change(serialNo, { target: { value: '121' } });

        const saveBtn = screen.getByRole('button', { name: /save/i });
        fireEvent.click(saveBtn);
    });
});
