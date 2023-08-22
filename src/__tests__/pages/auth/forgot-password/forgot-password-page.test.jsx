import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import ForgotPasswordPage from '@pages/auth/ForgotPassword/ForgotPasswordPage';

describe('ForgotPasswordPageBase Components', () => {
    it('should render ForgotPasswordPage components', () => {
        customRender(<ForgotPasswordPage />);
    });
});
