import '@testing-library/jest-dom/extend-expect';

import { CreditDebitNoteFormButton } from '@components/FinancialAccounting/CreditDebitNote/CreditDebitFormButton/index';

import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render components', () => {
    it('should render components', () => {
        customRender(<CreditDebitNoteFormButton />);
    });
});
