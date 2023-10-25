import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { AuthenticatedUserPage } from '@pages/routing/AuthenticatedUserPage';
afterEach(() => {
    jest.restoreAllMocks();
});

describe('AuthenticatedUserPage Component', () => {
    it('should check AuthenticatedUserPage is working', async () => {
        customRender(<AuthenticatedUserPage />);
    });
});
