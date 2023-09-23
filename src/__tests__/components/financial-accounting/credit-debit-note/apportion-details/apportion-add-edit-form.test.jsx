/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/FinancialAccounting/CreditDebitNote/ApportionDetails/AddEditForm';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('ViewDetail component', () => {

    it('plus image', () => {
        customRender(<AddEditForm handleCollapse={jest.fn()} />);

        const plusImg1 = screen.getAllByRole('img', {name:"plus"});
        fireEvent.click(plusImg1[0]);
    });

    it('plus add button', () => {
        customRender(<AddEditForm setOpenAccordian={jest.fn()} setIsReadOnly={jest.fn()}/>);

        const plusAddBtn = screen.getByRole('button', {name:"plus Add"});
        fireEvent.click(plusAddBtn);
    });
});
