import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import Logout from '@components/Auth/Logout/Logout';
afterEach(() => {
    jest.restoreAllMocks();
});

describe('Logout Component', () => {
    it('should check logout is working', async () => {
        customRender(<Logout />);
    });
});
