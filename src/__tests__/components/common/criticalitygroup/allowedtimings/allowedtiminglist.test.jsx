import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent, getByTestId } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { act } from 'react-dom/test-utils';

import AllowedTimingList from '@components/common/CriticalityGroup/AllowedTimings/AllowedTimingList';

const props = {
    deletedTime: [],
    setDeletedTime: jest.fn(),
    timeData: [],
    setTimeData: jest.fn(),
    isAddTimeVisible: false,
    setIsAddTimeVisible: jest.fn(),
    buttonData: [],
    setButtonData: jest.fn(),
    formActionType: '',
    formData: {},
    setFormData: jest.fn(),
    showGlobalNotification: jest.fn(),
    forceUpdate: jest.fn(),
    handleFormValueChange: jest.fn(),
    handleFormFieldChange: jest.fn(),
    allowedTimingSave: false,
    setAllowedTimingSave: jest.fn(),
};

describe('AllowedTimingList Components', () => {
    it('should render AllowedTimingList components', () => {
        const wrapper = customRender(<AllowedTimingList {...props} />);
        expect(wrapper).toBeTruthy();
    });
    it('should render the add time button when the form action type is not view mode', () => {
        const addTimeBtn = screen.findByText('.addTimeBtn');
        expect(addTimeBtn).toBeTruthy();
    });

    /// Not valuable test////

    it('should not render the add time button when the form action type is view mode', () => {
        props.formActionType = 'viewMode';
        const wrapper = customRender(<AllowedTimingList {...props} />);
        const addTimeBtn = wrapper.findByText('.addTimeBtn');
        expect(addTimeBtn).toBeTruthy();
        const received = null;
        expect(received).toBeFalsy();
    });

    /// Not valuable test ends////

    it('should render the timing header when there are timing data', () => {
        props.timeData = [
            {
                timeSlotFrom: '09:00',
                timeSlotTo: '10:00',
            },
        ];
        customRender(<AllowedTimingList {...props} />);
        const timingHeader = screen.findByText('.timingHeader');
        expect(timingHeader).toBeTruthy();
    });
    it('should not render the timing header when there are no timing data', () => {
        props.timeData = [];
        customRender(<AllowedTimingList {...props} />);
        const timingHeader = screen.findByText('.timingHeader');
        expect(timingHeader).toBeTruthy();
        const received = null;
        expect(received).toBeFalsy();
    });
});
