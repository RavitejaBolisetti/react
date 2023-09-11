import React from 'react';
import { screen } from '@testing-library/react';
import { AddEditForm } from '@components/Sales/OTF/FinananceDetails/AddEditForm';
import customRender from '@utils/test-utils';

beforeEach(() => {
    jest.clearAllMocks();
});

const FinanceLovDataMock = [
    { key: '1', value: 'Finance Option 1' },
    { key: '2', value: 'Finance Option 2' },
];

const typeDataMock = {
    YES_NO_FLG: [
        { key: 'Y', value: 'Yes' },
        { key: 'N', value: 'No' },
    ],
};

const FNC_ARNGD = [
    { key: '1', value: 'Finance Option 1' },
    { key: '2', value: 'Finance Option 2' },
];

const props = {
    handleDOChange: jest.fn(),
    onLoanChange: jest.fn(),
    emiLessThanAmount: jest.fn(),
};

describe('OTF Finance Details Component render', () => {
    it('should render addedit form', async () => {
        customRender(<AddEditForm {...props} FinanceLovData={FinanceLovDataMock} setDoReceived={jest.fn} typeData={(typeDataMock, FNC_ARNGD)} />);
    });

    it('should render text', async () => {
        const initialFormData = {
            doReceived: 'Y',
            doDate: '2023-07-30T18:30:00.000Z',
        };

        const mockForm = {
            setFieldsValue: jest.fn(),
        };
        customRender(<AddEditForm {...props} formData={initialFormData} setDoReceived={jest.fn} FinanceLovData={FinanceLovDataMock} typeData={(typeDataMock, FNC_ARNGD)} form={mockForm} />);

        const financier = screen.getByRole('combobox', { name: /Finance Arranged By/i });
        expect(financier).toBeTruthy();
    });
});
