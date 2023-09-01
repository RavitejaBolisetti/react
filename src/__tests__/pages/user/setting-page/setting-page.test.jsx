import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { SettingPage } from '@pages/user/SettingPage/SettingPage';
afterEach(() => {
    jest.restoreAllMocks();
});

describe('SettingPage Component', () => {
    it('should check SettingPage is working', async () => {
        customRender(<SettingPage />);
    });
});
