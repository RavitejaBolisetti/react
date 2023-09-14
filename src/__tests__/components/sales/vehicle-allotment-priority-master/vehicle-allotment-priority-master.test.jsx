/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { VehicleAllotmentPriorityMaster } from '@components/Sales/VehicleAllotmentPriorityMaster/VehicleAllotmentPriorityMaster';

const FROM_ACTION_TYPE = {
    ADD: 'add',
    EDIT: 'edit',
    VIEW: 'view',
    VIEW_ONLY: 'view_only',
    NEXT: 'next',
    CANCEL_VOUCHER: 'cancel_voucher',
    CANCEL_OTF: 'cancel_otf',
    TRANSFER_OTF: 'transfer_otf',
    CHILD: 'child',
    SIBLING: 'siblin',
    ALLOT: 'allot',
};
const buttonData = {
    closeBtn: true,
    cancelBtn: true,
    editBtn: true,
    allotBtn: true,
    unAllotBtn: true,
    invoiceBtn: true,
    deliveryNoteBtn: true,
    transferOTFBtn: true,
    changeHistory: true,
    nextBtn: true,
    saveBtn: true,
    formBtnActive: true,
    cancelOtfBtn: true,
};

describe('vehicle allotment priority master component', () => {
    it('should render vehicle allotment priority master component', () => {
        customRender(<VehicleAllotmentPriorityMaster FROM_ACTION_TYPE={FROM_ACTION_TYPE} buttonData={buttonData} />);
    });
    it('button should work', () => {
        customRender(<VehicleAllotmentPriorityMaster FROM_ACTION_TYPE={FROM_ACTION_TYPE} buttonData={buttonData} />);
        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);
        const plusAdd = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusAdd);
        const advancedFilters = screen.getByRole('button', { name: 'Advanced Filters' });
        fireEvent.click(advancedFilters);
        const leftBtn = screen.getByRole('button', { name: 'left' });
        fireEvent.click(leftBtn);
        const rightBtn = screen.getByRole('button', { name: 'right' });
        fireEvent.click(rightBtn);

        const searchsBtn = screen.getByRole('img', { name: 'search' });
        fireEvent.click(searchsBtn);
        const plusAdds = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(plusAdds);
        const leftsBtn = screen.getByRole('img', { name: 'left' });
        fireEvent.click(leftsBtn);
        const rightsBtn = screen.getByRole('img', { name: 'right' });
        fireEvent.click(rightsBtn);
    });

    it('should render column header text', () => {
        customRender(<VehicleAllotmentPriorityMaster FROM_ACTION_TYPE={FROM_ACTION_TYPE} buttonData={buttonData} />);
        const SrlBtn = screen.getByRole('img', { name: 'Srl.' });
        fireEvent.click(SrlBtn);
        const oldModel = screen.getByRole('img', { name: 'Old Model' });
        fireEvent.click(oldModel);
        const newModel = screen.getByRole('img', { name: 'New Model' });
        fireEvent.click(newModel);
        const effectiveFromDate = screen.getByRole('img', { name: 'Effective From Date' });
        fireEvent.click(effectiveFromDate);
        const effectiveToDate = screen.getByRole('img', { name: 'Effective To Date' });
        fireEvent.click(effectiveToDate);
        const action = screen.getByRole('img', { name: 'Action' });
        fireEvent.click(action);
        const noRecordsFound = screen.getByRole('cell', { name: 'No records found' });
        fireEvent.click(noRecordsFound);
    });
});
