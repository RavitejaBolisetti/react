import '@testing-library/jest-dom/extend-expect';

import { DocTypeAcMappingMaster } from '@components/FinancialAccounting/AccountTaxCharges/DocumentTypeOtherCharges/DocTypeAcHeadMapping/index';

import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render components', () => {
    it('should render components', () => {
        customRender(<DocTypeAcMappingMaster />);
    });
});
