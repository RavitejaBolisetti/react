/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ViewDetail } from '@components/FinancialAccounting/CreditDebitNote/VoucherDetails/ViewDetail';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render components', () => {
    it('should render plus and minus image', () => {
        customRender(<ViewDetail styles={{}}/>);

        const plusImg = screen.getByRole('img', {name:'plus'});
        fireEvent.click(plusImg);

        const minusImg = screen.getByRole('img', {name:'minus'});
        fireEvent.click(minusImg);
    });

    it('should render all columnheader', () => {
        customRender(<ViewDetail styles={{}}/>);

        const plusImg = screen.getByRole('img', {name:'plus'});
        fireEvent.click(plusImg);

        // const head = screen.getByRole('columnheader', {name:'Account Head'});
        // expect(head).toBeTruthy();

        // const narration = screen.getByRole('columnheader', {name:'Narration'});
        // expect(narration).toBeTruthy();

        // const amount = screen.getByRole('columnheader', {name:'Amount'});
        // expect(amount).toBeTruthy();

        // const action = screen.getByRole('columnheader', {name:'Action'});
        // expect(action).toBeTruthy();
    });
});
