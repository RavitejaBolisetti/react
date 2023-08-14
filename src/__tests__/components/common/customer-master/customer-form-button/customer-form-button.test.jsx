import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CustomerFormButton } from '@components/common/CustomerMaster/CustomerFormButton/CustomerFormButton';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

describe('CustomerFormButton', () => {
    const mockRecord = { id: 1, name: 'John Doe' };
    const mockHandleButtonClick = jest.fn();
    const mockOnCloseAction = jest.fn();
    const mockSetButtonData = jest.fn();
    const mockSaveButtonName = 'Save & Next';
    const mockIsLoadingOnSave = false;
    const mockIsLastSection = false;

    const mockButtonData = {
        closeBtn: true,
        cancelBtn: true,
        editBtn: true,
        nextBtn: true,
        saveBtn: true,
        formBtnActive: true,
    };

    it('should render all buttons correctly', () => {
        render(<CustomerFormButton record={mockRecord} onCloseAction={mockOnCloseAction} buttonData={mockButtonData} setButtonData={mockSetButtonData} handleButtonClick={mockHandleButtonClick} isLoadingOnSave={mockIsLoadingOnSave} isLastSection={mockIsLastSection} />);

        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
        expect(screen.getAllByRole('button', { name: /next/i, exact: false })).toBeTruthy();
        expect(screen.getByRole('button', { name: /save & next/i })).toBeInTheDocument();
    });

    it('should call onCloseAction when Close button is clicked', () => {
        render(<CustomerFormButton record={mockRecord} onCloseAction={mockOnCloseAction} buttonData={{ closeBtn: true }} />);

        fireEvent.click(screen.getByRole('button', { name: /close/i }));

        expect(mockOnCloseAction).toHaveBeenCalledTimes(1);
    });

    it('should call handleButtonClick with correct arguments when Edit button is clicked', () => {
        render(<CustomerFormButton record={mockRecord} handleButtonClick={mockHandleButtonClick} buttonData={{ editBtn: true }} />);

        fireEvent.click(screen.getByRole('button', { name: /edit/i }));

        expect(mockHandleButtonClick).toHaveBeenCalledTimes(1);
        expect(mockHandleButtonClick).toHaveBeenCalledWith({
            buttonAction: FROM_ACTION_TYPE.EDIT,
            record: mockRecord,
            openDefaultSection: false,
        });
    });
    it('should call handleButtonClick with correct arguments when Next button is clicked', () => {
        render(<CustomerFormButton record={mockRecord} handleButtonClick={mockHandleButtonClick} buttonData={{ nextBtn: true }} />);

        fireEvent.click(screen.getByRole('button', { name: /next/i }));

        expect(mockHandleButtonClick).toHaveBeenCalledWith({
            buttonAction: FROM_ACTION_TYPE.NEXT,
            record: mockRecord,
        });
    });

    it('should call setButtonData with correct arguments when Save button is clicked', () => {
        render(<CustomerFormButton record={mockRecord} setButtonData={mockSetButtonData} buttonData={{ saveBtn: true, formBtnActive: true }} />);

        fireEvent.click(screen.getByRole('button', { name: /save & next/i }));

        expect(mockSetButtonData).toHaveBeenCalledTimes(1);
        expect(mockSetButtonData).toHaveBeenCalledWith({ ...mockButtonData, saveAndNewBtnClicked: false });
    });

    it('should render Save button as disabled when formBtnActive is false', () => {
        render(<CustomerFormButton record={mockRecord} setButtonData={mockSetButtonData} buttonData={{ saveBtn: true, formBtnActive: false }} />);

        expect(screen.getByRole('button', { name: /save & next/i })).toBeDisabled();
    });
});
