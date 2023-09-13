
/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CreditDebitNoteMaster } from '@components/FinancialAccounting/CreditDebitNote/CreditDebitNoteMaster';

import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render components', () => {
    it('should render components', () => {
        customRender(<CreditDebitNoteMaster />);

        const textbox = screen.getByRole('textbox', {name:'Search Credit/Debit'});
        fireEvent.change(textbox,{target:{value:'test'}});

        const searchImg = screen.getByRole('img', {name:'search'});
        fireEvent.click(searchImg)
    });
    it('Credit button', () => {
        customRender(<CreditDebitNoteMaster />);

        const creditBtn = screen.getByRole('button', {name:'Add Credit Note'});
        fireEvent.click(creditBtn)
    });
    it('Debit button', () => {
        customRender(<CreditDebitNoteMaster />);

        const debitBtn = screen.getByRole('button', {name:'Add Debit Note'});
        fireEvent.click(debitBtn)
    });
    it('Advanced Filters', () => {
        customRender(<CreditDebitNoteMaster />);

        const advancedBtn = screen.getByRole('button', {name:'Advanced Filters'});
        fireEvent.click(advancedBtn)
    });
});
