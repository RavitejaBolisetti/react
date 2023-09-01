import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { DashboardPage } from '@pages/dashboard/DashboardPage';
afterEach(() => {
    jest.restoreAllMocks();
});

describe('DashboardPage Component', () => {
    it('should check DashboardPage is working', async () => {
        customRender(<DashboardPage />);
    });
});
