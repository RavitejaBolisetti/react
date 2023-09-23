import '@testing-library/jest-dom/extend-expect';
import { UserManagementFormButton } from 'components/common/UserManagement/UserManagementFormButton/UserManagementFormButton';
import { fireEvent, screen } from "@testing-library/react";
import customRender from '@utils/test-utils';
import React from 'react';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('User Management Form Button Component', () => {

    it('should render user management form button components', () => {
        customRender(<UserManagementFormButton />)
    });

    it('all buttons should work', () => {
        const buttonData={
            editBtn: true, 
            nextBtn: true,
            nextBtnWthPopMag: true,
            saveBtn: true,
            formBtnActive: true
        }
        customRender(<UserManagementFormButton buttonData={buttonData} handleButtonClick={jest.fn()} setButtonData={jest.fn()} />);
        const editBtn=screen.getByRole('button', { name: 'Edit' });
        fireEvent.click(editBtn);
        const nextBtn=screen.getAllByRole('button', { name: 'Next' });
        fireEvent.click(nextBtn[0]);
        fireEvent.click(nextBtn[1]);
        const saveBtn=screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(saveBtn);

    });

});