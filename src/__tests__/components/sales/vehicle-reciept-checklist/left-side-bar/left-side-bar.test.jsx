import '@testing-library/jest-dom/extend-expect';
import LeftSidebar from '@components/Sales/VehicleRecieptChecklist/LeftSidebar/LeftSidebar';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});


describe('Receipts left side bar components', () => {
    const typeData = [{ key: 1, value: "test" }]
    it('should render left side ber components', () => {
        customRender(<LeftSidebar setpreviousSection={jest.fn()} typeData={typeData} />);
    });
});
