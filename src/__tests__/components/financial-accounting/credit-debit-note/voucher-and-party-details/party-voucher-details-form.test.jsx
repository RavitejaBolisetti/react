/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { VoucherDetailsForm } from '@components/FinancialAccounting/CreditDebitNote/VoucherAndPartyDetails/VoucherDetailsForm';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('VoucherDetailsForm components', () => {
    it('render all textbox', () => {
        customRender(<VoucherDetailsForm />);

        const settled = screen.getByRole('textbox', {name:'Total Settled Amount'});
        fireEvent.change(settled,{target:{value:'test2'}});

        const writeOff = screen.getByRole('textbox', {name:'Total Write-Off Amount'});
        fireEvent.change(writeOff, {target:{value:'test2'}});

        const apportioned = screen.getByRole('textbox', {name:'Total Apportioned Amount'});
        fireEvent.change(apportioned, {target:{value:'test3'}});
    })
})