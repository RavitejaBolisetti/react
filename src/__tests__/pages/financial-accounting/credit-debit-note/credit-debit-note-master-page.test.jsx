/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { CreditDebitNoteMasterPage } from '@pages/FinancialAccounting/CreditDebitNote/CreditDebitNoteMasterPage';


afterEach(() => {
    jest.restoreAllMocks();
});

describe('CreditDebitNoteMasterPage Components', () => {
    it('should render CreditDebitNoteMasterPage components', () => {
        customRender(<CreditDebitNoteMasterPage />);
    });
});