import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/common/UserManagementManufacturer/AddEditForm';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('User mangement Manufacturer AddEditForm components', () => {
    it('should render AddEditFormy components', () => {
        customRender(<AddEditForm/>)
    });
});