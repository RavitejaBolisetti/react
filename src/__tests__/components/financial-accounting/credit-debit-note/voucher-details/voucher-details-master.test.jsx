/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { VoucherDetailsMaster } from '@components/FinancialAccounting/CreditDebitNote/VoucherDetails/VoucherDetailsMaster';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('VoucherDetailsMaster component', () => {

    it('render image1', () => {
        customRender(<VoucherDetailsMaster />);

        const plusImg1 = screen.getAllByRole('img', {name:'plus'});
        fireEvent.click(plusImg1[0]);
    });

    it('render image2', () => {
        customRender(<VoucherDetailsMaster />);

        const plusImg = screen.getAllByRole('img', {name:'plus'});
        fireEvent.click(plusImg[1]);
    });

    it('render plus add button', () => {
        customRender(<VoucherDetailsMaster />);

        const plusAddBtn = screen.getByRole('button', {name:'plus Add'});
        fireEvent.click(plusAddBtn);
    });
});
