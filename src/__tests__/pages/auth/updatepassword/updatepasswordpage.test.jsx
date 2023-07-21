import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { UpdatePasswordPage } from '@pages/auth/UpdatePassword/UpdatePasswordPage';

describe('UpdatePasswordPageBase Components', () => {
    it('should render UpdatePasswordPageBase components', () => {
        const UpdatePasswordPageBase = customRender(<UpdatePasswordPage />);
        expect(UpdatePasswordPageBase).toMatchSnapshot();
    });
});
