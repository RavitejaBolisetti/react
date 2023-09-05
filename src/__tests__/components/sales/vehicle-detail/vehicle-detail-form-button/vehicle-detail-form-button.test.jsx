import React from 'react';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { VehicleDetailFormButton } from 'components/Sales/VehicleDetail/VehicleDetailFormButton';

describe('Vehicle Detail Form Button Component', () => {

    it('should render Vehicle detail form button component', () => {
        customRender(<VehicleDetailFormButton />);
    });

    it('all buttons should render and work', () => {
        const buttonData={
            closeBtn: true,
            cancelBtn: true,
            editBtn: true,
            transferBtn: true,
            allotBtn: true,
            unAllot: true,
            invoiceBtn: true,
            deliveryNoteBtn: true,
            cancelOtfBtn: true,
            nextBtn: true,
            saveBtn: true,
            formBtnActive: true
        }
        customRender(<VehicleDetailFormButton buttonData={buttonData} handleButtonClick={jest.fn()} setButtonData={jest.fn()}/>);

        const closeBtn=screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);

        const cancelBtn=screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);

        const editBtn=screen.getByRole('button', { name: 'Edit' });
        fireEvent.click(editBtn);

        const transferBtn=screen.getByRole('button', { name: 'Transfer' });
        fireEvent.click(transferBtn);

        const allotBtn=screen.getByRole('button', { name: 'Allot' });
        fireEvent.click(allotBtn);

        const unAllot=screen.getByRole('button', { name: 'Un-Allot' });
        fireEvent.click(unAllot);

        const invoiceBtn=screen.getByRole('button', { name: 'Invoice' });
        fireEvent.click(invoiceBtn);

        const deliveryNoteBtn=screen.getByRole('button', { name: 'Delivery Note' });
        fireEvent.click(deliveryNoteBtn);

        const cancelOtfBtn=screen.getByRole('button', { name: 'Cancel OTF' });
        fireEvent.click(cancelOtfBtn);

        const nextBtn=screen.getByRole('button', { name: 'Next' });
        fireEvent.click(nextBtn);

        const saveBtn=screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(saveBtn);
    });

});