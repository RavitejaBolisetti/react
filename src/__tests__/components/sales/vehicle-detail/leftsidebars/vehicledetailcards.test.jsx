/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import VehicleDetailCard from '@components/Sales/VehicleDetail/LeftSidebar/VehicleDetailCard';

describe('vehicle detail card Components', () => {
    it('it should render vehicle detail card components', () => {
        customRender(<VehicleDetailCard isActive={true} />);

        const screenText = screen.getByText('See less');
        fireEvent.click(screenText);

        const RegNoText = screen.getByText('Reg No:');
        expect(RegNoText).toBeVisible();
    });
});
