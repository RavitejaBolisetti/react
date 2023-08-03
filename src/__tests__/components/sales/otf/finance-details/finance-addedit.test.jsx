import React from 'react';
import { Form } from 'antd';
import { fireEvent, screen } from '@testing-library/react';
import { AddEditForm } from '@components/Sales/OTF/FinananceDetails/AddEditForm';
import customRender from '@utils/test-utils';

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

const initialFormData = {
    doReceived: 'Y',
};
describe('OTF Finance Details Component render', () => {
    it('should render addedit form', async () => {
        customRender(<AddEditForm formData={initialFormData} FinanceLovData={FinanceLovDataMock} typeData={typeDataMock} />);
        screen.debug();

        const doNumberInput = screen.getByText('D.O. Number');
        expect(doDateInput).toBeTruthy();
        const doDateInput = screen.getByText('D.O. Date');
        expect(doNumberInput).toBeTruthy();
    });

    it('should render text', async () => {
        customRender(<AddEditForm />);

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

        // const doNumber = screen.getByText('D.O. Number');
        // expect(doNumber).toBeTruthy();

        // const doDate = screen.getByText('D.O. Date');
        // expect(doDate).toBeTruthy();
    });
});
