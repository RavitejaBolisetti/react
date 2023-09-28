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
            nextBtn: true,
            saveBtn: true,
            cancelInvoiceBtn: true,
            approveCancelBtn: true,
        };
        customRender(<VehicleInvoiceFormButton setButtonData={jest.fn()} buttonData={buttonData} handleButtonClick={jest.fn()} />);

        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
        const cancelInvoice = screen.getByRole('button', { name: 'Cancel Invoice' });
        fireEvent.click(cancelInvoice);
        const Approve = screen.getByRole('button', { name: 'Approve' });
        fireEvent.click(Approve);

        const nextBtn = screen.getByRole('button', { name: 'Next' });
        fireEvent.click(nextBtn);
        const saveBtn = screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(saveBtn);
    });
});
