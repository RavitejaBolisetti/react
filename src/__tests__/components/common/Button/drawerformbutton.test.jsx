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
    formBtnActive: true,
  };
  const saveButtonName = 'Save';
  const isLoadingOnSave = false;

describe('DrawerFormButton Components', () => {
    it('should render DrawerFormButton components', () => {
        const { container } = render(<DrawerFormButton />);
        expect(container.firstChild).toHaveClass('formFooter');
    });
});
 
describe('DrawerFormButton components', () => {
    it('should renders all buttons correctly', () => {
  
      render(
   <DrawerFormButton
          formData={{}}
          onCloseAction={jest.fn()}
          buttonData={buttonData}
          setButtonData={jest.fn()}
          saveButtonName={saveButtonName}
          handleButtonClick={jest.fn()}
          isLoadingOnSave={isLoadingOnSave}
        />
      );
   
      // Assert that all buttons are rendered
      expect(screen.getByText('Close')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText(saveButtonName)).toBeInTheDocument();
      expect(screen.getByText('Save & Add New')).toBeInTheDocument();
      expect(screen.getByText('Edit')).toBeInTheDocument();
   
      // Add more assertions for button behavior and attributes if needed
    });
   });
   it("should check all button click events", async()=> {
        customRender(<DrawerFormButton
            formData={{}}
            onCloseAction={jest.fn()}
            buttonData={buttonData}
            setButtonData={jest.fn()}
            saveButtonName={saveButtonName}
            handleButtonClick={jest.fn()}
            isLoadingOnSave={isLoadingOnSave}
        />);
        await act(async () => {
            const closeButton = screen.getByRole('button', {
                name: /Close/i
            });
            fireEvent.click(closeButton); 
        });
        await act(async () => {
            const cancleButton = screen.getByRole('button', {
                name: /Cancel/i
            });
            fireEvent.click(cancleButton); 
        });
        await act(async () => {
            const saveAddNewButton = screen.getByRole('button', {
                name: /Save & Add New/i
            });
            fireEvent.click(saveAddNewButton); 
        });
        await act(async () => {
            const editButton = screen.getByRole('button', {
                name: /Edit/i
            });
            fireEvent.click(editButton); 
        });
})