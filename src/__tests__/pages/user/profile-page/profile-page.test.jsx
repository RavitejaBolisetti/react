import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { ProfilePage } from '@pages/user/ProfilePage/ProfilePage';
afterEach(() => {
    jest.restoreAllMocks();
});

describe('ProfilePage Component', () => {
    it('should check ProfilePage is working', async () => {
        customRender(<ProfilePage />);
    });
});
