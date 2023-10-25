import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { AMCRegistrationFormButton } from '@components/Sales/AMCRegistration/AMCRegistrationFormButton/AMCRegistrationFormButton';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

const buttonData = {
    closeBtn: true,
    cancelBtn: true,
    cancelAMCBtn: true,
    rejectCancelBtn: true,
    approveCancelBtn: true,
    nextBtn: true,
    saveBtn: true,   
    formBtnActive: true 
};

describe('Amc registration form button render', () => {

    it("Should render Amc registration form button components", () => {
        customRender(<AMCRegistrationFormButton />)
    })

    it('Should render Amc registration All button', async () => {
        customRender(<AMCRegistrationFormButton setButtonData={jest.fn()} buttonData={buttonData} handleButtonClick={jest.fn()} saveButtonName={"Save & Next"}/>);
        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);

        const cancelAMC = screen.getByRole('button', { name: 'Cancel AMC' });
        fireEvent.click(cancelAMC);

        const reject = screen.getByRole('button', { name: 'Reject' });
        fireEvent.click(reject);

        const approve = screen.getByRole('button', { name: 'Approve' });
        fireEvent.click(approve);

        const nextBtn = screen.getByRole('button', { name: 'Next' });
        fireEvent.click(nextBtn);

        const saveBtn = screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(saveBtn);        
    });

});
