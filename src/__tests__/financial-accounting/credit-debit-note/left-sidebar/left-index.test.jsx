import '@testing-library/jest-dom/extend-expect';

import { LeftSidebar } from '@components/FinancialAccounting/CreditDebitNote/LeftSidebar/index';

import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render components', () => {
    it('should render components', () => {
        customRender(<LeftSidebar />);
    });
});
