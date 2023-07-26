import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';

import { AddEditForm } from '@components/common/QualificationMaster/AddEditForm';

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
};

describe('AddEditForm Components', () => {
    it('should render AddEditForm components', () => {
        customRender(<AddEditForm isVisible={true} {...props} />);
        const textCode = screen.getByText('Qualification Code');
        expect(textCode).toBeTruthy();
        const textName = screen.getByText('Qualification Name');
        expect(textName).toBeTruthy();
        const statusText = screen.getByText('Status');
        expect(statusText).toBeTruthy();
        const checkActive = screen.getByText('Active');
        fireEvent.click(checkActive);
    });
});
