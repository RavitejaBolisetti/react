import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { SSOLoginPage } from '@pages/auth/SSOLogin/SSOLoginPage';
afterEach(() => {
    jest.restoreAllMocks();
});

describe('SSOLoginPage Component', () => {
    it('should check SSOLoginPage is working', async () => {
        customRender(<SSOLoginPage />);
    });
});
