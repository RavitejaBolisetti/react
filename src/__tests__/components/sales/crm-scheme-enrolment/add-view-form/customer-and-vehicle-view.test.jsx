/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { CustomerAndVehicleView } from '@components/Sales/crmSchemeEnrolment/addViewForm/CustomerAndVehicleView';

describe('customer and vehicle view component', () => {
    it('should render customer and vehicle view component', () => {
        customRender(<CustomerAndVehicleView isVisible={true} onChange={jest.fn()} />);
        const plusIcon = screen.getAllByRole('img', { value: 'plus' });
        fireEvent.click(plusIcon[0]);
        fireEvent.click(plusIcon[1]);
    });
});
