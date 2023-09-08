import '@testing-library/jest-dom/extend-expect';

import { VoucherDetailsMaster } from '@components/FinancialAccounting/CreditDebitNote/VoucherDetails/index';

import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render components', () => {
    it('should render components', () => {
        customRender(<VoucherDetailsMaster />);
    });
});
