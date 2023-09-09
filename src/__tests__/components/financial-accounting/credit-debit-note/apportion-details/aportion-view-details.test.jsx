/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ViewDetail } from '@components/FinancialAccounting/CreditDebitNote/ApportionDetails/ViewDetail';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('ViewDetail component', () => {
    it('render', () => {
        customRender(<ViewDetail styles={{}}/>);

        const plusImg = screen.getByRole('img', {name:"plus"});
        fireEvent.click(plusImg);
    });
});
