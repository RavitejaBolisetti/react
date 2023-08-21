import React from 'react';
import { screen } from '@testing-library/react';
import { ViewDetail } from '@components/Sales/OTF/FinananceDetails/ViewDetail';
import customRender from '@utils/test-utils';
afterEach(() => {
    jest.restoreAllMocks();
  }); 
describe('OTF finance view Details render', () => {
    it('should render view details page', async () => {
        customRender(<ViewDetail />);
    });

    it('should render all text', async () => {
        customRender(<ViewDetail />);

        const financier = screen.getByText('Financier');
        expect(financier).toBeTruthy();

        const branch = screen.getByText('Branch');
        expect(branch).toBeTruthy();

        const fileNo = screen.getByText('File Number');
        expect(fileNo).toBeTruthy();

        const loanAmt = screen.getByText('Loan Amount');
        expect(loanAmt).toBeTruthy();

        const emi = screen.getByText('EMI');
        expect(emi).toBeTruthy();

        const doRecived = screen.getByText('D.O. Recived');
        expect(doRecived).toBeTruthy();

        const doNumber = screen.getByText('D.O. Number');
        expect(doNumber).toBeTruthy();

        const doDate = screen.getByText('D.O. Date');
        expect(doDate).toBeTruthy();
    });
});
