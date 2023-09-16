/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { AddEditForm } from '@components/Sales/VehicleAllotmentPriorityMaster/AddEditForm';

describe('add edit form component', () => {
    const viewVehicleAllotData = {
        roleData: [
            {
                getRoleName: '',
                getDesignationName: '',
                setButtonData: jest.fn(),
                formBtnActive: true,
            },
        ],
    };

    it('should render add edit form component', () => {
        const formActionType = { editMode: true };
        customRender(<AddEditForm isVisible={true} viewVehicleAllotData={viewVehicleAllotData} formActionType={formActionType} />);
    });

    it('it should click when user click on button ', () => {
        const formActionType = { editMode: true };

        customRender(<AddEditForm viewVehicleAllotData={viewVehicleAllotData} isVisible={true} formActionType={formActionType} />);
        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);

        const closedBtn = screen.getByRole('img', { name: 'close' });
        fireEvent.click(closedBtn);
        const calendarBtn = screen.getAllByRole('img', { name: 'calendar' });
        fireEvent.click(calendarBtn[0]);
        fireEvent.click(calendarBtn[1]);

        const oldModel = screen.getByRole('combobox', { name: 'Old Model(Exchange)' });
        fireEvent.click(oldModel);
        const newModel = screen.getByRole('combobox', { name: 'New Model(Booking)' });
        fireEvent.click(newModel);

        const effectiveFromDate = screen.getByRole('textbox', { name: 'Effective From Date' });
        fireEvent.change(effectiveFromDate, { target: { value: '12-9-2023' } });

        const effectiveToDate = screen.getByRole('textbox', { name: 'Effective To Date' });
        fireEvent.change(effectiveToDate, { target: { value: '12-10-2024' } });
    });
});
