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
            nextBtn: true,
            saveBtn: true,
            printForm21Btn: true,
            printInvoiceBtn: true,
        };
        customRender(<VehicleInvoiceFormButton setButtonData={jest.fn()} onPrintInvoice={jest.fn()} onPrintForm21={jest.fn()} buttonData={buttonData} handleButtonClick={jest.fn()} />);

        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
        const editBtn = screen.getByRole('button', { name: 'Cancel Invoice' });
        fireEvent.click(editBtn);

        const saveBtn = screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(saveBtn);

        const nextBtnn = screen.getByRole('button', { name: 'Next' });
        fireEvent.click(nextBtnn);

        const printForm = screen.getByRole('button', { name: 'Print Form 21' });
        fireEvent.click(printForm);

        const printInvoice = screen.getByRole('button', { name: 'Print Invoice' });
        fireEvent.click(printInvoice);
    });
});
