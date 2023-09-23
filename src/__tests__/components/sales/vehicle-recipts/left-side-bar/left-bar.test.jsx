import '@testing-library/jest-dom/extend-expect';
import LeftSidebar from '@components/Sales/VehicleReceipt/LeftSidebar/LeftSidebar';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Term Condition Manufacturer left side bar components', () => {
    it('should render components', () => {
        customRender(<LeftSidebar />);
    });
});
