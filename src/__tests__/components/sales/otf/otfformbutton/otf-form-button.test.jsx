import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { OTFFormButton } from 'components/Sales/OTF/OTFFormButton';

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
};

describe('OTF Form Button Component', () => {
    it('should render otf form button component', () => {
        customRender(<OTFFormButton />);
    });

    it('test 1', async () => {
        customRender(<OTFFormButton setButtonData={jest.fn()} buttonData={buttonData} handleButtonClick={jest.fn()} />);
        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
        const editBtn = screen.getByRole('button', { name: 'Edit' });
        fireEvent.click(editBtn);
        const allotBtn = screen.getByRole('button', { name: 'Allot' });
        fireEvent.click(allotBtn);
        const unAllotBtn = screen.getByRole('button', { name: 'Un-Allot' });
        fireEvent.click(unAllotBtn);
        const invoiceBtn = screen.getByRole('button', { name: 'Invoice' });
        fireEvent.click(invoiceBtn);
        const deliveryNoteBtn = screen.getByRole('button', { name: 'Delivery Note' });
        fireEvent.click(deliveryNoteBtn);
        const transferOTFBtn = screen.getByRole('button', { name: 'Transfer OTF' });
        fireEvent.click(transferOTFBtn);
        const cancelOTFBtn = screen.getByRole('button', { name: 'Cancel OTF' });
        fireEvent.click(cancelOTFBtn);
        const changeHistory = screen.getByRole('button', { name: 'Change History' });
        fireEvent.click(changeHistory);
        const nextBtn = screen.getByRole('button', { name: 'Next' });
        fireEvent.click(nextBtn);
        const saveBtn = screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(saveBtn);
    });
});
