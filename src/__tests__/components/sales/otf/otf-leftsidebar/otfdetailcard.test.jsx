/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen } from '@testing-library/react';
import OTFDetailCard from '@components/Sales/OTF/LeftSidebar/OTFDetailCard';

describe('Booking detail card Components', () => {
    it('it should render Booking detailcard components', () => {
        customRender(<OTFDetailCard />);
        const customertype = screen.getByText('Booking No.:');
        expect(customertype).toBeInTheDocument();
        const model = screen.getByText('See more:');
        expect(model).toBeInTheDocument();
    });
});
