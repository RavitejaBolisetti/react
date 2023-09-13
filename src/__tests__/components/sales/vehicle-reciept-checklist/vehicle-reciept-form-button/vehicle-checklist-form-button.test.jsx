import React from 'react';
import { VehicleCheckListbutton } from '@components/Sales/VehicleRecieptChecklist/VehicleRecieptFormButton/VehicleChecklistFormButton';
import customRender from '@utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

const buttonData = {
    closeBtn: true,
    cancelBtn: true,
    saveBtn: true,
    saveAndNewBtn: true,
    editBtn: true,
    formBtnActive: true,
    nextBtn: true
};

describe('Vehicle Reciept Form Button container', () => {
    it('Should render Vehicle Reciept Form Button components', () => {
        const props = {
            buttonType: false,
            buttonData: buttonData,
            saveButtonName: "Save & Next",
            isLastSection: false,
            handleButtonClick: jest.fn(),
            setButtonData: jest.fn(),
        }
        customRender(
            <VehicleCheckListbutton {...props} />
        )

        const closeBtn = screen.getByRole('button', { name: 'Close'});
        fireEvent.click(closeBtn)

        const cancelBtn = screen.getByRole('button', { name: 'Cancel'});
        fireEvent.click(cancelBtn)

        const editBtn = screen.getByRole('button', { name: 'Edit'});
        fireEvent.click(editBtn)

        const nextBtn = screen.getByRole('button', { name: 'Next'});
        fireEvent.click(nextBtn)

        const saveNextBtn = screen.getByRole('button', { name: 'Save & Next'});
        fireEvent.click(saveNextBtn)
    })
})