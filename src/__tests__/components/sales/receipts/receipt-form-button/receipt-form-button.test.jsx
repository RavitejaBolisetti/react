import '@testing-library/jest-dom/extend-expect';
import { VehicleReceiptFormButton } from '@components/Sales/Receipts/VehicleReceiptFormButton/VehicleReceiptFormButton';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Receipts form-button components', () => {
    it('should render components', () => {
        const buttonData = {
            closeBtn: true,
            cancelBtn: true,
            editBtn: true,
            allotBtn: true,
            unAllotBtn: true,
            invoiceBtn: true,
            deliveryNoteBtn: true,
            transferOTFBtn: true,
            cancelOTFBtn: true,
            changeHistory: true,
            nextBtn: true,
            saveBtn: true,
            formBtnActive: true,
            cancelReceiptBtn: true,
        };
        customRender(<VehicleReceiptFormButton setButtonData={jest.fn()} buttonData={buttonData} handleButtonClick={jest.fn()} />);

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
        const canceReciptBtn = screen.getByRole('button', { name: 'Cancel Receipt' });
        fireEvent.click(canceReciptBtn);
    });
});
