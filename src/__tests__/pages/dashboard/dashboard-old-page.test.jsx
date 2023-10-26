import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { DashboardOldPage } from '@pages/dashboard/DashboardOldPage';
afterEach(() => {
    jest.restoreAllMocks();
});

describe('DashboardOldPage Component', () => {
    it('should check DashboardOldPage is working', async () => {
        customRender(<DashboardOldPage />);
    });
});
