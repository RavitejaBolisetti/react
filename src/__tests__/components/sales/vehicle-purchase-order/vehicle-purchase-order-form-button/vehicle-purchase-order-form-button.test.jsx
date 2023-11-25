/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { VehiclePurchaseOrderFormButton } from '@components/Sales/VehiclePurchaseOrder/VehiclePurchaseOrderFormButton/VehiclePurchaseOrderFormButton';

const buttonData = {
    closeBtn: true,
    cancelBtn: true,
    editBtn: true,
    allotBtn: true,
    unAllotBtn: true,
    invoiceBtn: true,
    deliveryNoteBtn: true,
    transferOTFBtn: true,
    cancelOTFBtn: true,
    changeHistory: true,
    nextBtn: true,
    saveBtn: true,
    formBtnActive: true,
    cancelVPOBtn: true,
    cancelOtfBtn: true,
};
const saveButtonName = 'Save';
const isLoadingOnSave = false;
const saveAndNewBtnClicked = true;

describe('Vehicle Purchase Order Form Button Components', () => {
    it('should renders all buttons correctly', () => {
        customRender(<VehiclePurchaseOrderFormButton formData={{}} onCloseAction={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} saveButtonName={saveButtonName} handleButtonClick={jest.fn()} isLoadingOnSave={isLoadingOnSave} saveAndNewBtnClicked={saveAndNewBtnClicked} />);
    });

    it('should check all button click events', async () => {
        customRender(<VehiclePurchaseOrderFormButton formData={{}} onCloseAction={jest.fn()} isLoadingOnSave={false} setButtonData={jest.fn()} buttonData={buttonData} handleButtonClick={jest.fn()} />);

        const closeBtn = screen.getByRole('button', { name: 'Close', exact: false });
        fireEvent.click(closeBtn);
        const cancelBtn = screen.getByRole('button', { name: 'Cancel', exact: false });
        fireEvent.click(cancelBtn);
        const nextBtn = screen.getByRole('button', { name: 'Next', exact: false });
        fireEvent.click(nextBtn);
        const cancelPOBtn = screen.getAllByRole('button', { name: 'Cancel Vehicle Purchase Order', exact: false });
        fireEvent.click(cancelPOBtn[0]);
        const cancelOtfBtn = screen.getAllByRole('button', { name: 'Cancel Booking', exact: false });
        fireEvent.click(cancelOtfBtn[0]);
        fireEvent.click(cancelOtfBtn[1]);
        const cancelVpoBtn = screen.getAllByRole('button', { name: 'Cancel Vehicle Purchase Order', exact: false });
        fireEvent.click(cancelVpoBtn[1]);
        const saveNextBtn = screen.getByRole('button', { name: 'Save & Next', exact: false });
        fireEvent.click(saveNextBtn);
    });
});
