import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { SplashPage } from '@pages/splash/SplashPage';
afterEach(() => {
    jest.restoreAllMocks();
});

describe('SplashPage Component', () => {
    it('should check SplashPage is working', async () => {
        customRender(<SplashPage />);
    });
});
