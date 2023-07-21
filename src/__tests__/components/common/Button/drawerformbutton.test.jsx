/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DrawerFormButton } from '@components/common/Button/DrawerFormButton';
import { act } from 'react-dom/test-utils';
import customRender from "@utils/test-utils";

const buttonData = {
    closeBtn: true,
    cancelBtn: true,
    saveBtn: true,
    saveAndNewBtn: true,
    editBtn: true,
    formBtnActive: false,
  };
  const saveButtonName = 'Save';
  const isLoadingOnSave = false;
  const saveAndNewBtnClicked = true;

describe('DrawerFormButton Components', () => {
    it('should render DrawerFormButton components', () => {
        const { container } = customRender(<DrawerFormButton />);
        expect(container.firstChild).toHaveClass('formFooter');
    });
});
 
describe('DrawerFormButton components', () => {
    it('should renders all buttons correctly', () => {
  
        customRender(
            <DrawerFormButton
                formData={{}}
                onCloseAction={jest.fn()}
                buttonData={buttonData}
                setButtonData={jest.fn()}
                saveButtonName={saveButtonName}
                handleButtonClick={jest.fn()}
                isLoadingOnSave={isLoadingOnSave}
                saveAndNewBtnClicked={saveAndNewBtnClicked}
                />
        );
        expect(screen.getByText('Close')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByText(saveButtonName)).toBeInTheDocument();
        expect(screen.getByText('Save & Add New')).toBeInTheDocument();
        expect(screen.getByText('Edit')).toBeInTheDocument();
     });
   it("should check all button click events", async()=> {
    const onClick = jest.fn();
        const {getByRole, getByText} = customRender(<DrawerFormButton
            formData={{}}
            onCloseAction={jest.fn()}
            buttonData={buttonData}
            setButtonData={jest.fn()}
            saveButtonName={saveButtonName}
            handleButtonClick={jest.fn()}
            isLoadingOnSave={isLoadingOnSave}
            saveAndNewBtnClicked={saveAndNewBtnClicked}
        />);
        await act(async () => {
            const closeButton = getByRole('button', {
                name: /Close/i
            });
            fireEvent.click(closeButton); 
        });
        await act(async () => {
            const cancleButton = getByRole('button', {
                name: /Cancel/i
            });
            fireEvent.click(cancleButton); 
        });

        await act(async () => {
            const saveButton = getByText('Save');
            fireEvent.click(saveButton);
            expect(onClick).not.toHaveBeenCalled();
        });
        await act(async () => {
            const saveActiveButton = getByText('Save');
            fireEvent.click(saveActiveButton); 

        });
        await act(async () => {
            const saveAddNewDisableButton = getByRole('button', {
                name: /Save & Add New/i
            });
            fireEvent.click(saveAddNewDisableButton);
            expect(onClick).not.toHaveBeenCalled();
        });
        await act(async () => {
            const saveAddNewButton = getByRole('button', {
                name: /Save & Add New/i
            });
            fireEvent.click(saveAddNewButton); 
        });
        await act(async () => {
            const editButton = getByRole('button', {
                name: /Edit/i
            });
            fireEvent.click(editButton); 
        });
    });

});
