import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent, getByTestId } from '@testing-library/react';
import customRender from '@utils/test-utils';
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();
import AllowedTimingList from '@components/common/CriticalityGroup/AllowedTimings/AllowedTimingList';

const props = {
    deletedTime: [],
    setDeletedTime: jest.fn(),
    timeData: [],
    setTimeData: jest.fn(),
    isAddTimeVisible: true,
    setIsAddTimeVisible: jest.fn(),
    buttonData: [],
    setButtonData: jest.fn(),
    formActionType: { addMode: false, editMode: false, viewMode: false },
    formData: {},
    setFormData: jest.fn(),
    showGlobalNotification: jest.fn(),
    forceUpdate: jest.fn(),
    handleFormValueChange: jest.fn(),
    handleFormFieldChange: jest.fn(),
    allowedTimingSave: false,
    setAllowedTimingSave: jest.fn(),
    showTime: true,
};

describe('AllowedTimingList Components', () => {
    it('should render AllowedTimingList components', () => {
        const wrapper = customRender(<AllowedTimingList {...props} />);
        expect(wrapper).toBeTruthy();
    });

    it('should render the timing header when there are timing data', () => {
        props.timeData = [
            {
                timeSlotFrom: '09:00',
                timeSlotTo: '10:00',
            },
        ];
        customRender(<AllowedTimingList {...props} />);
        const timingHeader = screen.getByText('Start Time');
        expect(timingHeader).toBeTruthy();
    });
    it('should check add time button event', async () => {
        customRender(<AllowedTimingList {...props} />);
        const addTimeBtn = screen.getByText(/Add Time/i);
        user.click(addTimeBtn);
    });

    // it('should check add time form field event', async () => {
    //     customRender(<AllowedTimingList {...props} />);
    //     const addTimeBtn = screen.getByPlaceholderText('Start time*');
    //     screen.debug();
    //     user.type(addTimeBtn, '2:00 AM');
    //     expect(addTimeBtn).toHaveValue('2:00 AM');

    //     const addTimeBtn2 = screen.getByPlaceholderText('End time*');
    //     user.type(addTimeBtn2, '3:00 AM');
    //     expect(addTimeBtn2).toHaveValue('3:00 AM');

    //     const saveBtn = screen.getByText(/Save/i);
    //     user.click(saveBtn);
    // });
});
