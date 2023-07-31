/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DrawerFormButton } from '@components/common/Button/DrawerFormButton';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import customRender from '@utils/test-utils';

const buttonData = {
    saveBtn: true,
    saveAndNewBtn: true,
    editBtn: true,
    cancelOTFBtn: true,
    transferOTFBtn: true,
    formBtnActive: true,
};
const saveButtonName = 'Save';
const isLoadingOnSave = false;
const saveAndNewBtnClicked = true;

describe('DrawerFormButton', () => {
    it('should render all buttons with correct labels', () => {
        const buttonData = {
            closeBtn: true,
            cancelBtn: true,
            saveBtn: true,
            saveAndNewBtn: true,
            editBtn: true,
            cancelOTFBtn: true,
            transferOTFBtn: true,
            formBtnActive: true,
            saveAndNewBtnClicked: false,
        };

        const { getByText } = customRender(<DrawerFormButton buttonData={buttonData} setButtonData={jest.fn()} isLoadingOnSave={false} />);

        expect(getByText('Close')).toBeInTheDocument();
        expect(getByText('Cancel')).toBeInTheDocument();
        expect(getByText('Save')).toBeInTheDocument();
        expect(getByText('Save & Add New')).toBeInTheDocument();
        expect(getByText('Edit')).toBeInTheDocument();
        expect(getByText('Cancel OTF')).toBeInTheDocument();
        expect(getByText('Transfer OTF')).toBeInTheDocument();
    });
});

describe('DrawerFormButton components', () => {
    it('should renders all buttons correctly', () => {
        customRender(<DrawerFormButton formData={{}} onCloseAction={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} saveButtonName={saveButtonName} handleButtonClick={jest.fn()} isLoadingOnSave={isLoadingOnSave} saveAndNewBtnClicked={saveAndNewBtnClicked} />);
    });

    it('should check all button click events', async () => {
        customRender(<DrawerFormButton formData={{}} onCloseAction={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} saveButtonName={saveButtonName} handleButtonClick={jest.fn()} isLoadingOnSave={isLoadingOnSave} saveAndNewBtnClicked={saveAndNewBtnClicked} />);

        const cancleButton = screen.getByRole('button', { name: 'Cancel OTF', exact: false });
        fireEvent.click(cancleButton);

        const transferButton = screen.getByRole('button', { name: 'Transfer OTF', exact: false });
        fireEvent.click(transferButton);

        const saveButton = screen.getByRole('button', { name: 'Save', exact: false });
        fireEvent.click(saveButton);

        const saveAddNewButton = screen.getByRole('button', { name: 'Save & Add New', exact: false });
        fireEvent.click(saveAddNewButton);

        const editButton = screen.getByRole('button', { name: 'Edit', exact: false });
        fireEvent.click(editButton);
    });
});
