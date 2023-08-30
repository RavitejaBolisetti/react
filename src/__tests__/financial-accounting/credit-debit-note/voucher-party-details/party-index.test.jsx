import '@testing-library/jest-dom/extend-expect';

import { VoucherAndPartyDetailsMaster } from '@components/FinancialAccounting/CreditDebitNote/VoucherAndPartyDetails/index';

import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render components', () => {
    it('should render components', () => {
        customRender(<VoucherAndPartyDetailsMaster />);
    });
});