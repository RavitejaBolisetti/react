import '@testing-library/jest-dom/extend-expect';
import LeftSidebar from '@components/Sales/VehicleDeliveryNote/LeftSidebar/LeftSidebar';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

const typeData = { DLVR_NT_STS: [{ name: 'kai' }] };

describe('Delivery Note left side bar components', () => {
    it('should render components', () => {
        customRender(<LeftSidebar typeData={typeData} />);
    });
});
