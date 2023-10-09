import '@testing-library/jest-dom/extend-expect';
import { VehicleDeliveryNoteFormButton } from '@components/Sales/VehicleDeliveryNote/VehicleDeliveryNoteFormButton/VehicleDeliveryNoteFormButton';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Vehicle Delivery Note form-button components', () => {
    it('should render components', () => {
        const buttonData = {
            closeBtn: true,
            cancelBtn: true,
            editBtn: true,
            cancelDeliveryNoteBtn: true,
            nextBtn: true,
            saveBtn: true,
            printDeliveryNoteBtn: true,
        };
        customRender(<VehicleDeliveryNoteFormButton setButtonData={jest.fn()} buttonData={buttonData} handleButtonClick={jest.fn()} handlePrintDownload={jest.fn()} />);

        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
        const editBtn = screen.getByRole('button', { name: 'Edit' });
        fireEvent.click(editBtn);

        const nextBtn = screen.getByRole('button', { name: 'Next' });
        fireEvent.click(nextBtn);
        const saveBtn = screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(saveBtn);
        // const cancelNote = screen.getByRole('button', { name: 'Cancel Deliery Note' });
        // fireEvent.click(cancelNote);
        const printNote = screen.getByRole('button', { name: 'Print Delivery Note' });
        fireEvent.click(printNote);
    });
});
