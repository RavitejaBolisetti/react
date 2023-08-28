import '@testing-library/jest-dom/extend-expect';

import { DocumentTypeOtherChargesMaster } from '@components/FinancialAccounting/AccountTaxCharges/DocumentTypeOtherCharges/index';

import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render components', () => {
    it('should render components', () => {
        customRender(<DocumentTypeOtherChargesMaster />);
    });
});
