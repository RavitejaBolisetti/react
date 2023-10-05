import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import { OTFFormButton } from '@components/Sales/Common/OTFFormButton/OTFFormButton';
import customRender from '@utils/test-utils';
import { Form, Button } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

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
    otfSoMappingHistoryBtn: true,
};

describe('OTF form button render', () => {

    it("Should render OTF form button components", () => {
        customRender(<OTFFormButton />)
    })

    it('Should render OTF All button', async () => {
        customRender(<OTFFormButton setButtonData={jest.fn()} buttonData={buttonData} handleButtonClick={jest.fn()} saveButtonName={"Save & Next"}/>);
        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);

        const editBtn = screen.getByRole('button', { name: 'Edit' });
        fireEvent.click(editBtn);

        const bookingMapHistoryBtn = screen.getByRole('button', { name: 'Booking Mapping History' });
        fireEvent.click(bookingMapHistoryBtn);

        const allotBtn = screen.getByRole('button', { name: 'Allot' });
        fireEvent.click(allotBtn);

        const unAllotBtn = screen.getByRole('button', { name: 'Un-Allot' });
        fireEvent.click(unAllotBtn);

        const invoiceBtn = screen.getByRole('button', { name: 'Invoice' });
        fireEvent.click(invoiceBtn);
        const deliveryNoteBtn = screen.getByRole('button', { name: 'Delivery Note' });
        fireEvent.click(deliveryNoteBtn);

        const transferOTFBtn = screen.getByRole('button', { name: 'Transfer Booking' });
        fireEvent.click(transferOTFBtn);

        const cancelOTFBtn = screen.getByRole('button', { name: 'Cancel Booking' });
        fireEvent.click(cancelOTFBtn);

        const changeHistory = screen.getByRole('button', { name: 'Change History' });
        fireEvent.click(changeHistory);

        const nextBtn = screen.getByRole('button', { name: 'Next' });
        fireEvent.click(nextBtn);
        const saveBtn = screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(saveBtn);
    });

});
