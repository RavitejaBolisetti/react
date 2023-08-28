import '@testing-library/jest-dom/extend-expect';

import { AccountCategory } from '@components/FinancialAccounting/AccountCategory/index';

import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render components', () => {
    it('should render components', () => {
        customRender(<AccountCategory />);
    });
});
