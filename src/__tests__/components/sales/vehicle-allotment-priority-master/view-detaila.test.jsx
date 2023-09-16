/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { ViewDetail } from '@components/Sales/VehicleAllotmentPriorityMaster/ViewDetail';

describe('view detail component', () => {
    const styles = {
        viewDrawerContainer: '',
    };
    const formData = {
        roleData: [
            {
                getRoleName: '',
                getDesignationName: '',
                getOldModelGroup: '',
                getNewModelGroup: '',
            },
        ],
    };
    const buttonData = {
        allotBtn: true,
    };
    const roleData = [
        { key: 1, value: 'test' },
        { key: 2, value: 'test' },
    ];

    it('should render view detail component', () => {
        customRender(<ViewDetail styles={styles} />);
    });

    it('should render columnheader text', () => {
        customRender(<ViewDetail styles={styles} formData={formData} buttonData={buttonData} roleData={roleData} />);
        const oldNewModel = screen.getByRole('row', { name: 'Old Model New Model Effective From Date' });
        fireEvent.click(oldNewModel);
        const effectiveDate = screen.getByRole('row', { name: 'Effective To Date' });
        fireEvent.click(effectiveDate);
        const rowText = screen.getByRole('row', { name: '- - -' });
        fireEvent.click(rowText);

        const oldModel = screen.getByRole('columnheader', { name: 'Old Model' });
        fireEvent.click(oldModel);
        const newModel = screen.getByRole('columnheader', { name: 'New Model' });
        fireEvent.click(newModel);
        const effectiveFromDate = screen.getByRole('columnheader', { name: 'Effective From Date' });
        fireEvent.click(effectiveFromDate);
        const effectiveToDate = screen.getByRole('columnheader', { name: 'Effective To Date' });
        fireEvent.click(effectiveToDate);
    });
});
