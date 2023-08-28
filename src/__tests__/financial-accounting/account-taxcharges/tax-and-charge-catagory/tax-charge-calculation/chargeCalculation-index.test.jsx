import '@testing-library/jest-dom/extend-expect';

import { TaxAndChargesCalculationMaster } from '@components/FinancialAccounting/AccountTaxCharges/TaxAndChargesCategory/TaxAndChargesCalculation/index';

import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render components', () => {
    it('should render components', () => {
        customRender(<TaxAndChargesCalculationMaster />);
    });
});
