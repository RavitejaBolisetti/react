import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';
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
    onCloseAction: jest.fn(),
    buttonData: jest.fn(),
    // setButtonData,
    handleButtonClick: jest.fn(),
};

describe('should render AddEditForm', () => {
    it('should render the AddEditForm', () => {
        customRender(<AddEditForm isVisible={true} />);
        const groupId = screen.findByTestId('groupIdddd');

        expect(groupId).toBeTruthy();

        expect(screen.getByTestId('toggle')).toBeInTheDocument();
        expect(screen.getByTestId('default-toggle')).toBeInTheDocument();

        const allowedTimings = screen.getByText(/allowed timings/i);
        expect(allowedTimings).toBeInTheDocument();
    });
    it('should render AddEditForm field and event check ', async () => {
        customRender(<AddEditForm formData={{}} isVisible={true} buttonData={buttonData} setButtonData={jest.fn()} saveButtonName={saveButtonName} isLoadingOnSave={isLoadingOnSave} {...props} />);

        const criticalityGroupCode = screen.getByPlaceholderText('Enter id');
        user.type(criticalityGroupCode, 'Dmatest');
        expect(criticalityGroupCode.value.includes('Dmatest'));

        const criticalityGroupName = screen.getByPlaceholderText('Enter name');
        user.type(criticalityGroupName, 'Dmatest');
        expect(criticalityGroupName.value.includes('Dmatest'));

        const defaultValue = screen.getByText('default title');
        expect(defaultValue).toBeTruthy();

        const criticalityId = screen.getByLabelText('Criticality Group Id');
        expect(criticalityId).toBeTruthy();

        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeTruthy();
        fireEvent.click(dialog);

        const screenImg = screen.getByLabelText('plus');
        expect(screenImg).toBeTruthy();
        fireEvent.click(screenImg);

        const labelbutton = screen.getByLabelText('Close');
        fireEvent.click(labelbutton);
        expect(labelbutton).toBeTruthy();

        const defaultGroupBtn = screen.getByTestId('default-toggle');
        user.click(defaultGroupBtn);

        const toggleBtn = screen.getByTestId('toggle');
        user.click(toggleBtn);

        const checkActive = screen.getAllByText('Active');
        expect(checkActive).toBeTruthy();
    });
});
