import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { GstIRNTransactionPage } from '@pages/FinancialAccounting/GstIRNTransaction/GstIRNTransactionPage';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('GstIRNTransactionPage Components', () => {
    it('should render GstIRNTransactionPage components', () => {
        customRender(<GstIRNTransactionPage />);
    });
});
