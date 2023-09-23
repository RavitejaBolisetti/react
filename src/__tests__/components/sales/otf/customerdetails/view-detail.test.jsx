/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { ViewDetail } from '@components/Sales/Common/CustomerDetails/ViewDetail';

const bookingCustomer = true;

describe('view details Components', () => {
    it('should render list details components', () => {
        customRender(<ViewDetail formData={bookingCustomer} />);
    });

    it('it should click when user click on plus icon', () => {
        customRender(<ViewDetail formData={bookingCustomer} />);
        const plusicon = screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(plusicon[0]);
        fireEvent.click(plusicon[1]);
    });
});
