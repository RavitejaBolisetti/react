import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';

import { AddEditForm } from '@components/common/RoleManagement/AddEditForm';

const props = {
    isViewModeVisible: true,
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
    onValuesChange: jest.fn(),
};

describe('AddEditForm Components', () => {
    it('should render AddEditForm components', () => {
        customRender(<AddEditForm isVisible={true} {...props} />);
        const closeBtn = screen.getByRole('img', { name: /close/i });
        fireEvent.click(closeBtn);
        const roleText = screen.getByText('Role ID');
        expect(roleText).toBeTruthy();
        const roleName = screen.getByText('Role Name');
        expect(roleName).toBeTruthy();
        const roleDes = screen.getByText('Role Description');
        expect(roleDes).toBeTruthy();
        const roleStatus = screen.getByText('Status');
        expect(roleStatus).toBeTruthy();
        const checkActive = screen.getByText('InActive');
        fireEvent.click(checkActive);
        const cancelBtn = screen.getByRole('button', { name: /Cancel/i });
        expect(cancelBtn).toBeInTheDocument();
        const saveBtn = screen.getByRole('button', { name: /Save & Add New/i });
        expect(saveBtn).toBeInTheDocument();
    });
});
