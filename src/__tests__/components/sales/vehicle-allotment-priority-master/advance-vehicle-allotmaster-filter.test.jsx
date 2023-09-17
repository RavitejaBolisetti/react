/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import AdvanceVehicleAllotMasterFilter from '@components/Sales/VehicleAllotmentPriorityMaster/AdvanceVehicleAllotMasterFilter';

const setFieldsValue = true;

describe('Advance Vehicle Allot Master Filter component', () => {
    it('should render advance vehicle allot master filter component', () => {
        customRender(<AdvanceVehicleAllotMasterFilter searchForm={setFieldsValue} />);
    });

    it('button should work', () => {
        customRender(<AdvanceVehicleAllotMasterFilter searchForm={setFieldsValue} />);
        const plusAddBtn = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusAddBtn);
        const plusBtn = screen.getByRole('button', { name: 'plus' });
        fireEvent.click(plusBtn);
    });
});
