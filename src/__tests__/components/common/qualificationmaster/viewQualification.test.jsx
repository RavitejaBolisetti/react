import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';

import { ViewQualificationList } from '@components/common/QualificationMaster/ViewQualificationList';

beforeEach(() => {
    jest.clearAllMocks();
});

const props = {
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
    onFinish: jest.fn(),
    onFinishFailed: jest.fn(),
    viewProps: jest.fn(),
};

describe('ViewQualification component', () => {
    it('should render the ViewQualification components', () => {
        customRender(<ViewQualificationList {...props} />);
        const qualificationCode = screen.getByText('Qualification Code');
        expect(qualificationCode).toBeTruthy();
        const qualificationName = screen.getByText('Qualification Name');
        expect(qualificationName).toBeTruthy();
        const qualificationStatus = screen.getByText('Status');
        expect(qualificationStatus).toBeTruthy();
        const checkInactive = screen.getByText('InActive');
        fireEvent.click(checkInactive);
        screen.debug();
    });
});
