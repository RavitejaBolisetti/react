import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddEditForm } from '@components/common/CriticalityGroup/AddEditForm';
beforeEach(() => {
    jest.clearAllMocks();
});

const user = userEvent.setup();

const buttonData = {
    closeBtn: true,
    cancelBtn: true,
    saveBtn: true,
    saveAndNewBtn: true,
    editBtn: true,
    formBtnActive: true,
};

const saveButtonName = 'Save';
const isLoadingOnSave = true;
const props = {
    setTimesegmentLengthTracker: jest.fn(),
    TimesegmentLengthTracker: [],
    deletedTime: [],
    setDeletedTime: jest.fn(),
    timeData: [],
    setTimeData: jest.fn(),
    isAddTimeVisible: true,
    setIsAddTimeVisible: jest.fn(),
    setButtonData: jest.fn(),
    formActionType: true,
    formData: {},
    setFormData: jest.fn(),
    showGlobalNotification: jest.fn(),
    forceUpdate: jest.fn(),
    handleFormValueChange: jest.fn(),
    handleFormFieldChange: jest.fn(),
    allowedTimingSave: true,
    setAllowedTimingSave: jest.fn(),
};

describe('should render AddEditForm', () => {
    it('should render the AddEditForm', () => {
        customRender(<AddEditForm isVisible={true} />);
        const groupId = screen.findByTestId('groupId');
        expect(groupId).toBeTruthy();

        expect(screen.getByTestId('toggle')).toBeInTheDocument();
        expect(screen.getByTestId('default-toggle')).toBeInTheDocument();

        const allowedTimings = screen.getByText(/allowed timings/i);
        expect(allowedTimings).toBeInTheDocument();
    });
    it('should render AddEditForm field and event check ', async () => {
        customRender(<AddEditForm formData={{}} isVisible={true} onCloseAction={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} handleButtonClick={jest.fn()} saveButtonName={saveButtonName} isLoadingOnSave={isLoadingOnSave} {...props} />);

        const criticalityGroupCode = screen.getByPlaceholderText('Enter id');
        user.type(criticalityGroupCode, 'Dmatest');
        expect(criticalityGroupCode.value.includes('Dmatest'));

        const criticalityGroupName = screen.getByPlaceholderText('Enter name');
        user.type(criticalityGroupName, 'Dmatest');
        expect(criticalityGroupName.value.includes('Dmatest'));

        const defaultGroupBtn = screen.getByTestId('default-toggle');
        user.click(defaultGroupBtn);

        const toggleBtn = screen.getByTestId('toggle');
        user.click(toggleBtn);

        const checkActive = screen.getAllByText('Active');
        expect(checkActive).toBeTruthy();

        const criticalityDefaultGroup = screen.getByText('Add Time');
        user.click(criticalityDefaultGroup);
        expect(
            await screen.findByText('Start Time', undefined, {
                timeout: 2000,
            })
        ).toBeVisible();

        screen.debug();

        // const saveBtn = screen.getByText('Save');
        // user.click(saveBtn);

        // const closeBtn = screen.getByRole('button', {name: /close/i});
        // user.click(closeBtn);

        // const cancelBtn = screen.getByText('Cancel');
        // user.click(cancelBtn);
        // screen.debug();
    });
});
