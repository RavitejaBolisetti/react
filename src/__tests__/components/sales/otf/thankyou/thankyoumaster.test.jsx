/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { ThankYouMaster } from '@components/Sales/OTF/ThankYou/ThankYouMaster';
afterEach(() => {
    jest.restoreAllMocks();
});
describe('Thankyou master Components', () => {
    it('booking - it should render thankyoumaster components', () => {
        customRender(<ThankYouMaster />);
        const closebtn = screen.getByRole('button', { name: 'Close' });
        expect(closebtn).toBeTruthy();
        fireEvent.click(closebtn)
    });
});
