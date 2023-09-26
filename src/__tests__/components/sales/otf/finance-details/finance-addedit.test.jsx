import React from 'react';
import { screen } from '@testing-library/react';
import { AddEditForm } from '@components/Sales/Common/FinananceDetails/AddEditForm';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

beforeEach(() => {
    jest.clearAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn(),
        resetData: jest.fn(),
        validateFields: jest.fn(),
    };
    return <AddEditForm form={myFormMock} {...props} />;
};

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

const FINANCE_ARRANGED_BY = [
    { key: '1', value: 'Self' },
    { key: '2', value: 'Dealer' },
];
const formData = {
    financeArrangedBy: [{ name: 'Kai' }],
};

const props = {
    handleDOChange: jest.fn(),
    onLoanChange: jest.fn(),
    emiLessThanAmount: jest.fn(),
};

describe('Booking Finance Details Component render', () => {
    it('should render addedit form', async () => {
        customRender(<FormWrapper {...props} FinanceLovData={FinanceLovDataMock} setDoReceived={jest.fn} typeData={(typeDataMock, FNC_ARNGD, FINANCE_ARRANGED_BY)} formData={formData} />);
    });

    it('should render text', async () => {
        const initialFormData = {
            doReceived: 'Y',
            doDate: '2023-07-30T18:30:00.000Z',
        };

        const mockForm = {
            setFieldsValue: jest.fn(),
        };
        customRender(<FormWrapper {...props} formData={initialFormData} setDoReceived={jest.fn} FinanceLovData={FinanceLovDataMock} typeData={(typeDataMock, FNC_ARNGD, FINANCE_ARRANGED_BY)} form={mockForm} />);

        const financier = screen.getByRole('combobox', { name: /Finance Arranged By/i });
        expect(financier).toBeTruthy();
    });
});
