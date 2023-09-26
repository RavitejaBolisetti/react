import '@testing-library/jest-dom/extend-expect';
import { VehicleInvoiceFormButton } from '@components/Sales/VehicleInvoiceGeneration/VehicleInvoiceFormButton/VehicleInvoiceFormButton';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Vehicle invoice form-button components', () => {
    it('should render components', () => {
        const buttonData = {
            closeBtn: true,
            cancelBtn: true,
            cancelInvoiceBtn: true,
            rejectCancelBtn: true,
            approveCancelBtn: true,
            nextBtn: true,
            saveBtn: true,
        };
        customRender(<VehicleInvoiceFormButton setButtonData={jest.fn()} buttonData={buttonData} handleButtonClick={jest.fn()} />);

        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
        const editBtn = screen.getByRole('button', { name: 'Cancel Invoice' });
        fireEvent.click(editBtn);

        const nextBtn = screen.getByRole('button', { name: 'Reject' });
        fireEvent.click(nextBtn);
        const saveBtn = screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(saveBtn);
        const canceReciptBtn = screen.getByRole('button', { name: 'Approve' });
        fireEvent.click(canceReciptBtn);
        const nextBtnn = screen.getByRole('button', { name: 'Next' });
        fireEvent.click(nextBtnn);
    });
});
