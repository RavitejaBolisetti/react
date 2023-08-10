import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { LoginPage } from '@pages/auth/Login/LoginPage';

describe('LoginPageBase Components', () => {
    it('should render LoginPage components', () => {
        const LoginPageBase = customRender(<LoginPage />);
        expect(LoginPageBase).toMatchSnapshot();
    });
});
