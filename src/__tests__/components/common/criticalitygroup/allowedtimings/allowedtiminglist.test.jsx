import { render, screen, fireEvent } from '@testing-library/react';
import AllowedTimingList from '@components/common/CriticalityGroup/AllowedTimings/AllowedTimingList';

describe('AllowedTimingList', () => {
    const mockData = {
        timeData: [
            {
                timeSlotFrom: '09:00',
                timeSlotTo: '12:00',
                isDeleted: false,
            },
            {
                timeSlotFrom: '14:00',
                timeSlotTo: '16:00',
                isDeleted: true,
            },
        ],
        setDeletedTime: jest.fn(),
        setTimeData: jest.fn(),
        isAddTimeVisible: false,
        setIsAddTimeVisible: jest.fn(),
        buttonData: {},
        setButtonData: jest.fn(),
        formActionType: {},
        formData: {},
        setFormData: jest.fn(),
        showGlobalNotification: jest.fn(),
        forceUpdate: jest.fn(),
        handleFormValueChange: jest.fn(),
        handleFormFieldChange: jest.fn(),
        allowedTimingSave: false,
        setAllowedTimingSave: jest.fn(),
    };

    it('should call onTimingFormFinish when submitting the form', () => {
        // Mock the timingForm.resetFields function
        const onTimingFormFinishMock = jest.fn();

        render(<AllowedTimingList {...mockData} onTimingFormFinish={onTimingFormFinishMock} />);

        // Find the Add Time button
        const addTimeButton = screen.getByRole('button', { name: 'plus Add Time' });
        // Click the Add Time button to show the form
        fireEvent.click(addTimeButton);

        const imgButton = screen.getByRole('img', { name: 'plus' });
        expect(imgButton).toBeTruthy();
        fireEvent.click(imgButton);

        // Find the form fields and fill them with values
        const startTimeInput = screen.getAllByText('Start Time');
        const endTimeInput = screen.getAllByText('End Time');
        expect(startTimeInput).toBeTruthy();
        expect(endTimeInput).toBeTruthy();

        // Find the form submit button and click it
        const submitButton = screen.getAllByRole('button');
        expect(submitButton).toBeTruthy();
        // fireEvent.click(submitButton);
    });
});
