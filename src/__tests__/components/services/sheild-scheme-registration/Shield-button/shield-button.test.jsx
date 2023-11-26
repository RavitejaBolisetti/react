import '@testing-library/jest-dom/extend-expect';
import { VehicleReceiptFormButton } from '@components/Services/ShieldSchemeRegistartion/VehicleReceiptFormButton/VehicleReceiptFormButton';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Shield form-button components', () => {
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
            cancelSchemeBtn: true,
            cancelRSABtn: true,
            viewRSAHistoryBtn: true,
        };
        customRender(<VehicleReceiptFormButton setButtonData={jest.fn()} buttonData={buttonData} handleButtonClick={jest.fn()} />);

        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);

        const nextBtn = screen.getByRole('button', { name: 'Next' });
        fireEvent.click(nextBtn);
        const saveBtn = screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(saveBtn);

        const cancelRsa = screen.getByRole('button', { name: 'Cancel RSA' });
        fireEvent.click(cancelRsa);

        const rsaHistory = screen.getByRole('button', { name: 'View RSA History' });
        fireEvent.click(rsaHistory);

        const cancelScheme = screen.getByRole('button', { name: 'Cancel Scheme' });
        fireEvent.click(cancelScheme);
    });
});
