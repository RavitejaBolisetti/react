import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { UnAuthenticatedUserPage } from '@pages/routing/UnAuthenticatedUserPage';
afterEach(() => {
    jest.restoreAllMocks();
});

describe('UnAuthenticatedUserPage Component', () => {
    it('should check UnAuthenticatedUserPage is working', async () => {
        customRender(<UnAuthenticatedUserPage />);
    });
});
