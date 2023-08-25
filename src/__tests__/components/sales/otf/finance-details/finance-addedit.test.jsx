import React from 'react';
import { Form } from 'antd';
import { fireEvent, screen } from '@testing-library/react';
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

const props = {
    handleDOChange: jest.fn(),
    onLoanChange: jest.fn(),
    emiLessThanAmount: jest.fn(),
};

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <AddEditForm form={form} {...props} />;
};
describe('OTF Finance Details Component render', () => {
    it('should render addedit form', async () => {
        customRender(<AddEditForm {...props} FinanceLovData={FinanceLovDataMock} setDoReceived={jest.fn} typeData={typeDataMock} />);
    });

    it('should render text', async () => {
        const initialFormData = {
            doReceived: 'Y',
            doDate: '2023-07-30T18:30:00.000Z',
        };

        const mockForm = {
            setFieldsValue: jest.fn(),
        };
        customRender(<AddEditForm {...props} formData={initialFormData} setDoReceived={jest.fn} FinanceLovData={FinanceLovDataMock} typeData={typeDataMock} form={mockForm} />);

        const financier = screen.getByRole('combobox', { name: /Financier/i });
        expect(financier).toBeTruthy();

        const branch = screen.getByText('Branch');
        expect(branch).toBeTruthy();

        const fileNo = screen.getByText('File Number');
        expect(fileNo).toBeTruthy();

        const loanAmt = screen.getByText('Loan Amount');
        expect(loanAmt).toBeTruthy();

        const emi = screen.getByText('EMI');
        expect(emi).toBeTruthy();

        const doRecived = screen.getByRole('combobox', { name: /D.O. Received/i });
        expect(doRecived).toBeTruthy();
    });

    it('amc form input should work', () => {
        customRender(<FormWrapper setDoReceived={jest.fn} emiLessThanAmount={jest.fn()} />);
        const INput = screen.getByRole('textbox', { name: 'Loan Amount' });
        fireEvent.change(INput, { target: { value: '12' } });
        const amcInput = screen.getByRole('textbox', { name: 'EMI' });
        fireEvent.change(amcInput, { target: { value: '121' } });
    });
});
