import '@testing-library/jest-dom/extend-expect';

import { TaxChargesCategory } from '@components/FinancialAccounting/AccountTaxCharges/TaxAndChargesCategory/index';

import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render components', () => {
    it('should render components', () => {
        customRender(<TaxChargesCategory />);
    });
});
