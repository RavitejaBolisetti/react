import '@testing-library/jest-dom/extend-expect';

import { AccountAndDocumentMappingMaster } from '@components/FinancialAccounting/AccountCategory/AccountAndDocumentMapping/index';

import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render components', () => {
    it('should render components', () => {
        customRender(<AccountAndDocumentMappingMaster />);
    });
});
