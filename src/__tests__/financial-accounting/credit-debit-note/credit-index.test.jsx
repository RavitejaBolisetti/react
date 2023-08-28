import '@testing-library/jest-dom/extend-expect';

import { CreditDebitNoteMaster } from '@components/FinancialAccounting/CreditDebitNote/index';

import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render components', () => {
    it('should render components', () => {
        customRender(<CreditDebitNoteMaster />);
    });
});
