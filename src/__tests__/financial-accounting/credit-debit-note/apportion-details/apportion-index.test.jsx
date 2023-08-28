import '@testing-library/jest-dom/extend-expect';

import { ApportionDetailsMaster } from '@components/FinancialAccounting/CreditDebitNote/ApportionDetails/index';

import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render components', () => {
    it('should render components', () => {
        customRender(<ApportionDetailsMaster />);
    });
});
