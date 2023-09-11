/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormProductAttribute from '@components/FinancialAccounting/AccountTaxCharges/TaxAndChargesCategory/TaxAndChargesCalculation/FormTaxAndChargeCal';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('FormProductAttribute component', () => {
    it('render', () => {
        customRender(<FormProductAttribute addTaxChargeCal={jest.fn()} />);
        
        const desc = screen.getByRole('textbox', {namea:'Description'});
        fireEvent.change(desc, {target:{value:'test'}});

        const plusAddBtn = screen.getByRole('button', {name:'plus Add'});
        fireEvent.click(plusAddBtn);
    });
})