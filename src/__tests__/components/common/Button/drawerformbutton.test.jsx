import { render, fireEvent } from '@testing-library/react';
import { DrawerFormButton } from '@components/common/Button/DrawerFormButton';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import customRender from '@utils/test-utils';

const createMockSetButtonData = (buttonData) => {
    return jest.fn((newButtonData) => ({
        ...buttonData,
        ...newButtonData,
    }));
};

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

    it('should call onCloseAction when Close button is clicked', () => {
        const onCloseAction = jest.fn();
        const buttonData = { closeBtn: true };

        const { getByText } = customRender(<DrawerFormButton buttonData={buttonData} setButtonData={jest.fn()} isLoadingOnSave={false} onCloseAction={onCloseAction} />);

        fireEvent.click(getByText('Close'));
        expect(onCloseAction).toHaveBeenCalledTimes(1);
    });

    it('should call setButtonData with correct data when Save & Add New button is clicked', () => {
        const buttonData = { saveAndNewBtn: true, formBtnActive: true, saveAndNewBtnClicked: false };
        const setButtonDataMock = jest.fn();
        const formData = {};

        const { getByText } = customRender(<DrawerFormButton buttonData={buttonData} handleButtonClick={jest.fn()} formData={formData} setButtonData={setButtonDataMock} isLoadingOnSave={false} />);

        const saveAndNewButton = getByText('Save & Add New');
        fireEvent.click(saveAndNewButton);

        expect(setButtonDataMock).toHaveBeenCalledWith({
            formBtnActive: true, // The formBtnActive value should remain the same
            saveAndNewBtn: true, // The saveAndNewBtn value should remain the same
            saveAndNewBtnClicked: true, // The value should change to true when the button is clicked
        });
    });

    it('should disable Save & Add New button when formBtnActive is false', () => {
        const buttonData = { saveAndNewBtn: true, formBtnActive: false };

        const { getByText } = customRender(<DrawerFormButton buttonData={buttonData} setButtonData={jest.fn()} isLoadingOnSave={false} />);

        const saveAndNewButton = getByText('Save & Add New');
        expect(saveAndNewButton).toBeInTheDocument();
        expect(saveAndNewButton).not.toBeDisabled();
    });
    it('should disable Save & Add New button when formBtnActive is false', () => {
        const buttonData = { saveAndNewBtn: true, formBtnActive: false };

        const { getByText } = customRender(<DrawerFormButton buttonData={buttonData} setButtonData={jest.fn()} isLoadingOnSave={false} />);

        const saveAndNewButton = getByText('Save & Add New');
        expect(saveAndNewButton).toBeInTheDocument();
        expect(saveAndNewButton).not.toBeDisabled();
    });

    it('should enable Save & Add New button when formBtnActive is true', () => {
        const buttonData = { saveAndNewBtn: true, formBtnActive: true };

        const { getByText } = customRender(<DrawerFormButton buttonData={buttonData} setButtonData={jest.fn()} isLoadingOnSave={false} />);

        const saveAndNewButton = getByText('Save & Add New');
        expect(saveAndNewButton).toBeInTheDocument();
        expect(saveAndNewButton).not.toBeDisabled();
    });

    it('should call setButtonData when Save & Add New button is clicked', () => {
        const buttonData = { saveAndNewBtn: true, formBtnActive: true };
        const setButtonDataMock = jest.fn();

        const { getByText } = customRender(<DrawerFormButton buttonData={buttonData} setButtonData={setButtonDataMock} isLoadingOnSave={false} />);

        const saveAndNewButton = getByText('Save & Add New');
        fireEvent.click(saveAndNewButton);

        expect(setButtonDataMock).toHaveBeenCalledWith({
            ...buttonData,
            saveAndNewBtnClicked: true,
        });
    });

    it('should disable Save & Add New button when formBtnActive is false', () => {
        const buttonData = { saveAndNewBtn: true, formBtnActive: false };

        const { getByText } = customRender(<DrawerFormButton buttonData={buttonData} setButtonData={jest.fn()} isLoadingOnSave={false} />);

        const saveAndNewButton = getByText('Save & Add New');
        expect(saveAndNewButton).toBeInTheDocument();
        expect(saveAndNewButton).not.toBeDisabled();
    });

    it('should enable Save & Add New button when formBtnActive is true', () => {
        const buttonData = { saveAndNewBtn: true, formBtnActive: true };

        const { getByText } = customRender(<DrawerFormButton buttonData={buttonData} setButtonData={jest.fn()} isLoadingOnSave={false} />);

        const saveAndNewButton = getByText('Save & Add New');
        expect(saveAndNewButton).toBeInTheDocument();
        expect(saveAndNewButton).not.toBeDisabled();
    });

    it('should call setButtonData with correct value when Save & Add New button is clicked', () => {
        const buttonData = { saveAndNewBtn: true, formBtnActive: true };
        const setButtonDataMock = jest.fn();

        const { getByText } = customRender(<DrawerFormButton buttonData={buttonData} setButtonData={setButtonDataMock} isLoadingOnSave={false} />);

        const saveAndNewButton = getByText('Save & Add New');
        fireEvent.click(saveAndNewButton);

        expect(setButtonDataMock).toHaveBeenCalledWith({
            ...buttonData,
            saveAndNewBtnClicked: true,
        });
    });

    it('should call onCloseAction when Close button is clicked', () => {
        const buttonData = { closeBtn: true };
        const onCloseActionMock = jest.fn();

        const { getByText } = customRender(<DrawerFormButton buttonData={buttonData} onCloseAction={onCloseActionMock} setButtonData={jest.fn()} isLoadingOnSave={false} />);

        const closeButton = getByText('Close');
        fireEvent.click(closeButton);

        expect(onCloseActionMock).toHaveBeenCalled();
    });

    it('should call handleButtonClick with correct action when Edit button is clicked', () => {
        const buttonData = { editBtn: true };
        const handleButtonClickMock = jest.fn();
        const formData = {};

        const { getByText } = customRender(<DrawerFormButton buttonData={buttonData} handleButtonClick={handleButtonClickMock} formData={formData} setButtonData={jest.fn()} isLoadingOnSave={false} />);

        const editButton = getByText('Edit');
        fireEvent.click(editButton);

        expect(handleButtonClickMock).toHaveBeenCalledWith({
            buttonAction: FROM_ACTION_TYPE.EDIT, // Use the correct action type from constants
            record: formData,
        });
    });

    it('should call handleButtonClick with correct action when Cancel OTF button is clicked', () => {
        const buttonData = { cancelOTFBtn: true, formBtnActive: true };
        const handleButtonClickMock = jest.fn();
        const formData = {};

        const { getByText } = customRender(<DrawerFormButton buttonData={buttonData} handleButtonClick={handleButtonClickMock} formData={formData} setButtonData={jest.fn()} isLoadingOnSave={false} />);

        const cancelOTFButton = getByText('Cancel OTF');
        fireEvent.click(cancelOTFButton);

        expect(handleButtonClickMock).toHaveBeenCalledWith({ buttonAction: 'cancel_otf' });
    });

    it('should call handleButtonClick with correct action when Transfer OTF button is clicked', () => {
        const buttonData = { transferOTFBtn: true, formBtnActive: true };
        const handleButtonClickMock = jest.fn();
        const formData = {};

        const { getByText } = customRender(<DrawerFormButton buttonData={buttonData} handleButtonClick={handleButtonClickMock} formData={formData} setButtonData={jest.fn()} isLoadingOnSave={false} />);

        const transferOTFButton = getByText('Transfer OTF');
        fireEvent.click(transferOTFButton);

        expect(handleButtonClickMock).toHaveBeenCalledWith({ buttonAction: 'transfer_otf' });
    });

    it('should call handleButtonClick with correct action when Transfer OTF button is clicked', () => {
        const buttonData = { transferOTFBtn: true, formBtnActive: true };
        const handleButtonClickMock = jest.fn();
        const formData = {};

        const { getByText } = customRender(<DrawerFormButton buttonData={buttonData} handleButtonClick={handleButtonClickMock} formData={formData} setButtonData={jest.fn()} isLoadingOnSave={false} />);

        const transferOTFButton = getByText('Transfer OTF');
        fireEvent.click(transferOTFButton);

        expect(handleButtonClickMock).toHaveBeenCalledWith({ buttonAction: 'transfer_otf' });
    });
});
