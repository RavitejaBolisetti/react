import '@testing-library/jest-dom/extend-expect';

import { TaxChargesMaster } from '@components/FinancialAccounting/AccountTaxCharges/TaxAndCharges/index';

import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render components', () => {
    it('should render components', () => {
        customRender(<TaxChargesMaster />);
    });
});
