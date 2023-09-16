/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
afterEach(() => {
    jest.restoreAllMocks();
});
describe('Booking tableColumn component render', () => {
    it('should render Booking tableColumn component ', async () => {
        customRender(<tableColumn />);
    });
});
