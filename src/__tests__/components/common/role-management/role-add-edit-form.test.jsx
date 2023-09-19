import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { AddEditForm } from '@components/common/RoleManagement/AddEditForm';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('AddEditForm Components', () => {

    it('should render AddEditForm components', () => {
        const formActionType={
            viewMode: true
        }
        customRender(<AddEditForm isVisible={true} formActionType={formActionType} />);
    });

});
