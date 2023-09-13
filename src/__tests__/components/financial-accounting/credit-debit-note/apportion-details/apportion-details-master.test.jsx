/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ApportionDetailsMaster } from '@components/FinancialAccounting/CreditDebitNote/ApportionDetails/ApportionDetailsMaster';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('ApportionDetailsMaster component', () => {
    it('plus image', () => {
        customRender(<ApportionDetailsMaster />);
        
        const plusImg = screen.getAllByRole('img', {name:"plus"});
        fireEvent.click(plusImg[0]);
    });

    it('add plus button', () => {
        customRender(<ApportionDetailsMaster />);
        
        const plusAddBtn = screen.getByRole('button', {name:"plus Add"});
        fireEvent.click(plusAddBtn);
    });
});
