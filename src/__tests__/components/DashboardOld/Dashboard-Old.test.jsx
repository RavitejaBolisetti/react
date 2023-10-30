import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { DashboardOld } from '@components/DashboardOld/DashboardOld';
import { DashboardSkelton } from '@components/Dashboard/DashboardSkelton';
const LeftSideBar = { collapsed: false };
afterEach(() => {
    jest.restoreAllMocks();
});

describe('dashboard component render', () => {
    it('should render dashboard component ', () => {
        customRender(<DashboardOld />);
        expect(screen.getByText(/Home/i)).toBeInTheDocument();
    });
    it('should check button events', async () => {
        customRender(<DashboardOld LeftSideBar={LeftSideBar} />);
        const viewMore = screen.getAllByText(/View More/i);
        expect(viewMore).toBeTruthy();
    });
});

describe('DashboardSkelton component render', () => {
    it('should render DashboardSkelton component ', () => {
        customRender(<DashboardSkelton />);
    });
});
